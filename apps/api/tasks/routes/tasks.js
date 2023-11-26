var express = require('express');
var router = express.Router();
var mysqlQuery = require('../utils/mysql');

router.get('/', async (req, res) => {
  const result = await mysqlQuery('SELECT * FROM main.Tasks');
  result.forEach(curr => curr.Title = `V2 - ${curr.Title}` );
  res.json(result);
});

router.post('/', async (req, res) => {
  const {title, status} = req.body;
  try {
    await mysqlQuery(`INSERT INTO main.Tasks (Title, Status) VALUES('${title}', ${status})`);
    res.status(200).send();
  } catch (ex) {
    res.status(500).send();
  }
})

router.patch('/:id', async (req, res) => {
  const {id} = req.params;
  const {status} = req.body;
  try {
    await mysqlQuery(`UPDATE main.Tasks SET status=${status} WHERE ID=${id}`);
    res.status(200).send();
  } catch (ex) {
    res.status(500).send();
  }
})

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    await mysqlQuery(`DELETE FROM main.Tasks WHERE ID=${id}`);
    res.status(200).send();
  } catch (ex) {
    res.status(500).send();
  }
})


module.exports = router;
