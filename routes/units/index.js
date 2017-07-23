const express = require('express')
const router = express.Router()
const units = require('../../helpers/db/units')

router.get('/', (req, res) => {
    units.getUnits()
        .then(docs => {
            res.render('units', { units: docs })
        })
        .catch(err => {
            res.render('units', { err: err })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    if (!id)
        res.json({err: 'Unit ID not supplied.'})

    units.getUnitById(id)
        .then(doc => {
            res.render('unit', { unit: doc })
        })
        .catch(err => {
            res.json('unit', { err: err })
        })
})

module.exports = router
