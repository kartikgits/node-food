'use strict';

const mysql = require('mysql');

// local mysql db connection
const databaseConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodefood'
});

databaseConnection.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('Connected to MySQL database');
});

module.exports = databaseConnection;