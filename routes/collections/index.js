const express = require('express')
const router = express.Router()
const collections = require('../../helpers/db/collections')

router.get('/', (req, res) => {
    collections.getCollections(req.query.filter)
        .then(docs => {
            res.render('collections', { collections: docs })
        })
        .catch(err => {
            res.render('collections', { err })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    if (!id)
        res.json({err: 'Collection ID not supplied.'})

    /* recipes.getRecipeById(id)
        .then(doc => {
            res.render('recipe', { recipe: doc })
        })
        .catch(err => {
            res.json('recipe', { err })
        }) */
})

module.exports = router
