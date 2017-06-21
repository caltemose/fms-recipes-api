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
    },

    updateRecipeProperty: function updateRecipeProperty (id, property, value) {
        if (!id || !property || !value)
            throw new Error('Insufficient recipe data provided.')

        return new Promise((resolve, reject) => {
            const update = {}
            update[property] = value

            Recipe.findByIdAndUpdate(id, { $set: update }, (err, recipe) => {
                if (err) reject(err)
                else resolve({ success: true })
            })
        })
    }
}



