# Notebox Search - A Obsidian Plugin 
Notebox search is an obsidian plugin to be used alongside [Notebox](https://github.com/VeerpalBrar/Notebox), a file search tool. 

Notebox provides an API to search across multiple files. Notebox can be configured to index 
your obsidian vault. You can search via notebox from within obsidian itself using Notebox search. 


## Installation

First, get [Notebox](https://github.com/VeerpalBrar/Notebox) up and running by following the instructions in the Notebox README.  To install the obsidian plugin in:

1. Clone this repo to the obsidian plugins folder: `.obsidian/plugins/`
2. Install NodeJS, then run `npm i` in the command line in the notebox-search folder.
3. Update main.ts to the correct host and port, if not using `localhost:8070`
4. Run `npm run dev` to compile the plugin from `main.ts` to `main.js`.
3. In your obsidian settings, enable notebox search under community plugins. You may need to reload plugins first. 

## Usage
The plugin has a single command `Notebox search` which opens a modal. Type your search query in the search box and the matching files will automatically appear. Notebox searches both file title and file contents for the search term. 

By default, a ribbon icon is also added by the plugin. 

