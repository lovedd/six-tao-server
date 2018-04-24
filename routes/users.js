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
    User.findOne(param, function (err, doc) {
        if (err) {
            res.json({
                code: '900',
                msg: err.message || '服务器错误'
            })
        } else {
            if (doc) {
                res.json({
                    code: '000',
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                });
            }
        }
    });
});

module.exports = router;
