const express = require('express')
const router = express.Router()
const ingredients = require('../../../helpers/db/ingredients')

/**
 * Get all ingredients.
 * 
 * @return {Array} ingredient documents
 */
router.get('/', (req, res) => {
    ingredients.getIngredients()
        .then(docs => {
            res.json({ ingredients: docs })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

/**
 * Create a new ingredient with the given label.
 * 
 * @param {String} ingredientName name of ingredient to add
 */
router.post('/', (req, res) => {
    const label = req.body.label

    ingredients.addIngredient(label)
        .then(doc => {
            res.json({ ingredient: doc })
        })
        .catch(err => {
            res.json({ err })
        })
})


/**
 * Get ingredient(s) by specified search string.
 * 
 * @param {String} query text to search for in ingredient labels
 * @return {Array} array of matching ingredient documents
 */
router.get('/search/:query', (req, res) => {
    ingredients.searchIngredients(req.params.query)
        .then(docs => {
            res.json({ results: docs })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

module.exports = router
