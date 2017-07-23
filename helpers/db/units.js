const Promise = require('bluebird')
const slug = require('slugg')
const mongoose = require('mongoose')
const Unit = mongoose.model('Unit')

module.exports = {
    getUnits: function getUnits () {
        return new Promise((resolve, reject) => {
            Unit.find({}, {}, { sort: { label:1 }}, (err, docs) => {
                if (err) reject(err)
                else resolve(docs)
            })
        })
    },

    getUnitById: function getUnitById (id) {
        if (!id)
            throw new Error('Unit ID not supplied.')

        return new Promise((resolve, reject) => {
            Unit.findById(id, (err, doc) => {
                if (err) reject(err)
                else resolve(doc)
            })
        })
    },
    
    addUnit: function addUnit (label) {
        if (!label)
            throw new Error('Unit label not supplied.')

        return new Promise((resolve, reject) => {
            const unit = new Unit({
                label: label,
                slug: slug(label)
            })
            unit.save((err, doc) => {
                if (err) reject(err)
                else resolve(doc)
            })
        })
    }
}
