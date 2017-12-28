const Promise = require('bluebird')
const mongoose = require('mongoose')
const Collection = mongoose.model('Collection')
// const Tag = mongoose.model('Tag')
const slug = require('slugg')
// const ObjectId = mongoose.Types.ObjectId

const SUCCESS_RESULT = { success: true }

module.exports = {
    getCollections: function getCollections () {
        return new Promise((resolve, reject) => {
            let query = {}
            Collection.find(query, '', { sort: { label:1 }}, (err, docs) => {
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
                .populate('recipes.item')
                .exec((err, doc) => {
                    if (err) reject(err)
                    else {
                        // manually sort recipes in collection because of Mongoose bug with populate sort
                        // https://github.com/Automattic/mongoose/issues/2202

                        doc.recipes.sort((a, b) => {
                            return a.order > b.order
                        })
                        resolve(doc)
                    }
                })
        })
    },

    addCollection: function addCollection (collectionName) {
        if (!collectionName)
            throw new Error('Must provide collection name to create new collection')
        
        return new Promise((resolve, reject) => {
            const collection = new Collection({
                label: collectionName,
                slug: slug(collectionName)
            })
            collection.save((err, doc) => {
                if (err) reject(err)
                else resolve(doc)
            })
        })
    },

    updateCollectionLabel: function updateCollectionLabel (id, label) {
        if (!id || label === undefined || label === 'undefined' || label === null)
            throw new Error('Insufficient collection data provided.')

        return new Promise((resolve, reject) => {
            let update = {}

            update['label'] = label
            update.slug = slug(label)

            Collection.findByIdAndUpdate(id, { $set: update }, (err) => {
                if (err) reject(err)
                else resolve(SUCCESS_RESULT)
            })
        })
    },

    updateCollectionDescription: function updateCollectionLabel (id, description) {
        if (!id || description === undefined || description === 'undefined' || description === null)
            throw new Error('Insufficient collection data provided.')

        return new Promise((resolve, reject) => {
            let update = {}

            update['description'] = description

            Collection.findByIdAndUpdate(id, { $set: update }, (err) => {
                if (err) reject(err)
                else resolve(SUCCESS_RESULT)
            })
        })
    },

    addRecipe: function addRecipe (id, recipeId, order) {
        if (!id || !recipeId || !order)
            throw new Error('collection id, recipe id and order must be provided.')
        
        return new Promise((resolve, reject) => {
            Collection
                .findOne({ _id: id })
                .exec((err, doc) => {
                    if (err) reject(err)
                    else {
                        doc.recipes.push({ item: recipeId, order })
                        doc.save((err) => {
                            if (err) reject(err)
                            else {
                                resolve({ success: true })
                            }
                        })
                    }
                })
        })
    },

    updateRecipes: function updateRecipes (id, recipes) {
        if (!id || !recipes)
            throw new Error('collection id and recipes array must be provided.')

        return new Promise((resolve, reject) => {
            Collection
                .findOne({ _id: id })
                .exec((err, doc) => {
                    if (err) reject(err)
                    else {
                        doc.recipes = recipes
                        doc.save((err) => {
                            if (err) reject(err)
                            else resolve({ success: true })
                        })
                    }
                })
        })
    }
}
