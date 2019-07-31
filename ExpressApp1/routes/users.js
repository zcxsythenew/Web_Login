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
    var password_safe = bcrypt.hashSync(password_unsafe, '$2a$10$7a7URKSTObz8sa1gtHr5J.');

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '8436theNew',
        database: 'express',
        insecureAuth: true
    });

    connection.connect(function (e, args) {
        if (e) {
            res.sendStatus(403);
        } else {
            var query = connection.query('SELECT * FROM users WHERE username = ? AND password = ?',
                [username, password_safe],
                function (err, results, fields) {
                    if (err || results.length === 0) {
                        res.sendStatus(403);
                    } else {
                        var dt = results[0].date;
                        var str = dt.getFullYear().toString() + '/' + (dt.getMonth() + 1).toString() + '/' + dt.getDate().toString();
                        res.status(200).send(str);
                    }
                });
            connection.end();
        }
    });
});

module.exports = router;
