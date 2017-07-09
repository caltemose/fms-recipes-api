const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: "API Index is here."})
})

router.use('/recipes', require('./recipes/'))
router.use('/ingredients', require('./ingredients/'))
router.use('/units', require('./units/'))

module.exports = router
