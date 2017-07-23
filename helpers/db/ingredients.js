const Promise = require('bluebird')
const slug = require('slugg')
const mongoose = require('mongoose')
const Ingredient = mongoose.model('Ingredient')

module.exports = {
    getIngredients: function getIngredients () {
        return new Promise((resolve, reject) => {
            Ingredient.find({}, {}, { sort: { label:1 }}, (err, docs) => {
                if (err) reject(err)
                else resolve(docs)
            })
        })
    },

    getIngredientById: function getIngredientById (id) {
        if (!id)
            throw new Error('Ingredient ID not supplied.')

        return new Promise((resolve, reject) => {
            Ingredient.findById(id, (err, doc) => {
                if (err) reject(err)
                else resolve(doc)
            })
        })
    },

    addIngredient: function addIngredient (label) {
        if (!label)
            throw new Error('Ingredient label not supplied.')

        return new Promise((resolve, reject) => {
            const ingredient = new Ingredient({
                label: label,
                slug: slug(label)
            })
            ingredient.save((err, doc) => {
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
