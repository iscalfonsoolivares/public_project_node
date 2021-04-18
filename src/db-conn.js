const mysql = require('mysql');

const keys = require('./config/keys');

console.log('Using ' + keys.mySqlDataBase);

const dbConn = mysql.createConnection({
  host     : keys.mySqlHost,
  port     : keys.mySqlPort,
  user     : keys.mySqlUser,
  password : keys.mySqlPassword,
  database : keys.mySqlDataBase
});

module.exports = dbConn;