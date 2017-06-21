const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home')
})

router.use('/recipes', require('./recipes/'))

router.use('/api', require('./api/'))

module.exports = router
