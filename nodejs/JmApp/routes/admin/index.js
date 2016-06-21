/**
 * Created by Administrator on 2015/6/5.
 */
var express = require('express');
var router = express.Router();
var async = require('async');

var admin = require('../../models/admin');
var category = require('../../models/category');
var news = require('../../models/news');
//管理员登录
router.get('/login', function (req, res, next) {
    res.render("admin/login")
});
router.post('/login', function (req, res, next) {
    admin.statics.count(req.body, function (err, count) {
        console.log(req.body);
        console.log(count);


        if (count <= 0) {
            res.json({msg: "账号密码错误!", success: false});
            return;
        } else {
            res.json({msg: "登录成功!", success: true});
        }
    });
});

//主页面
router.get('/index', function (req, res, next) {
    res.render("admin/index");
});
router.get('/', function (req, res, next) {
    res.redirect("admin/index");
});

router.get('/category-index', function (req, res, next) {
    res.render("admin/category-index");
});
router.get('/category-data', function (req, res, next) {
    var page = {limit: req.query.limit || 5, offset: req.query.offset || 0};
    var queryObj = new Object();
    queryObj.type = '新闻';
    var model = {
        search: queryObj,
        columns: 'name sort type',
        page: page
    };
    category.findPagination(model, function (err, total, docs) {
        res.json({total: total, rows: docs});
    })
});

router.post('/category-add', function (req, res, next) {
    req.body.type = '新闻';
    delete req.body._id;
    console.log(req.body);

    category.statics.add(req.body, function (err, doc) {
        if (err) {
            res.json({msg: err.message, success: false})
        } else {
            res.json({msg: '添加成功', success: true});
        }
    });
});

router.get('/category-edit', function (req, res, next) {
    category.statics.findById(req.query._id, function (err, doc) {
        res.json(doc);
    })
});

router.post('/category-edit', function (req, res, next) {
    category.statics.update(req.body, function (err, numberAffected) {
        if (err)
            res.json({msg: '修改失败', success: false});
        else {
            if (numberAffected.nModified) {
                res.json({msg: "修改成功！", success: true})
            } else
                res.json({msg: "您什么也没有改动！", success: true})
        }
    })
});

router.post('/category-del', function (req, res, next) {
    category.statics.del(req.body._id, function (err) {
        if (err)
            res.json({msg: '删除失败' + err.message, success: false});
        else {
            res.json({msg: "删除成功！", success: true})
        }
    })
});

router.get('/news-index', function (req, res, next) {

    /*    async.parallel([
     function (cb) {
     console.log(1);
     },
     function (cb) {
     console.log(2);
     },
     function (cb) {
     console.log(3);
     }
     ], function (err, results) {
     console.log(4);
     });*/
    async.auto({
        category: function (callback) {
            var obj = {};
            obj.search = {type: '新闻'};
            obj.columns = "name sort";
            category.statics.findAll(obj, function (err, docs) {
                callback(err, docs);
            });
        },
        mark: function (callback) {
            callback(null, [
                {name: "置顶", value: "isTop"},
                {name: "推荐", value: "isRecommend"},
                {name: "热门", value: "isHot"},
                {name: "轮播图", value: "isSlider"}
            ]);
        }
        /*  ,result3: ['result1', 'result2', function (callback, replyData) {
         setTimeout(function () {
         callback(null, replyData.result1 + replyData.result2);
         }, 1000)
         }
         ]*/
    }, function (err, data) {
        res.render("admin/news-index", data);
    });


});
router.get('/news-data', function (req, res, next) {

    var page = {limit: req.query.limit || 5, offset: req.query.offset || 0};
    var queryObj = new Object();
    if (req.query.title) {
        queryObj.title = new RegExp(req.query.title);
    }
    if (req.query.category && req.query.category != '0') {
        queryObj.category = req.query.category;
    }
    if (req.query.mark && req.query.mark != '0') {
        queryObj.mark = req.query.mark;
    }
    var model = {
        search: queryObj,
        columns: 'title sort addTime mark category',
        page: page
    };
    news.findPagination(model, function (err, total, docs) {
        res.json({total: total, rows: docs});
    });
});
/*router.get('/news-form', function (req, res, next) {
 var obj = {};
 obj.search = {type: '新闻'};
 obj.columns = "name sort";
 category.statics.findAll(obj, function (err, docs) {
 res.render("admin/partial/news-form", {category: docs});
 });
 });*/
router.get('/ueditor', function (req, res, next) {
    res.render("admin/ueditor");
});
router.get('/news-form', function (req, res, next) {
    async.auto({
        category: function (callback) {
            var obj = {};
            obj.search = {type: '新闻'};
            obj.columns = "name sort";
            category.statics.findAll(obj, function (err, docs) {
                callback(err, docs);
            });
        },
        news: function (callback) {
         /*   news.statics.findById(req.query._id, function (err, doc) {
                if (doc) {/!*修改*!/
                    callback(err, JSON.stringify(doc));
                } else {/!*添加*!/
                    callback(err, JSON.stringify({
                        "state": true,
                        "addTime": new Date(),
                        "mark": [],
                        sort: 0,
                        clickCount: 0
                    }));
                }
            });*/
            news.statics.findById(req.query._id, function (err, doc) {
                if (doc) {/*修改*/
                    callback(err, doc);
                } else {/*添加*/
                    callback(err, {
                        "state": true,
                        "addTime": new Date(),
                        "mark": [],
                        sort: 0,
                        clickCount: 0,
                        listImgUrl:[]
                    });
                }
            });
        }
    }, function (err, data) {
        // console.log(data);
        res.render("admin/news-form", data);
    });
});

router.post('/news-edit', function (req, res, next) {

    if (!req.body.description && req.body.body) {
        var str = req.body.body.replace(/<[^>]+>/gi, "");
        req.body.description = str.length > 255 ? str.substring(0, 255) : str;
    }
    if (!req.body.seoTitle) {
        req.body.seoTitle = req.body.title;
    }
    console.log(req.body);
    /*修改出现数组变成字符串当length<1*/
    /*转数组*/
    typeof req.body.mark=='string' && (req.body.mark=req.body.mark.split(','));
    typeof req.body.listImgUrl=='string' && (req.body.listImgUrl=req.body.listImgUrl.split(','));

    news.statics.update(req.body, function (err, numberAffected) {
        if (err)
            res.json({msg: '修改失败', success: false});
        else {
            if (numberAffected.nModified) {
                res.json({msg: "修改成功！", success: true})
            } else
                res.json({msg: "您什么也没有改动！", success: true})
        }
    })
});

router.post('/news-upload', function (req, res, next) {


    if (req.files.uploadImg != undefined) {
        if (["png", "jpg", "jpeg", "gif", "bmp"].indexOf(req.files.uploadImg.extension) < 0) {
            res.json({msg: '必须是.png, .jpg, .jpeg, .gif, .bmp文件', success: false});
            return;
        }
        res.json({msg: req.files.uploadImg.name, success: true});

    } else {
        res.json({msg: '未找到文件！', success: false});
    }

});

router.post('/news-add', function (req, res, next) {
    delete req.body._id;
    if (!req.body.description && req.body.body) {
        var str = req.body.body.replace(/<[^>]+>/gi, "");
        req.body.description = str.length > 255 ? str.substring(0, 255) : str;
    }
    if (!req.body.seoTitle) {
        req.body.seoTitle = req.body.title;
    }
    console.log(req.body);
    news.statics.add(req.body, function (err, doc) {
        if (err) {
            res.json({msg: err.message, success: false})
        } else {
            res.json({msg: '添加成功', success: true});
        }
    });
});

router.post('/news-del', function (req, res, next) {
    news.statics.del(req.body._id, function (err) {
        if (err)
            res.json({msg: '删除失败' + err.message, success: false});
        else {
            res.json({msg: "删除成功！", success: true})
        }
    })
});

module.exports = router;
