const express = require('express')
const router = express.Router()
const collections = require('../../../helpers/db/collections')

/**
 * Get all collections.
 * 
 * @return {Array} collection documents
 */
router.get('/', (req, res) => {
    collections.getCollections()
        .then(docs => {
            res.json({ collections: docs })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

/**
 * Create a collection with the given name.
 * 
 * @param {String} value collection name (req.body)
 * @return {Object} new collection document
 */
router.post('/', (req, res) => {
    const label = req.body.label

    collections.addCollection(label)
        .then(doc => {
            res.json({ doc })
        })
        .catch(err => {
            res.json({ err })
        })
})

/**
 * Edit a collection label.
 * 
 * @param {String} id ObjectId of collection to update
 * @param {String} label new label value
 */
router.put('/:id/label', (req, res) => {
    const id = req.params.id
    const label = req.body.value
    
    collections.updateCollectionLabel(id, label)
        .then(() => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

/**
 * Edit a collection description.
 * 
 * @param {String} id ObjectId of collection to update
 * @param {String} value new description text
 */
router.put('/:id/description', (req, res) => {
    const id = req.params.id
    const description = req.body.value

    collections.updateCollectionDescription(id, description)
        .then(() => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

router.post('/:id/recipes', (req, res) => {
    const id = req.params.id
    const recipeId = req.body.recipeId
    const order = req.body.order

    if (!recipeId || !order)
        throw new Error('recipe id and order must be supplied.')

    collections.addRecipe(id, recipeId, order)
        .then(() => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

router.put('/:id/recipes', (req, res) => {
    const id = req.params.id
    const recipes = req.body.recipes
    if (!recipes)
        throw new Error('recipe items must be supplied.')
    
    collections.updateRecipes(id, recipes)
        .then(() => {
            res.json({ success: true })
        })
        .catch(err => {
            res.json({ err })
        })
})

module.exports = router
