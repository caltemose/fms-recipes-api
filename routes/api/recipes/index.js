const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
// const Ingredient = mongoose.model('Ingredient')

router.get('/', (req, res) => {
    let filter = req.query.filter
    let query = {}
    if (!filter || filter === 'active') query = {active:1}
    else if (filter === '!active') query = {active:0}
    else if (filter === 'core') query = {core:1}
    else if (filter === '!core') query = {core:0}
    
    Recipe.find(query, 'name label core', { sort: { name:1 }}, (err, docs) => {
        if (err) res.json({err: err})
        res.json(docs)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    if (!id)
        res.json({err: 'Recipe ID not supplied.'})

    Recipe.findById(id, (err, recipe) => {
        if (err) res.json({err: err})
        res.json(recipe)
    })
})

module.exports = router
