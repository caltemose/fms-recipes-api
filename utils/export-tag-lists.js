const path = require('path')
const fs = require('fs')
const assert = require('assert')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

require('../models/')

const config = require('../config/config.js')
const recipesDb = require('../helpers/db/recipes')
const tagsDb = require('../helpers/db/tags.js')

const done = (cb) => {
    mongoose.disconnect( () => {
        console.log('')
        console.log('disconnected from mongo')
        if (cb) cb()
    })
}

const writeToFile = (tag, recipes, last) => {
    let fileout = `${config.externalBaseUrl}/tags/${tag.slug}.json`
    fileout = path.resolve(__dirname, fileout)
    const data = {
        recipes: recipes.map(recipe => { return { label: recipe.label, _id: recipe._id }}),
        tag
    }
    fs.writeFile(fileout, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            done(console.log(err))
            throw err
        }
        console.log(tag.slug, 'written to:', fileout)
        if (last) done(console.log('done writing files.'))
    })
}

const writeTagIndex = tags => {
    let fileout = `${config.externalBaseUrl}/tags/index.json`
    fileout = path.resolve(__dirname, fileout)
    fs.writeFile(fileout, JSON.stringify({ tags }, null, 2), (err) => {
        if (err) {
            throw new Error(err)
        }
    })
}

const exportTagLists = tags => {
    writeTagIndex(tags)

    tags.forEach((tag, index) => {
        const last = index === tags.length -1
        recipesDb.getRecipesByTagId(tag._id)
            .then(results => {
                writeToFile(tag, results.recipes, last)
            })
            .catch(err => {
                done(console.error(err))
            })
    })
}

mongoose.connect(config.dbHost + config.devDb, (err) => {
    assert.equal(null, err)
    console.log('connected to', mongoose.connection.db.databaseName)
    tagsDb.getAll()
        .then(docs => {
            exportTagLists(docs)
        })
        .catch(err => {
            done(console.error(err))
        })
})
