const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: 'root',
  database: 'main'
})

connection.connect();

const execute = (query) => new Promise((res, rej) => {
  connection.query(query, (err, rows, fields) => {
    if (err) rej(err)

    res(rows)
  })
});


module.exports = execute;
