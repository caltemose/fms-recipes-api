const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

var recipeSchema = mongoose.Schema({
    item: ObjectId,
    order: Number
})

var schema = mongoose.Schema({
    label: { type:String, required:true, trim:true },
    slug: { type:String, required:true },
    description: { type:String },
    recipes: [ recipeSchema ]
})

module.exports = mongoose.model('Collection', schema)
