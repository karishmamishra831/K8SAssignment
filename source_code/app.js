// app.js
const express = require('express');
const mysql = require('mysql2');
const DB_CONFIG = require('./db_config');
const app = express();
const port = 3000;

console.log("new docker file new v1.0.7");

const connection = mysql.createConnection({
    host: DB_CONFIG.MYSQL_HOST,
    user: DB_CONFIG.MYSQL_USER,
    password: DB_CONFIG.MYSQL_PASSWORD,
    database: DB_CONFIG.MYSQL_DATABASE
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL2:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get('/', (req, res) => {
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            console.log('Connected to MySQL error ' + err);
            res.status(500).send('Error fetching data from MySQL...');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});