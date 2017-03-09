/**
 * Created by ZMN on 2017/3/7.
 */
var express = require('express');
var app = express();


// 调用支付接口获取charge对象
app.get('/pingpay', function (req, res) {

	//设置跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");

	var pingpp = require('pingpp')('sk_test_4u5uvDuzfXnL1OWPW1yjHCe1');
	pingpp.setPrivateKeyPath(__dirname + "/my_rsa_private_key.pem");
	pingpp.charges.create({
        subject: "商品支付",
        body: "Your Body",
        amount: 500,//订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
        order_no: "NO123456789",
        channel: "upacp_pc",
        currency: "cny",
        client_ip: "127.0.0.1",
        app: {id: "app_O0uzrP4yr9e59ibP"},
    extra: {result_url: "http://192.168.1.12:3000/pingpayResult"}
    }, function(err, charge) {
    	res.json(charge);
    });  


});

// 支付请求回调地址
app.post('/pingpayResult', function (req, res) {
	console.log(req);
    res.send(JSON.stringify(req));
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
