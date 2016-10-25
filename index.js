const express = require('express')
    , cors = require('cors')
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    // , uuid = require('node-uuid')
    // , njwt = require('njwt')
    // , Cookies = require('cookies')
    , mongoose = require('mongoose')
    , passport = require('passport')
    , config = require('./config.js')
    ;

const app = express();
const port = process.env.PORT || config.port;

app.use(logger('combined'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(port);

mongoose.connect('mongodb://localhost', function (err) {
    if (err) {
        console.log('fms-recipes running in NO_DATABASE mode on port:', port);
        // use no-mongo routing to catch all routes and send them to error page
        const noMongoRoutes = require('./routes/no-mongo');
        app.use('*', noMongoRoutes);
    } else {
        console.log('fms-recipes running on port:', port);
        // use normal routing
        const apiRoutes = require('./routes/api');
        app.use('/', apiRoutes);
    }
});
