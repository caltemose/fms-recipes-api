const mongoose = require('mongoose')

var schema = mongoose.Schema({
    label: { type:String, required:true, trim:true, unique: true },
    slug: { type: String }
})

module.exports = mongoose.model('Tag', schema)
