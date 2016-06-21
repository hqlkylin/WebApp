var express = require('express');
var router = express.Router();
var news = require('../models/news');
var async = require("async");
/* GET home page. */
router.get('/list', function (req, res, next) {
    res.render('list', {title: '集美'});
});
router.get('/list-1', function (req, res, next) {
    res.render('list-1', {title: '集美'});
});
router.get('/getData', function (req, res, next) {

    var page = {limit: req.query.count || 10, offset: req.query.start || 0};

    var queryObj = new Object();

    /*    if (req.query.category) {
     queryObj.category = req.query.category;
     }*/

    var model = {
        search: queryObj,
        columns: 'title sort addTime mark category information fristImgUrl',
        page: page
    };
    news.findPagination(model, function (err, total, docs) {
        res.json({
            total: total,
            events: docs.map(function (value, index) {
                return {
                    title: value.title,
                    sort: value.sort,
                    addTime: value.addTime.format("yyyy-MM-dd"),
                    mark: value.mark,
                    category: value.category,
                    information: value.information,
                    fristImgUrl: value.fristImgUrl,
                    _id: value._id
                }
            }),
            count: page.limit,
            start: page.offset
        });
    });
});
router.get('/item/:id', function (req, res, next) {

    async.auto({
        //新闻
        news: function (callback) {
            news.statics.findById(req.params.id, function (err, doc) {
                callback(err, doc);
            });
        }

    }, function (err, data) {
        res.render("item", data);
    });


});
module.exports = router;
