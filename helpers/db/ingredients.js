const Promise = require('bluebird')
const mongoose = require('mongoose')
const Ingredient = mongoose.model('Ingredient')

module.exports = {
    getIngredients: function getIngredients (filter) {
        return new Promise((resolve, reject) => {
            Ingredient.find({}, {}, { sort: { name:1 }}, (err, docs) => {
                if (err) reject(err)
                else resolve(docs)
            })
        })
    },

    getIngredientsById: function getIngredientsById (id) {
        if (!id)
            throw new Error('Ingredient ID not supplied.')

        return new Promise((resolve, reject) => {
            Ingredient.findById(id, (err, doc) => {
                if (err) reject(err)
                else resolve(doc)
            })
        })
    },

    searchIngredients: function searchIngredients (query) {
        return new Promise((resolve, reject) => {
            Ingredient.find({label: new RegExp('^' + query, 'i')}, {}, { sort: { name: 1 }}, (err, docs) => {
                if (err) reject(err)
                else resolve(docs)
            })
        })
    }
}
