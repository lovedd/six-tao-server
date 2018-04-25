var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* post users info. */
router.post('/login', function (req, res, next) {
    console.log(req.body);
    let param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    };
    if (req.session.user) {
        res.json({
            code: '101',
            msg: '您已登录'
        });
        return;
    }
    User.findOne(param, function (err, doc) {
        if (err) {
            res.json({
                code: '900',
                msg: err.message || '服务器错误'
            })
        } else {
            if (doc) {
                req.session.user = doc
                res.json({
                    code: '000',
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                });
            } else {
                res.json({
                    code: '102',
                    msg: '用户名或密码错误'
                });
            }
        }
    });
});

router.get('/checkLogin', function (req, res, next) {
    console.log(req.session.user)
    if (req.session.user) {
        res.json({
            code: '000',
            msg: '',
            result: req.session.user
        });
    } else {
        res.json({
            code: '102',
            msg: '未登录'
        });
    }
});

router.post('/logout', function (req, res, next) {
    req.session.destroy();
    res.json({
        code: '000',
        msg: '登出成功'
    });
});

module.exports = router;
