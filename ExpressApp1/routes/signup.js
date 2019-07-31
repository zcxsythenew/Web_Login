'use strict';
var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function (req, res) {
    res.sendStatus(403);
});

router.post('/', function (req, res) {
    var username = req.body.username;
    var password_unsafe = req.body.password;

    if (password_unsafe !== req.body.repeat) {
        res.sendStatus(403);
        return;
    }

    var password_safe = bcrypt.hashSync(password_unsafe, '$2a$10$7a7URKSTObz8sa1gtHr5J.');

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '8436theNew',
        database: 'express',
        insecureAuth: true
    });

    connection.connect(function (ce, args) {
        if (ce) {
            res.sendStatus(403);
        } else {
            var query = connection.query('SELECT * FROM users WHERE username = ? AND password = ?',
                [username, password_safe],
                function (err, results, fields) {
                    if (err || results.length !== 0) {
                        res.sendStatus(403);
                    } else {
                        var q = connection.query('INSERT INTO users (username, password) VALUES (?, ?);',
                            [username, password_safe],
                            function (e, r, f) {
                                if (e) {
                                    res.sendStatus(403);
                                } else {
                                    res.sendStatus(200);
                                }
                            });
                    }
                    connection.commit();
                    connection.end();
                });
        }
    });
});

module.exports = router;
