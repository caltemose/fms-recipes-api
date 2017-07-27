const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home')
})

router.use('/recipes', require('./recipes/'))
router.use('/ingredients', require('./ingredients/'))
router.use('/units', require('./units/'))
router.use('/tags', require('./tags/'))
router.use('/api', require('./api/'))

module.exports = router
