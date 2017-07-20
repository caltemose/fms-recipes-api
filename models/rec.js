const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

var ingredientSchema = mongoose.Schema({
    amount: Number,
    unit: String,
    itemType: String, // Ing, Unit
    item: { type: ObjectId, refPath: 'ingredients.itemType' }
})

var schema = mongoose.Schema({
    label: String,
    ingredients: [ingredientSchema]
})

module.exports = mongoose.model('Rec', schema)






// const mongoose = require('mongoose')
// const ObjectId = mongoose.Schema.Types.ObjectId

// var ingredientSchema = mongoose.Schema({
//         amount: Number,
//         unit: String,
//         item: { type: ObjectId, ref: 'Ing' }
// })

// var schema = mongoose.Schema({
//     label: String,
//     ingredients: [ingredientSchema]
// })

// module.exports = mongoose.model('Rec', schema)

