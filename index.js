const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/config.js')

const app = express()
const port = process.env.PORT || config.port
const nodeEnv = process.env.NODE_ENV || 'dev'

require('./models/')

mongoose.Promise = require('bluebird')
mongoose.set('debug', true)

app.use(logger('tiny'))
app.use(bodyParser.json())
app.locals.doctype = 'html'
app.set('view engine', 'pug')
app.use(express.static('public'))
app.listen(port)

const dbUrl = nodeEnv === 'prod' ? config.dbHost + config.db : config.dbHost + config.devDb

mongoose.connect(dbUrl, function (err) {
    if (err) {
        console.log('fms-recipes running in NO_DATABASE mode on port:', port)
        // use no-mongo routing to catch all routes and display appropriate content
        app.use('*', require('./routes/no-mongo'))
    } else {
        console.log('fms-recipes running on port:', port)
        console.log('...using database at:', dbUrl)
        // use normal routing
        app.use('/', require('./routes/'))
    }
})
