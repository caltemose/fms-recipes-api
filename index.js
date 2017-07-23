const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/config.js')

const app = express()
const port = process.env.PORT || config.port

const models = require('./models/')

mongoose.Promise = require('bluebird')
mongoose.set('debug', true)

app.use(logger('tiny'))
app.use(bodyParser.json())
app.locals.doctype = 'html'
app.set('view engine', 'pug')
app.use(express.static('public'))
app.listen(port)

mongoose.connect(config.dbHost + config.devDb, function (err) {
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
