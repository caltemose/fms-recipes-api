const express = require('express')
const router = express.Router()
const collections = require('../../helpers/db/collections')

router.get('/', (req, res) => {
    collections.getCollections()
        .then(docs => {
            console.log('collections', docs)
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

    collections.getCollectionById(id)
        .then(doc => {
            res.render('collection', { collection: doc })
        })
        .catch(err => {
            res.json('collection', { err })
        })
})

module.exports = router
