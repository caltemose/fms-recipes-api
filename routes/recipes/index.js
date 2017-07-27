const express = require('express')
const router = express.Router()
const recipes = require('../../helpers/db/recipes')

router.get('/', (req, res) => {
    recipes.getRecipes(req.query.filter)
        .then(docs => {
            res.render('recipes', { recipes: docs })
        })
        .catch(err => {
            res.render('recipes', { err })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    if (!id)
        res.json({err: 'Recipe ID not supplied.'})

    recipes.getRecipeById(id)
        .then(doc => {
            res.render('recipe', { recipe: doc })
        })
        .catch(err => {
            res.json('recipe', { err })
        })
})

router.get('/tagged/:tag', (req, res) => {
    const slug = req.params.tag

    recipes.getRecipesByTagSlug(slug)
        .then(results => {
            res.render('recipes-by-tag', results)
        })
        .catch(err => {
            res.json('recipes-by-tag', { err })
        })
})

module.exports = router
