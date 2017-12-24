const path = require('path')
const fs = require('fs')
const assert = require('assert')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

require('../models/')

const config = require('../config/config.js')
const recipesDb = require('../helpers/db/recipes')

const done = (cb) => {
    mongoose.disconnect( () => {
        console.log('')
        console.log('disconnected from mongo')
        if (cb) cb()
    })
}

const writeRecipeToFile = (recipe, last) => {
    let fileout = `${config.externalBaseUrl}/recipes/${recipe.slug}.json`
    fileout = path.resolve(__dirname, fileout)
    fs.writeFile(fileout, JSON.stringify(recipe, null, 2), (err) => {
        if (err) {
            done(console.log(err))
            throw err
        }
        console.log(recipe.slug, 'written to:', fileout)
        if (last) done(console.log('done writing files.'))
    })
}

const writeRecipeIndex = recipes => {
    let fileout = `${config.externalBaseUrl}/recipes/index.json`
    fileout = path.resolve(__dirname, fileout)
    fs.writeFile(fileout, JSON.stringify({ recipes }, null, 2), (err) => {
        if (err) {
            throw new Error(err)
        }
    })
}

const exportRecipes = recipes => {
    writeRecipeIndex(recipes)

    recipes.forEach((recipe, index) => {
        const last = index === recipes.length -1
        recipesDb.getRecipeById(recipe._id)
            .then(recipe => {
                writeRecipeToFile(recipe, last)
            })
            .catch(err => {
                done(console.error(err))
            })
    })
}

mongoose.connect(config.dbHost + config.devDb, (err) => {
    assert.equal(null, err)
    console.log('connected to', mongoose.connection.db.databaseName)
    recipesDb.getRecipes()
        .then(docs => {
            exportRecipes(docs)
        })
        .catch(err => {
            done(console.error(err))
        })
})
