const Promise = require('bluebird')
const mongoose = require('mongoose')
const Collection = mongoose.model('Collection')
// const Tag = mongoose.model('Tag')
// const slug = require('slugg')
// const ObjectId = mongoose.Types.ObjectId

// const SUCCESS_RESULT = { success: true }

module.exports = {
    getCollections: function getCollections () {
        return new Promise((resolve, reject) => {
            let query = {}
            Collection.find(query, { sort: { label:1 }}, (err, docs) => {
                if (err) reject(err)
                else resolve(docs)
            })
        })
    },

    getCollectionById: function getCollectionById (id) {
        if (!id)
            throw new Error('Collection ID not supplied.')

        return new Promise((resolve, reject) => {
            Collection
                .findOne({ _id: id})
                /* .populate('ingredients.item ingredients.amount.unit tags') */
                .exec((err, doc) => {
                    if (err) reject(err)
                    else resolve(doc)
                })
        })
    }
}
