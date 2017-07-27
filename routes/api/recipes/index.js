const express = require('express')
const router = express.Router()
const recipes = require('../../../helpers/db/recipes')

/**
 * Get all recipes. If a filter is provided, results will
 * be filtered (options: core, active).
 * 
 * @return {Array} recipe documents
 */
router.get('/', (req, res) => {
    recipes.getRecipes(req.query.filter)
        .then(docs => {
            res.json({ recipes: docs })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

/**
 * Create a recipe with the given name.
 * 
 * @param {String} value recipe name (req.body)
 * @return {Object} new recipe document
 */
router.post('/', (req, res) => {
    const value = req.body.value

    recipes.addRecipe(value)
        .then(recipe => {
            res.json({ recipe })
        })
        .catch(err => {
            res.json({ err })
        })
})

/**
 * Get recipe by id.
 * 
 * @param {String} id (Mongo ObjectId) of recipe to find (url param)
 * @return {Object} recipe document
 */
router.get('/:id', (req, res) => {
    const id = req.params.id
    if (!id)
        res.json({err: 'Recipe ID not supplied.'})

    recipes.getRecipeById(id)
        .then(doc => {
            res.json({ recipe: doc })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

/** 
 * Add a new ingredient to a recipe.
 * 
 * @param {String} id (Mongo ObjectId) of recipe to edit (url param)
 * @return {Object} updated recipe document
 */
router.post('/:id/ingredient', (req, res) => {
    const id = req.params.id

    recipes.addIngredientToRecipe(id)
        .then(result => {
            res.json(result.doc)
        })
        .catch(err => {
            res.json({err})
        })
})

/**
 * Delete an ingredient from a recipe.
 * 
 * @param {String} id (ObjectId) of recipe to upate (url param)
 * @param {String} id (ObjectId) of ingredient to remove (url param)
 * @return {Object} updated recipe document
 */
router.delete('/:id/ingredient/:ingredientId', (req, res) => {
    const id = req.params.id
    const ingredientId = req.params.ingredientId

    recipes.deleteIngredientFromRecipe(id, ingredientId)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json({err})
        })
})

/**
 * Add a direction step to a recipe.
 * 
 * @param {String} id ObjectId of recipe to update. (url param)
 * @return {String} ObjectId of new direction step
 */
router.post('/:id/directions/', (req, res) => {
    const id = req.params.id
    
    recipes.addStep(id)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json({err})
        })
})

/**
 * Edit a directions step.
 * 
 * @param {String} id ObjectId of recipe to update (url param)
 * @param {String} stepId ObjectId of direction step to update (url param)
 * @param {String} value text of direction step (req.body)
 * @return {Object} updated recipe document
 */
router.put('/:id/directions/:stepId', (req, res) => {
    const id = req.params.id
    const stepId = req.params.stepId
    const step = req.body.value

    recipes.editStep(id, stepId, step)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json({err})
        })
})

/**
 * Add a tag to a recipe.
 * 
 * @param {String} id ObjectId of recipe to update
 * @param {String} label for new tag
 * @return {Object} new tag object
 */
router.put('/:id/tags', (req, res) => {
    const id = req.params.id
    const tagLabel = req.body.label

    if (!tagLabel || tagLabel == '')
        res.json({ err: 'You must include a tag label to add to the current recipe.'})

    recipes.addTag(id, tagLabel)
        .then((tag) => {
            res.json({ tag })
        })
        .catch(err => {
            res.json({ err })
        })
})

/**
 * Delete tag from recipe.
 * 
 * @param {String} id ObjectId of recipe to update
 * @param {String} tagId ObjectId of tag (subdocument) to delete
 * @return {Object} with success = t/f
 */
router.delete('/:id/tags/:tagId', (req, res) => {
    const id = req.params.id
    const tagId = req.params.tagId

    recipes.deleteTag(id, tagId)
        .then(result => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ err })
        })
})

/**
 * Edit a generic recipe property.
 * 
 * @param {String} id ObjectId of recipe to update
 * @param {String} property name of recipe property to update
 * @param {String} value value of property being updated (req.body)
 */

// TODO change to PUT
router.post('/:id/:property', (req, res) => {
    const id = req.params.id
    const property = req.params.property
    const value = req.body.value

    recipes.updateRecipeProperty(id, property, value)
        .then(() => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

// TODO confirm still in use and change to PUT
router.post('/:id/:property/:option', (req, res) => {
    const id = req.params.id
    const property = req.params.property
    const option = req.params.option
    const value = req.body.value

    recipes.updateRecipeProperty(id, property, value, option)
        .then(() => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ err: err })
        })
})


/**
 * Edit a recipe ingredient's amount data (unit or value).
 * 
 */
// TODO change to PUT
router.post('/:id/ingredient/:ingredientId/amount/:property', (req, res) => {
    const id = req.params.id
    const ingredientId = req.params.ingredientId
    const property = req.params.property // 'unit' || 'value'
    const value = req.body.value // ObjectId || Number

    recipes.updateRecipeIngredientAmount(id, ingredientId, property, value)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json({ err })
        })
})

// TODO change to PUT
router.post('/:id/ingredient/:ingredientId/:property', (req, res) => {
    const id = req.params.id
    const ingredientId = req.params.ingredientId
    const property = req.params.property
    const value = req.body.value

    recipes.updateRecipeIngredientProperty(id, ingredientId, property, value)
        .then(() => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

module.exports = router
