const mysql = require('mysql');
// require('dotenv').config()

const connection = mysql.createConnection({
  // route: 3306,
  // port: 3306,
  // host: 'localhost',
  // user: 'taufiqp1_ivan',
  // password: 'Rezaasidqi354',
  // database: 'taufiqp1_db_ecommerce',
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
  console.log('You are now conected on db ...');
});

module.exports = connection;
