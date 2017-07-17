const assert = require('assert')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const config = require('../config/config')
const slug = require('slugg')

let recipes = []
let ingredients = []
let units = []

const getRecipes = (db, callback) => {
    const cursor = db.collection('recipes').find({}).project({label: 1})
    cursor.each((err, doc) => {
        assert.equal(err, null)
        if (doc !== null) {
            recipes.push(doc)
        } else {
            callback()
        }
    })
}

const getIngredients = (db, callback) => {
    const cursor = db.collection('ingredients').find({}).project({label: 1})
    cursor.each((err, doc) => {
        assert.equal(err, null)
        if (doc !== null) {
            ingredients.push(doc)
        } else {
            callback()
        }
    })
}

const getUnits = (db, callback) => {
    const cursor = db.collection('units').find({}).project({label: 1})
    cursor.each((err, doc) => {
        assert.equal(err, null)
        if (doc !== null) {
            units.push(doc)
        } else {
            callback()
        }
    })
}

const lookupIngredient = (label, type) => {
    if (type === 'recipe') {
        for(let i=0; i<recipes.length; i++) {
            if (recipes[i].label === label) {
                return recipes[i]._id
            }
        }
    } else {
        for(let i=0; i<ingredients.length; i++) {
            if (ingredients[i].label === label) {
                return ingredients[i]._id
            }
        }
    }
    return null
}

const lookupUnit = (unit) => {
    for(let i=0; i<units.length; i++) {
        if (units[i].label === unit) {
            return units[i]._id
        }
    }
    return null
}

const updateRecipes = (db, callback) => {
    cursor = db.collection('recipes').find()
    cursor.each((err, doc) => {
        assert.equal(err, null)

        if (doc !== null) {
            let newDoc = {}

            newDoc.active = !!doc.active
            newDoc.core = !!doc.core
            newDoc.label = doc.label
            newDoc.slug = slug(doc.label)
            newDoc.notes = doc.notes

            // convert recipe.difficulty to Number
            if (doc.difficulty !== null) {
                newDoc.difficulty = Number(doc.difficulty)
            }

            // update recipe source
            newDoc.source = {}
            if (doc.source) {
                if (doc.source.name && doc.source.name !== "0") {
                    newDoc.source.name = doc.source.name
                }

                if (doc.source.author && doc.source.author !== "0") {
                    newDoc.source.author = doc.source.author
                }

                if (doc.source.url && doc.source.url !== "0") {
                    newDoc.source.url = doc.source.url
                }

                if (doc.source.page && doc.source.page !== "0") {
                    newDoc.source.page = doc.source.page
                }
            }

            // update recipe times
            newDoc.time = {}
            if (doc.time) {
                if (doc.time.prep) {
                    newDoc.time.prep = Number(doc.time.prep)
                }

                if (doc.time.cook) {
                    newDoc.time.cook = Number(doc.time.cook)
                }

                if (doc.time.rest) {
                    newDoc.time.rest = Number(doc.time.rest)
                }

                if (doc.time.total) {
                    newDoc.time.total = Number(doc.time.total)
                }
            }

            // update recipe yield
            newDoc.yield = {}
            if (doc.yield) {
                if (doc.yield.amount) {
                    newDoc.yield.amount = Number(doc.yield.amount)
                }

                if (doc.yield.label) {
                    newDoc.yield.label = doc.yield.label
                }
            }

            // update ingredients list
            newDoc.ingredients = {}
            for(let i=0; i<doc.ingredients.length; i++) {
                const old = doc.ingredients[i]
                let ing = {}
                ing._id = ObjectId()
                ing.type = old.type
                ing.label = old.label
                ing.order = i

                ing.label = old.label
                // get itemId by looking up _id from ingredients/recipes collection depending on old.type
                let lookup = lookupIngredient(old.label, old.type)
                if (lookup) {
                    ing.itemId = lookup
                }

                ing.amount = {}
                ing.amount.value = Number(old.amount.value)
                ing.amount.unit = old.amount.unit
                // get unitId by looking up old.unit in units collection
                lookup = lookupUnit(old.amount.unit)
                if (lookup) {
                    ing.amount.unitId = lookup
                }

                ing.notes = old.notes
                newDoc.ingredients[ing._id] = ing
            }

            // console.log(newDoc)
            db.collection('recipes').replaceOne(
                { _id: ObjectId(doc._id) },
                newDoc,
                (err2, results) => {
                    assert.equal(err2, null)
                    console.log('updated: ', doc.label)
                }
            )
        } else {
            callback()
        }
    })
}

MongoClient.connect(config.dbHost + config.db, (err, db) => {
    assert.equal(null, err)

    getRecipes(db, () => {
        console.log('found', recipes.length, 'recipes')
        getIngredients(db, () => {
            console.log('found', ingredients.length, 'ingredients')
            getUnits(db, () => {
                console.log('found', units.length, 'units')
                updateRecipes(db, () => {
                    console.log('done updating recipes')
                    db.close()
                })
            })
        })
    })
})

