const Promise = require('bluebird')
const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')

module.exports = {
    getRecipes: function getRecipes (filter) {
        return new Promise((resolve, reject) => {
            let query = {}
            if (!filter || filter === 'active') query = {active:1}
            else if (filter === '!active') query = {active:0}
            else if (filter === 'core') query = {core:1}
            else if (filter === '!core') query = {core:0}

            Recipe.find(query, 'name label core', { sort: { name:1 }}, (err, docs) => {
                if (err) reject(err)
                else resolve(docs)
            })
        })
    },

    getRecipeById: function getRecipeById (id) {
        if (!id)
            throw new Error('Recipe ID not supplied.')
        return new Promise((resolve, reject) => {
            Recipe.findById(id, (err, doc) => {
                if (err) reject(err)
                else resolve(doc)
            })
        })
    }
}



