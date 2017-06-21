const express = require('express'),
    // bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config/config.js')

const app = express()
const port = process.env.PORT || config.port

const models = require('./models/')

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
app.set('view engine', 'pug')
app.use(express.static('public'))
app.listen(port)

mongoose.connect(config.dbHost + config.db, function (err) {
    if (err) {
        console.log('fms-recipes running in NO_DATABASE mode on port:', port)
        // use no-mongo routing to catch all routes and display appropriate content
        app.use('*', require('./routes/no-mongo'))
    } else {
        console.log('fms-recipes running on port:', port)
        // use normal routing
        app.use('/', require('./routes/'))
    }
})
