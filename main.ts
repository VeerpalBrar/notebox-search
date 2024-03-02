import { Plugin, requestUrl,  SuggestModal, normalizePath,  FileSystemAdapter } from 'obsidian';

interface SearchResult {
	content: string;
	file: string;
  }

export class SearchModal extends SuggestModal<SearchResult> {
  async getSuggestions(query: string): Promise<SearchResult[]> {
	const ret: SearchResult[] = []
	let basePath = getBasePath()
	await requestUrl(`http://localhost:8070/search?txt=${query.toLowerCase()}`)
		.then(function (response) {
			response.json.result.map((result: SearchResult) => {
				if (result["file"].includes(basePath)) {
					ret.push({
						content: result["content"],
						file: removeBasePathFromFullFilePath(result['file'])
					})
				}
			})
			
		})
		.catch(function (error) {
			console.log(error);
			return []
		});
	return ret;
  }

  renderSuggestion(book: SearchResult, el: HTMLElement) {
    el.createEl("div", { text: book.content });
    el.createEl("small", { text: book.file });
  }

  onChooseSuggestion(book: SearchResult, evt: MouseEvent | KeyboardEvent) {
    let filePath = normalizePath(book.file);
	this.app.workspace.openLinkText(filePath, "");
  }
}


export default class NoteboxSearch extends Plugin {
	async onload() {
		this.addRibbonIcon('dice', 'Notebox Search', (evt: MouseEvent) => {
			new SearchModal(this.app).open();
		});

		this.addCommand({
			id: 'open-notebox-search-modal',
			name: 'Notebox Search',
			callback: () => {
				new SearchModal(this.app).open();
			}
		});
	}

	onunload() {

	}
}

function getBasePath() {
	let basePath = '';
	let adapter = app.vault.adapter;
	if (adapter instanceof FileSystemAdapter) {
		basePath =  adapter.getBasePath().replace("/", "") // remove first / from path
	}

	return basePath;
}

function removeBasePathFromFullFilePath(fullPath: string) {
	let basePath = getBasePath()
	return fullPath.replace(basePath, "").replace("/", "") // strips any / at begining
}
