# fms-recipes API TODO

This is not a comprehensive todo list. It is a list of noted TODOs in the code and a few other items. It complements the Trello board of project action items.


## High Priority

`/config/config.js` (gitignored) includes config for main db and dev db. However, there currently is no global flag implemented to determine which db to use and so some files have `config.devDb` hardcoded and switching to the main db requires updating these files. This should be fixed (e.g. ENV variable).


## Normal Priority

**/helpers/db/recipes.js**

- updateRecipeProperty() saving directions should use subdocuments **(might be done)**
- updateRecipeIngredientLabel() is this still needed?

**/helpers/db/tags.js**

- reject duplicate tags from being added to tags collection

**/src/sass/_recipe.sass**

- reorganize into subfiles

**/src/sass/**

- improve organization, add subfolders


## Low Priority

**/src/js/modules/CreateRecipeForm.js**

- convert axios request to POST


**/compile-pug.js**

- bulletproof fs.readdirsync to ignore non Pug files
- traverse subdirs
