const express = require('express')
const router = express.Router()
const ingredients = require('../../helpers/db/ingredients')

router.get('/', (req, res) => {
    ingredients.getIngredients()
        .then(docs => {
            res.render('ingredients', { ingredients: docs })
        })
        .catch(err => {
            res.render('ingredients', { err: err })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    if (!id)
        res.json({err: 'Ingredient ID not supplied.'})

    ingredients.getIngredientById(id)
        .then(doc => {
            res.render('ingredient', { ingredient: doc })
        })
        .catch(err => {
            res.json('ingredient', { err: err })
        })
})

module.exports = router
