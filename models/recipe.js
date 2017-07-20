const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

var ingredientSchema = mongoose.Schema({
    itemId: { type: ObjectId, refPath: 'ingredients.type' },
    type: { type:String, enum: ['Recipe', 'Ingredient'], required:true },
    label: { type:String, trim:true },
    notes: { type:String, trim:true },
    amount: {
        unitId: { type: ObjectId, ref: 'Unit' },
        value: { type:Number, required: true }
    }
})

var directionSchema = mongoose.Schema({
    step: { type: String, required: true }
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
    tags: Array
})

schema.methods.report = function () {
    let msg = this.label
    if (this.active) msg += ' is active'
    else msg += ' is NOT active'
    if (this.core) msg += ' and is a core recipe'
    else msg += ' and is NOT a core recipe'
    msg += ' with ' + this.ingredients.length + ' ingredients.'
    console.log(msg)
}

// schema.pre('save', function (next) {
//     console.log('pre-save schema', this.label)
//     next()
// })

// schema.post('save', function (doc) {
//     console.log('post-save schema', this.label)
// })

module.exports = mongoose.model('Recipe', schema)
