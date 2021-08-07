const mysql = require('mysql');
// require('dotenv').config()

const connection = mysql.createConnection({
  route: process.env.MYSQL_PORT,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: '',
  database: process.env.MYSQL_DATABASE,
  timezone: 'UTC',
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log('You are now conected ...');
});

module.exports = connection;
