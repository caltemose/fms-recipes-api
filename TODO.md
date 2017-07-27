# TODO

This is not a comprehensive todo list. It is a list of noted TODOs in the code. It complements the Trello board of project action items.

## Normal Priority

**/helpers/db/recipes.js**

- updateRecipeProperty() saving directions should use subdocuments
- updateRecipeIngredientLabel() is this still needed?

**/helpers/db/tags.js**

- reject duplicate tags from being added to tags collection

**/routes/api/recipes/index.js**

- change POST `/api/recipes/:id/:property` to PUT
- confirm still used POST `/api/recipes/:id/:property/:option` and change to PUT
- change POST `/api/recipes/:id/ingredient/:ingredientId/amount/:property` to PUT
- change POST `/api/recipes/:id/ingredient/:ingredientId/:property` to PUT

**/src/js/modules/CreateRecipeForm.js**

- convert axios request to POST

**/src/sass/_recipe.sass**

- reorganize into subfiles

**/src/sass/***

- improve organization, add subfolders

## Low Priority

**/compile-pug.js**

- bulletproof fs.readdirsync to ignore non Pug files
- traverse subdirs
