const Promise = require('bluebird')
const mongoose = require('mongoose')
const Unit = mongoose.model('Unit')

module.exports = {
    getUnits: function getUnits (filter) {
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
    }
}
