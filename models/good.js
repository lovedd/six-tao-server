var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productScheme = new Schema({
    "productId": String,     // 商品Id
    "productName": String,  // 商品名
    "salePrice": Number,  // 售价
    "checked": String,  // 是否被选中（在购物车中）
    "productNum": Number,  // 选购数量
    "productImage": String  // 商品图片名称
});

// 一定要将model()方法的第一个参数和其返回值设置为相同的值，否则会出现不可预知的结果
module.exports = mongoose.model('Good', productScheme);