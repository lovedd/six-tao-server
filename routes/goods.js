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
    // 只有接口请求带参数sort=priceDown才会按价格降序
    let sort = req.query['sort'] === 'priceDown'?-1:1;
    let startPrice = req.query['startPrice'];
    let endPrice = req.query['endPrice'];
    let page = parseInt(req.query['page']);
    let pageSize = parseInt(req.query['pageSize']);

    // 价格筛选处理逻辑
    startPrice = startPrice? parseInt(startPrice):0;
    endPrice = endPrice?parseInt(endPrice):undefined;
    console.log(startPrice, endPrice);
    let params = {};
    if (endPrice) {
        params = {salePrice: {$gt: startPrice, $lte: endPrice}};
    } else {
        params = {salePrice: {$gt: startPrice}};
    }

    // 分页处理逻辑
    if (!(page > 0 && pageSize > 0)) {
        res.json({
            code: '801',
            msg: '请求参数有误'
        });
        return;
    }
    let skip = (page - 1)*pageSize;

    // 查询起始价（不包含）到结尾价（包含）区间的商品,并分页返回
    let query = Good.find(params).skip(skip).limit(pageSize);
    query.sort({salePrice: sort});
    query.exec((err, doc) => {
        if (err) {
            res.json({
                code: '900',
                msg: err.message || '服务器错误'
            })
        } else {
            res.json({
                code: '000',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    });
});

module.exports = router;