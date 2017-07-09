const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Unit = mongoose.model('Unit')

router.get('/', (req, res) => {
    Unit.find({}, {}, { sort: { label:1 }}, (err, units) => {
        if (err) res.json({ err })
        else res.json({ units })
    })
})

module.exports = router
