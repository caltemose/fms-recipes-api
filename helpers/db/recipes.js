const Promise = require('bluebird')
const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
const Tag = mongoose.model('Tag')
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

            // currently using whole30 id since 'support' doesn't exist yet
            // query.tags = { $ne: ObjectId('5977849de3f0716170504979') } // id of support tag

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
                .populate('ingredients.item ingredients.amount.unit tags')
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
                        doc.ingredients.push({ type: 'Ingredient', amount: { value: 1 }})
                        doc.save((err, updatedDoc) => {
                            if (err) {
                                reject(err)
                            } else {
                                const newIng = updatedDoc.ingredients[updatedDoc.ingredients.length-1]
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

    addStep: function addStep (id) {
        if (!id)
            throw new Error('Must provide recipe ID to add a directions step')

        return new Promise((resolve, reject) => {
            Recipe.findOne({ _id: id })
                .exec((err, doc) => {
                    if (err) reject(err)
                    else {
                        // push operation returns human index of newly added step
                        // (ie, indexing starts at 1 instead of 0)
                        const pushed = doc.directions.push({ step: '' })
                        doc.save((err, updatedDoc) => {
                            if (err) reject(err)
                            else {
                                const newStep = updatedDoc.directions[pushed-1]
                                resolve({ doc: newStep })
                            }
                        })
                    }
                })
        })
    },

    editStep: function editStep (id, stepId, step) {
        if (!id || !stepId || step === null)
            throw new Error('Insufficient data provided to edit recipe directions step')
        
        return new Promise((resolve, reject) => {
            Recipe.findOne({ _id: id })
                .exec((err, doc) => {
                    if (err) reject(err)
                    else {
                        doc.directions.id(stepId).step = step
                        doc.save((err, updatedDoc) => {
                            if (err) reject(err)
                            else resolve({ doc: updatedDoc })
                        })
                    }
                })
        })
    },

    updateRecipeProperty: function updateRecipeProperty (id, property, value) {
        if (!id || !property || value === 'undefined' || value === null)
            throw new Error('Insufficient recipe data provided.')

        return new Promise((resolve, reject) => {
            let update = {}

            update[property] = value

            if (property === 'label') {
                update.slug = slug(value)
            }

            Recipe.findByIdAndUpdate(id, { $set: update }, (err) => {
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
    },

    addTag: function addTag (recipeId, tagLabel) {
        if (!recipeId || !tagLabel)
            throw new Error('Insufficient data to add tag to recipe.')

        return new Promise((resolve, reject) => {
            // first check to see if tag exists and create it if it doesn't
            Tag.findOne({ label: tagLabel })
                .exec((err, tag) => {
                    if (err) reject(err)
                    if (!tag) {
                        // create tag
                        const newTag = new Tag({
                            label: tagLabel,
                            slug: slug(tagLabel)
                        })
                        newTag.save((err, newTagDoc) => {
                            if (err) reject(err)
                            _addTagToRecipe(resolve, reject, recipeId, newTagDoc)
                        })
                    } else {
                        _addTagToRecipe(resolve, reject, recipeId, tag)
                    }
                })
        })
    },

    deleteTag: function deleteTag (recipeId, tagId) {
        if (!recipeId || !tagId)
            throw new Error('Insufficient data to delete tag from recipe.')

        return new Promise((resolve, reject) => {
            Recipe
                .findById(recipeId)
                .exec((err, recipe) => {
                    if (err) reject(err)
                    if (recipe) {
                        for(let i=0; i<recipe.tags.length; i++) {
                            if (recipe.tags[i].toString() === tagId) {
                                recipe.tags.splice(i, 1)
                                break
                            }
                        }
                        recipe.save((err, updatedRecipe) => {
                            if (err) reject(err)
                            resolve(updatedRecipe)
                        })
                    }
                })
        })
    },

    getRecipesByTagSlug: function getRecipesByTagSlug (slug) {
        if (!slug)
            throw new Error('Tag slug not provided.')

        return new Promise((resolve, reject) => {
            Tag.findOne({ slug }).exec((err, tag) => {
                if (err) reject(err)
                if (!tag) {
                    resolve({ err: `The tag "${slug}" does not exist.`, tag: { slug }})
                } else {
                    Recipe.find({ tags: tag._id }).sort({ label: 1 }).exec((err, recipes) => {
                        if (err) reject(err)
                        resolve({ recipes, tag })
                    })
                }
            })
        })
    },

    getRecipesByTagId: function getRecipesByTagId (id) {
        if (!id)
            throw new Error('Tag ID not provided.')

        return new Promise((resolve, reject) => {
            Recipe.find({ tags: id }).exec((err, recipes) => {
                if (err) reject(err)
                resolve({ recipes, tagId: id })
            })
        })
    }
}

const _addTagToRecipe = (resolve, reject, recipeId, tag) => {
    Recipe
        .findById(recipeId)
        .exec((err, recipe) => {
            if (err) reject(err)
            if (recipe) {
                recipe.tags.push(tag._id)
                recipe.save((err, updatedRecipe) => {
                    if (err) reject(err)
                    resolve(tag)
                })
            }
        })
}
