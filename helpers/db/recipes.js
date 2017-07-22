const Promise = require('bluebird')
const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
const slug = require('slugg')

const SUCCESS_RESULT = { success: true }

module.exports = {
    getRecipes: function getRecipes (filter) {
        return new Promise((resolve, reject) => {
            let query = {}
            if (!filter || filter === 'active') query = {active:1}
            else if (filter === '!active') query = {active:0}
            else if (filter === 'core') query = {core:1}
            else if (filter === '!core') query = {core:0}

            Recipe.find(query, 'slug label core', { sort: { name:1 }}, (err, docs) => {
                if (err) reject(err)
                else resolve(docs)
            })
        })
    },

    getRecipeById: function getRecipeById (id) {
        if (!id)
            throw new Error('Recipe ID not supplied.')

        return new Promise((resolve, reject) => {
            Recipe
                .findOne({ _id: id})
                .populate('ingredients.item ingredients.amount.unit')
                .exec((err, doc) => {
                    if (err) reject(err)
                    else resolve(doc)
                })
        })
    },

    updateRecipeProperty: function updateRecipeProperty (id, property, value, option) {
        if (!id || !property || value === 'undefined' || value === null)
            throw new Error('Insufficient recipe data provided.')

        return new Promise((resolve, reject) => {
            let update = {}
            
            if (property === 'directions') {
                // TODO update directions saving to use subdocuments properly
                update[property + '.' + option] = value
            } else {
                update[property] = value

                if (property === 'label') {
                    update.slug = slug(value)
                }
            }

            Recipe.findByIdAndUpdate(id, { $set: update }, (err, recipe) => {
                if (err) reject(err)
                else resolve(SUCCESS_RESULT)
            })
        })
    },

    updateRecipeIngredientProperty: function updateRecipeIngredientProperty (recipeId, ingredientId, property, value) {
        if (!recipeId || !ingredientId || !property || value === null)
            throw new Error('Insufficient recipe ingredient data provided.')
        
        return new Promise((resolve, reject) => {
            Recipe.findById(recipeId, (err, doc) => {
                if (err) reject(err)
                if (!doc) reject('No recipe found with given id')
                
                const ing = doc.ingredients.id(ingredientId)
                
                if (property === 'item') {
                    ing[property] = mongoose.Types.ObjectId(value)
                } else {
                    ing[property] = value
                }

                doc.save((err, updated) => {
                    if (err) reject(err)
                    resolve({recipe: updated})
                })
            })
        })
    },

    // TODO this function may not be needed once recipe saving refactoring is updated
    updateRecipeIngredientLabel: function updateRecipeIngredientLabel (recipeId, index, id, label) {
        if (!recipeId || !index || !id || !label)
            throw new Error('Insufficient recipe ingredient data provided.')

        return new Promise((resolve, reject) => {
            Recipe.findById(recipeId, (err, doc) => {
                if (err) reject(err)
                if (!doc) reject('No document found with given id')
                doc.ingredients[index].id = mongoose.Types.ObjectId(id)
                doc.ingredients[index].label = label
                doc.save((err, updated) => {
                    if (err) reject(err)
                    resolve({recipe: updated})
                })
            })
        })
    },

    updateRecipeIngredientAmount: function updateRecipeIngredientAmount (recipeId, ingredientId, property, value) {
        if (!recipeId || !ingredientId || !property || !value)
            throw new Error('Insufficient recipe ingredient amount data provided.')
        
        return new Promise((resolve, reject) => {
            Recipe.findById(recipeId, (err, doc) => {
                if (err) reject(err)
                if (!doc) reject('No document found with given id')

                const ing = doc.ingredients.id(ingredientId)
                if (property === "value") {
                    ing.amount.value = Number(value)
                } else {
                    ing.amount.unit = mongoose.Types.ObjectId(value)
                }

                doc.save((err, updated) => {
                    if (err) reject(err)
                    resolve({recipe: updated})
                })
            })
        })
    }
}


