const config = require('./config.json')
const mysql = require('mysql');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('database is connected!')
});

module.exports = connection;