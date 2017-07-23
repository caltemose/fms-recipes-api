const express = require('express')
const router = express.Router()
const units = require('../../../helpers/db/units')

/**
 * Get all units.
 * 
 * @return {Array} of unit documents
 */
router.get('/', (req, res) => {
    units.getUnits()
        .then(docs => {
            res.json({ units: docs })
        })
        .catch(err => {
            res.json({ err: err })
        })
})

/**
 * Create a new unit with the given label.
 * 
 * @param {String} unitName name of unit to add
 * @return {Object} unit object
 */
router.post('/', (req, res) => {
    const label = req.body.label

    units.addUnit(label)
        .then(doc => {
            res.json({ unit: doc })
        })
        .catch(err => {
            res.json({ err })
        })
})

module.exports = router
