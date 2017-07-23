const express = require('express')
const router = express.Router()
const units = require('../../../helpers/db/units')

router.get('/', (req, res) => {
    units.getUnits()
        .then(docs => {
            res.json({ units: docs })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

module.exports = router
