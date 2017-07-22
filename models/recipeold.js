const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

var ingredientSchema = mongoose.Schema({
    id: ObjectId,
    type: String ,
    label: String,
    notes: String,
    amount: {
        unit: String,
        value: Number
    }
})

var schema = mongoose.Schema({
    label: String,
    name: String,
    active: { type:Boolean, required:true, default:true },
    core: { type:Boolean, required:true, default:false },
    yield: {
        amount: Number,
        label: String
    },
    difficulty: { type: Number, enum: [0,1,2,3] },
    source: {
        name: String,
        author: String,
        page: Number,
        url: String
    },
    time: {
        prep: Number,
        cook: Number,
        rest: Number,
        total: Number
    },
    ingredients: [ ingredientSchema ],
    notes: String,
    tags: Array
})

module.exports = mongoose.model('Recipeold', schema)
