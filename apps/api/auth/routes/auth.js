var express = require('express');
var router = express.Router();
var mysqlQuery = require('../utils/mysql');

router.get('/', async (req, res) => {
  const result = await mysqlQuery('SELECT 1');
  res.json(result);
});


module.exports = router;
