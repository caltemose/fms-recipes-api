const express = require('express')
const router = express.Router()
const tags = require('../../helpers/db/tags')

router.get('/', (req, res) => {
    tags.getAll()
        .then(docs => {
            res.render('tags', { tags: docs })
        })
        .catch(err => {
            res.render('tags', { err: err })
        })
})

// router.get('/:id', (req, res) => {
//     const id = req.params.id
//     if (!id)
//         res.json({err: 'Tag ID not supplied.'})

//     tags.getById(id)
//         .then(doc => {
//             res.render('tag', { unit: doc })
//         })
//         .catch(err => {
//             res.json('tag', { err: err })
//         })
// })

module.exports = router
