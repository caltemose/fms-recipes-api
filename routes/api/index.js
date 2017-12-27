const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: 'API Index is here.'})
})

router.use('/collections', require('./collections/'))
router.use('/recipes', require('./recipes/'))
router.use('/ingredients', require('./ingredients/'))
router.use('/units', require('./units/'))
router.use('/tags', require('./tags/'))

module.exports = router
