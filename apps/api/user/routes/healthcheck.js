var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
    res.json({status: true});
});

module.exports = router;
