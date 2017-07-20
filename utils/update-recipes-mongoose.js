const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID
mongoose.Promise = require('bluebird');
const assert = require('assert')
const slug = require('slugg')

const config = require('../config/config.js')
const models = require('../models/')

const Recipe = mongoose.model('Recipe')
const Ingredient = mongoose.model('Ingredient')
const Unit = mongoose.model('Unit')

let recipes = []
let ingredients = []
let units = []

const getDocs = (collection, callback) => {
    collection.find({}, (err, docs) => {
        assert.equal(null, err)
        callback(docs)
    })
}

const getIdByLabel = (arr, label) => {
    for(let i=0; i<arr.length; i++) {
        if (arr[i].label === label) {
            return arr[i]._id
        }
    }
    return null
}

const updateRecipes = () => {
    let newRecipes = []

    recipes.forEach((recipe, index) => {
        let newRecipe = {}

        // we must use the _id from the prod db recipe collection
        // rather than generate a new one in order to maintain
        // a proper relationship between ingredients that are recipes
        // and their corresponding recipes. ie, if chicken broth is
        // an ingredient in a recipe, it should be linked to the 
        // fully-qualified recipe document in this collection
        newRecipe._id = recipe._id

        newRecipe.active = !!recipe.active
        newRecipe.core = !!recipe.core
        newRecipe.slug = slug(recipe.label)
        newRecipe.label = recipe.label
        newRecipe.notes = recipe.notes

        if (recipe.difficulty !== null && !isNaN(recipe.difficulty)) {
            newRecipe.difficulty = Number(recipe.difficulty)
        }

        if (recipe.time) {
            newRecipe.time = {}
            if (recipe.time.prep) {
                newRecipe.time.prep = Number(recipe.time.prep)
            }
            if (recipe.time.cook) {
                newRecipe.time.cook = Number(recipe.time.cook)
            }
            if (recipe.time.rest) {
                newRecipe.time.rest = Number(recipe.time.rest)
            }
            if (recipe.time.total) {
                newRecipe.time.total = Number(recipe.time.total)
            }
        }

        if (recipe.yield && recipe.yield.amount) {
            newRecipe.yield = {}
            newRecipe.yield.amount = Number(recipe.yield.amount)
            newRecipe.yield.label = recipe.yield.label
        }

        let recipeIngredients = []
        for(let i=0; i<recipe.ingredients.length; i++) {
            const prev = recipe.ingredients[i]
            let ing = {}
            // create a new ObjectId for this subdocument
            ing._id = ObjectId()
            ing.type = prev.type.charAt(0).toUpperCase() + prev.type.slice(1)
            let ingredientsArray
            switch(ing.type) {
                case 'Recipe':
                    ingredientsArray = recipes
                    break
                default:
                    ingredientsArray = ingredients
            }
            ing.itemId = getIdByLabel(ingredientsArray, prev.label)
            ing.amount = {}
            ing.amount.value = Number(prev.amount.value)
            ing.amount.unitId = getIdByLabel(units, prev.amount.unit)
            ing.notes = prev.notes
            recipeIngredients.push(ing)
        }
        newRecipe.ingredients = recipeIngredients
        const doc = new Recipe(newRecipe)
        doc.save((err, savedDoc) => {
            assert.equal(null, err)
            console.log('saved ' + savedDoc.label)
            if (index === recipes.length-1) {
                done(() => {console.log('done')})
            }
        })
    })
}

const done = (cb) => {
    mongoose.disconnect( () => {
        console.log('')
        console.log('disconnected from mongo')
        if (cb) cb()
    })
}

const getDevData = () => {
    mongoose.connect(config.dbHost + config.devDb, (err) => {
        assert.equal(null, err)
        console.log('connected to', mongoose.connection.db.databaseName)

        getDocs(Ingredient, (docs) => {
            ingredients = docs
            console.log('found', ingredients.length, 'ingredients')
            getDocs(Unit, (docs) => {
                units = docs
                console.log('found', units.length, 'units')
                console.log('')
                updateRecipes()
            })
        })
    })
}

mongoose.connect(config.dbHost + config.db, (err) => {
    assert.equal(null, err)
    console.log('connected to', mongoose.connection.db.databaseName)

    getDocs(Recipe, (docs) => {
        recipes = docs
        console.log('found', recipes.length, 'recipes')
        done(getDevData)
    })
})


