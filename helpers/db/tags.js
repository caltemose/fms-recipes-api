const Promise = require('bluebird')
const slug = require('slugg')
const mongoose = require('mongoose')
const Tag = mongoose.model('Tag')

module.exports = {
    getAll: function getAll () {
        return new Promise((resolve, reject) => {
            Tag.find({}, {}, { sort: { label:1 }}, (err, docs) => {
                if (err) reject(err)
                else resolve(docs)
            })
        })
    },

    getById: function getById (id) {
        if (!id)
            throw new Error('Unit ID not supplied.')

        return new Promise((resolve, reject) => {
            Tag.findById(id, (err, doc) => {
                if (err) reject(err)
                else resolve(doc)
            })
        })
    },
    
    add: function add (label) {
        if (!label)
            throw new Error('Tag label not supplied.')

        return new Promise((resolve, reject) => {
            const newDoc = new Tag({
                label: label,
                slug: slug(label)
            })
            newDoc.save((err, doc) => {
                if (err) reject(err)
                else resolve(doc)
            })
        })
    },

    searchByLabel: function searchByLabel (query) {
        return new Promise((resolve, reject) => {
            Tag.find({label: new RegExp('^' + query, 'i')}, {}, { sort: { label: 1 }}, (err, docs) => {
                if (err) reject(err)
                else resolve(docs)
            })
        })
    }
}
