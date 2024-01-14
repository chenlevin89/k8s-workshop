var express = require('express');
var router = express.Router();
var mysqlQuery = require('../utils/mysql');
const {v4: uuidv4} = require('uuid');

router.get('/', async (req, res) => {
  const result = await mysqlQuery('SELECT 1');
  res.json({name: "Test User", id: uuidv4()});
});


module.exports = router;
