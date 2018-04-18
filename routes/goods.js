var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Good = require('../models/good');

mongoose.connect('mongodb://127.0.0.1:27017/six_tao');

mongoose.connection.on('connected', () => {
    console.log('mongodb connected success');
});

mongoose.connection.on('error', () => {
    console.log('mongodb connected error');
});

mongoose.connection.on('disconnected', () => {
    console.log('mongodb disconnected')
})

/* GET goods */
router.get('/', function (req, res, next) {
    Good.find({}, (err, doc) => {
        if (err) {
            res.json({
                code: '900',
                msg: err.message || '服务器错误'
            })
        } else {
            res.json({
                code: '000',
                msg: '',
                result: doc
            })
        }
    })
});

module.exports = router;