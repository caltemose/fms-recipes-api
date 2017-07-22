const Promise = require('bluebird')
const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
const slug = require('slugg')
const ObjectId = mongoose.Types.ObjectId

const SUCCESS_RESULT = { success: true }

module.exports = {
    getRecipes: function getRecipes (filter) {
        return new Promise((resolve, reject) => {
            let query = {}
            if (!filter || filter === 'active') query = {active:1}
            else if (filter === '!active') query = {active:0}
            else if (filter === 'core') query = {core:1}
            else if (filter === '!core') query = {core:0}

            Recipe.find(query, 'slug label core', { sort: { label:1 }}, (err, docs) => {
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

    addRecipe: function addRecipe (recipeName) {
        if (!recipeName)
            throw new Error('Must provide recipe name to create new recipe')
        
        return new Promise((resolve, reject) => {
            const recipe = new Recipe({
                label: recipeName,
                slug: slug(recipeName)
            })
            recipe.save((err, doc) => {
                if (err) reject(err)
                else resolve(doc)
            })
        })
    },

    addIngredientToRecipe: function addIngredientToRecipe (id) {
        if (!id)
            throw new Error('Recipe ID must be provided to add ingredient')
        
        return new Promise((resolve, reject) => {
            Recipe
                .findOne({ _id: id })
                .exec((err, doc) => {
                    if (err) reject(err)
                    else {
                        doc.ingredients.push({ type: "Ingredient", amount: { value: 1 }})
                        doc.save((err, updatedDoc) => {
                            if (err) {
                                reject(err)
                            } else {
                                const newIng = updatedDoc.ingredients[updatedDoc.ingredients.length-1]
                                console.log('newIng', newIng)
                                resolve({ doc: newIng })
                            }
                        })
                    }
                })
        })
    },

    deleteIngredientFromRecipe: function deleteIngredientFromRecipe (id, ingredientId) {
        if (!id || !ingredientId)
            throw new Error('Recipe ID and Ingredient ID must be provided to remove a recipe ingredient')

        return new Promise((resolve, reject) => {
            Recipe
                .findOne({ _id: id})
                .exec((err, doc) => {
                    if (err) reject(err)
                    else {
                        doc.ingredients.id(ingredientId).remove()
                        doc.save((err, updatedDoc) => {
                            if (err) reject(err)
                            else {
                                resolve({ doc: updatedDoc })
                            }
                        })
                    }
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
                    ing[property] = ObjectId(value)
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
                doc.ingredients[index].id = ObjectId(id)
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
                if (property === 'value') {
                    ing.amount.value = Number(value)
                } else {
                    ing.amount.unit = ObjectId(value)
                }

                doc.save((err, updated) => {
                    if (err) reject(err)
                    resolve({recipe: updated})
                })
            })
        })
    }
}


