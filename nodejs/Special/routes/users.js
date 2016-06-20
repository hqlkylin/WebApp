var express = require('express');
var router = express.Router();
var users = require('../models/Users');
var Activity = require('../models/Activity');
var request = require('request');//http 请求

/* GET users listing. */
router.post('/add', function (req, res, next) {

    if (!req.session.codetel) {
        res.json({msg: '获取数据失败请从新获取验证码！', success: false});
        return;
    }
    var codetel = JSON.parse(req.session.codetel);
    /*验证码*/
    if (codetel.code != req.body.code) {
        res.json({msg: '验证码错误', success: false});
        return;
    }
    if (codetel.tel != req.body.tel) {
        res.json({msg: '接收验证码短信电话与报名电话不符。', success: false});
        return;
    }
    /*手机号验证*/
    var tel = RegExp(/^((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8}$/).test(req.body.tel);
    if (!tel) {
        res.json({msg: "手机号码不正确！", success: false});
        return;
    }
    req.body.ip = req._remoteAddress;//存放ip

    Activity.findById(req.body.activity, function (err, doc) {
        if (err) {
            res.json({msg: "对不起，您提交的参数错误。", success: false})
            return;
        } else {

            if (!doc) {
                // 未查询到活动
                res.json({msg: "对不起，未查询到活动。", success: false})
                return;
            } else {
                // 活动已关闭
                if (!doc.state) {
                    res.json({msg: "对不起，活动已关闭。", success: false});
                    return;
                }
                // 活动还未开始
                if (doc.startDate > new Date()) {
                    res.json({msg: "对不起，活动还未开始。", success: false});
                    return;
                }
                // 活动已经结束
                if (doc.endDate < new Date()) {
                    res.json({msg: "对不起，活动已经结束。", success: false});
                    return;
                }
                /*活动报名人数已满*/
                users.statics.count({activity: req.body.activity}, function (err, count) {
                    if (count >= doc.limitForm) {
                        res.json({msg: "对不起，活动报名人数已满。", success: false});
                        return;
                    } else {
                        /*手机号码重复*/
                        users.statics.count({activity: req.body.activity, tel: req.body.tel}, function (err, count) {
                            if (count > 0) {
                                res.json({msg: "对不起，手机号码已报名！", success: false});
                                return;
                            } else {

                                users.statics.save(req.body, function (err, doc) {
                                    if (err) {
                                        res.json({msg: '添加失败', success: false})
                                    } else {
                                        delete req.session.codetel;
                                        var yzm = (new Date().getTime() + "").slice(-6);
                                        var msg = doc.activity.messageTemplate.replace("$yzm", yzm).replace("$money", doc.money).replace(/\$market/g, doc.activity.market);

                                        //var url = "http://msg.jimei.com.cn/sendMessageAll.html?username=jimeijiaju&password=JmjjQaz246&mobile=" + req.body.tel + "&content=" + encodeURI(msg);

                                        //  request('http://msg.jimei.com.cn/sendMessageAll.html?username=jimeijiaju&password=JmjjQaz246&mobile=' + req.body.tel + '&content=' + msg,
                                        //  request(url,
                                        //    function (error, response, body) {
                                        //        if (!error && response.statusCode == 200) {
                                        //            console.log(body) // Show the HTML for the Google homepage.
                                        //            /*暂时什么都没有做*/
                                        //        }
                                        //    }
                                        //);
                                        res.json({msg: '添加成功', success: true});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });


});
router.get('/', function (req, res, next) {
    res.render('users_index', {});
});
router.get('/data', function (req, res, next) {
    var page = {limit: req.query.limit || 5, offset: req.query.offset || 0};
    var queryObj = new Object();

    if (req.query.name) {
        queryObj.name = new RegExp(req.query.name);
    }
    if (req.query.address) {
        queryObj.address = new RegExp(req.query.address);
    }
    if (req.query.tel) {
        queryObj.tel = new RegExp(req.query.tel);
    }


    var model = {
        search: queryObj,
        columns: 'name state addTime tel ip address',
        page: page
    };
    users.findPagination(model, function (err, total, docs) {
        res.json({total: total, rows: docs});
    })
});
router.get("/edit", function (req, res, next) {
    users.statics.findUserId(req.query._id, function (err, doc) {
        res.json(doc);
    })
});
router.post('/edit', function (req, res, next) {
    delete req.body.activity;

    users.statics.update(req.body, function (err, numberAffected) {

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
router.post('/del', function (req, res, next) {
    var arr = [];
    typeof(req.body["_id[]"]) == 'string' ? arr.push(req.body["_id[]"]) : arr = req.body["_id[]"];
    console.log(arr)
    users.statics.remove(arr, function (err) {
        if (err)
            res.json({msg: '删除失败', success: false});
        else {
            res.json({msg: "删除成功！", success: true})
        }
    })
});
router.post('/getCode', function (req, res, next) {
    /*手机号验证*/
    var tel = RegExp(/^((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8}$/).test(req.body.tel);
    if (!tel) {
        res.json({msg: "手机号码不正确！", success: false});
        return;
    }
    Activity.findById(req.body.activity, function (err, doc) {
        if (err) {
            res.json({msg: "对不起，您提交的参数错误。", success: false})
            return;
        } else {
            if (!doc) {
                // 未查询到活动
                res.json({msg: "对不起，未查询到活动。", success: false})
                return;
            } else {
                // 活动已关闭
                if (!doc.state) {
                    res.json({msg: "对不起，活动已关闭。", success: false});
                    return;
                }
                // 活动还未开始
                if (doc.startDate > new Date()) {
                    res.json({msg: "对不起，活动还未开始。", success: false});
                    return;
                }
                // 活动已经结束
                if (doc.endDate < new Date()) {
                    res.json({msg: "对不起，活动已经结束。", success: false});
                    return;
                }
                /*活动报名人数已满*/
                users.statics.count({activity: req.body.activity}, function (err, count) {
                    if (count >= doc.limitForm) {
                        res.json({msg: "对不起，活动报名人数已满。", success: false});
                        return;
                    } else {
                        /*手机号码重复*/
                        users.statics.count({activity: req.body.activity, tel: req.body.tel}, function (err, count) {
                            if (count > 0) {
                                res.json({msg: "对不起，手机号码已报名！", success: false});
                                return;
                            } else {
                                var code = (new Date().getTime() + "").slice(-6);
                                req.session.codetel = JSON.stringify({code: code, tel: req.body.tel});

                                /*   request('http://msg.jimei.com.cn/sendMessageAll.html?username=jimeijiaju&password=JmjjQaz246&mobile=' + req.body.tel + '&content=您的验证码是' + code,
                                 function (error, response, body) {
                                 if (!error && response.statusCode == 200) {
                                 console.log(body) // Show the HTML for the Google homepage.
                                 /!*暂时什么都没有做*!/
                                 }
                                 }
                                 );*/

                                //console.log('http://fast-msg.com/api/send?username=jimeiyanzhengma&password=d2r084k&mobile=' + req.body.tel + '&content=您的验证码是' + code+'[集美家居]')
                                //request('http://fast-msg.com/api/send?username=jimeiyanzhengma&password=d2r084k&mobile=' + req.body.tel + '&content=您的验证码是' + code+'[集美家居]',
                                //request('http://fast-msg.com/api/send?username=jimeiyanzhengma&password=d2r084k&mobile=18040477715&content=%E6%82%A8%E7%9A%84%E9%AA%8C%E8%AF%81%E7%A0%81%E6%98%AF23068[%E9%9B%86%E7%BE%8E%E5%AE%B6%E5%B1%85]',
                               /* var url = "http://msg.jimei.com.cn/sendMessageAll.html?username=jimeijiaju&password=JmjjQaz246&mobile=" + req.body.tel + "&content=" + encodeURI("您的验证码是" + code);

                                request(url,
                                    function (error, response, body) {
                                        if (!error && response.statusCode == 200) {
                                            console.log(body) // Show the HTML for the Google homepage.
                                            /!*暂时什么都没有做*!/
                                        }
                                    }
                                );*/
                                //成功
                                res.json({msg: "验证码获取成功:"+code, success: true});
                            }
                        });
                    }
                });
            }
        }
    });

});
router.get("/list", function (req, res, next) {
    req.query.columns='name addTime tel address';
    users.statics.findAll(req.query, function (err, docs) {
        for (var i in docs) {
            var tel = docs[i].tel.toString();
            docs[i].tel = tel.replace(tel.substring(3, 8), "****");
        }
        res.json(docs);
    });
});
router.get('/click', function (req, res, next) {

    Activity.findById(req.query.activity, function (err, doc) {
        if (err || !doc) {
            res.json({msg: "对不起，您提交的参数错误。", success: false})
            return;
        } else {

            Activity.update({clickCount: doc.clickCount + 1, _id: doc._id}, function (err, doc) {
                if (err) {
                    res.json({msg: "失败：" + err.message, success: false});
                } else {
                    res.json({msg: "添加点击率成功", success: true});
                }
            })

        }
    });

});
router.post('/check', function (req, res, next) {

    Activity.findById(req.body.activity, function (err, doc) {
        if (err) {
            res.json({msg: "对不起，您提交的参数错误。", success: false})
            return;
        } else {
            if (!doc) {
                // 未查询到活动
                res.json({msg: "对不起，未查询到活动。", success: false})
                return;
            } else {
                // 活动已关闭
                if (!doc.state) {
                    res.json({msg: "对不起，活动已关闭。", success: false});
                    return;
                }
                // 活动还未开始
                if (doc.startDate > new Date()) {
                    res.json({msg: "对不起，活动还未开始。", success: false});
                    return;
                }
                // 活动已经结束
                if (doc.endDate < new Date()) {
                    res.json({msg: "对不起，活动已经结束。", success: false});
                    return;
                }
                /*活动报名人数已满*/
                users.statics.count({activity: req.body.activity}, function (err, count) {
                    if (count >= doc.limitForm) {
                        res.json({msg: "对不起，活动报名人数已满。", success: false});
                        return;
                    } else {
                        res.json({msg: "活动运行中……", success: true});
                    }
                });
            }
        }
    });

});
module.exports = router;
