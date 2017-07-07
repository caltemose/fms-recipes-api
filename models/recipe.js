const mongoose = require('mongoose')
const createdDate = require('../helpers/createdDate')

var ingredientSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    type: { type:String, enum: ['recipe', 'ingredient'], required:true, trim:true },
    label: { type:String, required:true, trim:true },
    notes: { type:String, trim:true },
    amount: {
        unit: { type:String, required: true },
        value: { type:Number, required: true }
    }
})

var schema = mongoose.Schema({
    created: { type:Date },
    name: { type:String, required:true, trim:true }, 
    label: { type:String, required:true, trim:true },
    active: { type:Boolean, required:true, default:true },
    core: { type:Boolean, required:true, default:false },
    serves: {
        amount: { type:Number },
        label: { type:String }
    },
    yield: {
        amount: { type:Number },
        label: { type:String }
    },
    difficulty: { type: Number, enum: [1,2,3] },
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
    ingredients: [ingredientSchema],
    directions: Object,
    notes: String,
    images: Array,
    tags: Array
})

// add created date property
schema.plugin(createdDate)

module.exports = mongoose.model('Recipe', schema)
