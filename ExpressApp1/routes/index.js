'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        login: '登录',
        username: '用户名',
        password: '密码',
        next: '下一步',
        signup: '注册',
        repeatPassword: '重复密码',
        welcome: '欢迎',
        logout: '退出',
        tipdate: '您在这天来到这里',
        patternLimit: '数字和字母组合'
    });
});

module.exports = router;
