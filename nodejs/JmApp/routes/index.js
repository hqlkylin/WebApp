var express = require('express');
var router = express.Router();
var async = require("async");
var news = require("../models/news");


/* GET home page. */
router.get('/', function (req, res, next) {
    async.auto({
        /*轮播图*/
        slider: function (callback) {
            news.statics.findTop({"state": true, "mark": "isSlider"}, 8, "sort", function (err, docs) {
                callback(err, docs);
            });
        },
        /*集团新闻*/
        list1: function (callback) {
            news.statics.findTop({
                "state": true,
                "category": "5576b42e82ec08615780d648",
                "mark": "isTop"
            }, 3, "sort", function (err, docs) {
                callback(err, docs);
            });
        },
        /*家居产品*/
        list2: function (callback) {
            news.statics.findTop({
                "state": true,
                "category": "558d01f1c67e9ccc110814e9",
                "mark": "isTop"
            }, 4, "sort", function (err, docs) {
                callback(err, docs);
            });
        },
        /*促销信息*/
        list3: function (callback) {
            news.statics.findTop({
                "state": true,
                "category": "558d076b05e104142f32f8ee",
                "mark": "isTop"
            }, 5, "sort", function (err, docs) {
                callback(err, docs);
            });
        }
        /*  ,result3: ['result1', 'result2', function (callback, replyData) {
         setTimeout(function () {
         callback(null, replyData.result1 + replyData.result2);
         }, 1000)
         }
         ]*/
    }, function (err, data) {
        res.render("index", data);
    });
});

module.exports = router;
