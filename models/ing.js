const mongoose = require('mongoose')

var schema = mongoose.Schema({
    label: String
})

module.exports = mongoose.model('Ing', schema)
