const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: "API: Recipes index"})
})



module.exports = router
