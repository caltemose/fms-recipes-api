const express = require('express'),
    router = express.Router();

let baseRoute = function (req, res) {
    res.json({msg: "API Index is here."})
};

router.get('/', baseRoute);
router.get('/api', baseRoute);

module.exports = router;
