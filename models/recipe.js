const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

var ingredientSchema = mongoose.Schema({
    item: { type: ObjectId, refPath: 'ingredients.type' },
    type: { type:String, enum: ['Recipe', 'Ingredient'], required:true },
    label: { type:String, trim:true },
    notes: { type:String, trim:true },
    amount: {
        unit: { type: ObjectId, ref: 'Unit' },
        value: { type:Number, required: true }
    }
})

var directionSchema = mongoose.Schema({
    step: { type: String }
})

var schema = mongoose.Schema({
    label: { type:String, required:true, trim:true },
    slug: { type:String, required:true },
    active: { type:Boolean, required:true, default:true },
    core: { type:Boolean, required:true, default:false },
    serves: {
        amount: Number,
        label: String
    },
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
    directions: [ directionSchema ],
    notes: String,
    tags: [{ type: ObjectId, ref: 'Tag'}]
})

module.exports = mongoose.model('Recipe', schema)
