const express = require('express')
const router = express.Router()
const recipes = require('../../../helpers/db/recipes')

router.get('/', (req, res) => {
    recipes.getRecipes(req.query.filter)
        .then(docs => {
            res.json({ recipes: docs })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

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

// add a new ingredient to a recipe
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

router.post('/:id/:property', (req, res) => {
    const id = req.params.id
    const property = req.params.property
    const value = req.body.value

    recipes.updateRecipeProperty(id, property, value)
        .then(result => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

router.post('/:id/:property/:option', (req, res) => {
    const id = req.params.id
    const property = req.params.property
    const option = req.params.option
    const value = req.body.value

    recipes.updateRecipeProperty(id, property, value, option)
        .then(result => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

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

router.post('/:id/ingredient/:ingredientId/:property', (req, res) => {
    const id = req.params.id
    const ingredientId = req.params.ingredientId
    const property = req.params.property
    const value = req.body.value

    recipes.updateRecipeIngredientProperty(id, ingredientId, property, value)
        .then(result => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

module.exports = router
