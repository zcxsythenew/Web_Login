'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { login: '登录', username: '用户名', password: '密码', next: '下一步', signup: '注册', repeatPassword: '重复密码' });
});

module.exports = router;
