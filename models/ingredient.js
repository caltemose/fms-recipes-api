const mongoose = require('mongoose')

var schema = mongoose.Schema({
    label: { type:String, required:true, trim:true, unique: true },
    slug: { type:String, required:true, trim:true }
})

module.exports = mongoose.model('Ingredient', schema)
