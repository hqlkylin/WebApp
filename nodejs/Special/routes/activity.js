var express = require('express');
var router = express.Router();
var nodeExcel = require('excel-export');

var Activity = require('../models/Activity');
var Users = require('../models/Users');
var time = require('../public/javascripts/kylin');
//var ccap = require('ccap')();//Instantiated ccap class

if (typeof require !== 'undefined') XLSX = require('xlsx'); //Excel 文件解析
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('activity_index', {});
});
router.get('/edit', function (req, res, next) {
    Activity.findById(req.query._id, function (err, doc) {
        res.json(doc);
    })
});
router.post('/edit', function (req, res, next) {
    var model = {
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        state: req.body.state,
        //addTime: new Date(),
        market: req.body.market,
        keywords: req.body.keywords,
        description: req.body.description,
        script: req.body.script,
        messageTemplate: req.body.messageTemplate,
        clickCount: req.body.clickCount,
        limitForm: req.body.limitForm,
        _id: req.body._id
    };
    Activity.update(model, function (err, numberAffected) {

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
router.post('/add', function (req, res, next) {

    var model = new Activity({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        state: req.body.state,
        addTime: new Date(),
        market: req.body.market,
        keywords: req.body.keywords,
        description: req.body.description,
        script: req.body.script,
        messageTemplate: req.body.messageTemplate,
        clickCount: req.body.clickCount,
        limitForm: req.body.limitForm
    });
    model.save(function (errMsg) {
        if (errMsg)
            res.json({msg: '添加失败', success: false});
        else {
            res.json({msg: '添加成功', success: true});
        }
    });
});
router.post('/del', function (req, res, next) {

    Activity.remove(req.body._id, function (err) {
        if (err)
            res.json({msg: '删除失败' + err.message, success: false});
        else {
            res.json({msg: "删除成功！", success: true})
        }
    })
});
router.get('/data', function (req, res, next) {
    var page = {limit: req.query.limit || 5, offset: req.query.offset || 0};
    var queryObj = new Object();

    if (req.query.name) {
        queryObj.name = new RegExp(req.query.name);
    }
    if (req.query.market) {
        queryObj.market = req.query.market;
    }

    var model = {
        search: queryObj,
        columns: 'name market clickCount startDate endDate',
        page: page
    };
    Activity.findPagination(model, function (err, total, docs) {
        res.json({total: total, rows: docs});
    })
});

//图片验证码 ---测试
/*router.get('/code', function (req, res, next) {
 var ary = ccap.get();
 var txt = ary[0];
 var buf = ary[1];
 res.end(buf);
 console.log(txt);
 });*/


router.post('/upload', function (req, res, next) {

    console.log(req.files.excel)
    if (req.files.excel != undefined) {

        if(req.files.excel.extension!="xlsx"){
            res.json({msg: '必须是xlsx的模板文件.', success: false});
            return;
        }
        var path = req.files.excel.path;
        var workbook = XLSX.readFile(path);
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];

/*
        在此处可以对表格进行规范审核
*/
        if(worksheet["A1"].v!="name"){
            res.json({msg: 'A1模板数据错误。应该是：name', success: false});
            return;
        }
        if(worksheet["B1"].v!="startDate"){
            res.json({msg: 'B1模板数据错误。应该是：startDate', success: false});
            return;
        }
        if(worksheet["C1"].v!="tel"){
            res.json({msg: 'C1模板数据错误。应该是：tel', success: false});
            return;
        }
        if(worksheet["D1"].v!="address"){
            res.json({msg: 'D1模板数据错误。应该是：address', success: false});
            return;
        }
        if(worksheet["E1"].v!="money"){
            res.json({msg: 'E1模板数据错误。应该是：money', success: false});
            return;
        }
        if(worksheet["F1"].v!="state"){
            res.json({msg: 'F1模板数据错误。应该是：state', success: false});
            return;
        }
        if(worksheet["G1"].v!="ip"){
            res.json({msg: 'G1模板数据错误。应该是：ip', success: false});
            return;
        }
     /*    for (z in worksheet) {
         // console.log(z)
         /!* all keys that do not begin with "!" correspond to cell addresses *!/
         if(z[0] === '!') continue;
         console.log(workbook.SheetNames[0]+ "!" + z + "=" + JSON.stringify(worksheet[z].v));
         }*/
        var json = XLSX.utils.sheet_to_json(worksheet);
        for(var i in json){
            json[i].activity=req.body._id;
        }
        Users.create(json,function(err,docs){
            if(err){
                res.json({msg: '批量失败', success: false});
            }else{
                //console.log(docs);
                res.json({msg: "共计导入："+docs.length+"条数据。", success: true});
            }

        })


    } else {
        res.json({msg: '未找到文件！', success: true});
    }

});


router.get('/excel', function (req, res, next) {
    var conf = {};
    // uncomment it for style example
    // conf.stylesXmlFile = "styles.xml";
    conf.cols = [
        {
            caption: '姓名',
            captionStyleIndex: 1,
            type: 'string'
            , width: 15
        },
        {
            caption: '报名日期',
            type: 'string',
            beforeCellWrite: function () {
                var originDate = new Date(Date.UTC(1899, 11, 30));
                return function (row, cellData, eOpt) {
                    if (cellData === null) {
                        eOpt.cellType = 'string';
                        return 'N/A';
                    } else
                    // return (cellData - originDate) / (24 * 60 * 60 * 1000);
                        return new Date(cellData).format("yyyy-MM-dd hh:mm:ss");
                }
            }()
            , width: 20.85
        },
        {
            caption: '电话',
            type: 'string',
            width: 30
        },
        {
            caption: '地址',
            type: 'string',
            width: 30
        }
        , {
            caption: '金额',
            type: 'number',
            width: 30
        }
        , {
            caption: '状态',
            type: 'bool'
        }
        , {
            caption: 'ip',
            type: 'string'
        }];

    var model = {
        activity: req.query._id,
        columns: 'name addTime tel address money state ip'
    };
    Users.statics.findAll(model, function (err, docs) {

        var rows = [];
        for (var i in docs) {
            var template = [];
            template.push(docs[i].name);
            template.push(docs[i].addTime);
            template.push(docs[i].tel);
            template.push(docs[i].address);
            template.push(docs[i].money);
            template.push(docs[i].state);
            template.push(docs[i].ip);
            rows.push(template);
        }
        conf.rows = rows;
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        res.end(result, 'binary');


    })

});

router.get('/api', function (req, res, next) {
    res.render('api', {});
});
module.exports = router;
