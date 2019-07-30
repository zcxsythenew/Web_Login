'use strict';
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'z',
    password: '',
    database: 'express'
});

var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function (req, res) {
    res.sendStatus(403);
});

router.post('/', function (req, res) {
    var username = req.body.username;
    var password_unsafe = req.body.password;
    var password_safe = bcrypt.hashSync(password_unsafe, 10);

    connection.connect();
    var query = connection.query('SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password_safe],
        function (err, results, fields) {
            if (err || results.length === 0) {
                res.sendStatus(403);
            } else {
                res.sendStatus(200);
            }
        });
    connection.end();
});

module.exports = router;