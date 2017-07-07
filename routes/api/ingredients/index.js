const express = require('express')
const router = express.Router()
const ingredients = require('../../../helpers/db/ingredients')

router.get('/', (req, res) => {
    ingredients.getIngredients()
        .then(docs => {
            res.json({ ingredients: docs })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

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
