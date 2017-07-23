const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Rec = mongoose.model('Rec')

router.get('/', (req, res) => {
    Rec
        .find()
        .populate('ingredients.item')
        .exec((err, docs) => {
            if (err) {
                return res.json({err: err})
            }
            res.json({docs: docs})
        })
})

module.exports = router
