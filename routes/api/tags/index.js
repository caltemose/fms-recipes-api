const express = require('express')
const router = express.Router()
const tags = require('../../../helpers/db/tags')

/**
 * Get all tags.
 * 
 * @return {Array} tag documents
 */
router.get('/', (req, res) => {
    tags.getAll()
        .then(docs => {
            res.json({ tags: docs })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

/**
 * Create a new tag with the given label.
 * 
 * @param {String} tagLabel name of tag to add
 */
router.post('/', (req, res) => {
    const label = req.body.label

    tags.add(label)
        .then(doc => {
            res.json({ tag: doc })
        })
        .catch(err => {
            res.json({ err })
        })
})

/**
 * Get tag(s) by specified search string.
 * 
 * @param {String} query text to search for in tag labels
 * @return {Array} array of matching tag documents
 */
router.get('/search/:query', (req, res) => {
    tags.searchByLabel(req.params.query)
        .then(docs => {
            res.json({ results: docs })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

module.exports = router
