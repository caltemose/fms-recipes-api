const express = require('express'),
    router = express.Router();

router.all('*', function (req, res) {
    res.send('The database connection could not be made. All API routes are inactive.');
})

module.exports = router;
