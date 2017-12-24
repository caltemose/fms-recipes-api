// this is a dangerous script as it removes files from a folder outside
// of thie repository. use with caution.
const del = require('delete')
const config = require('../config/config.js')

// must pass { force: true } in order to delete files outside this directory
const recipes = config.externalBaseUrl + 'recipes/*'
const tags = config.externalBaseUrl + 'tags/*'

del([recipes, tags], {force: true}, (err) => {
    if (err) throw err
    console.log('files deleted at:', config.externalBaseUrl)
})
