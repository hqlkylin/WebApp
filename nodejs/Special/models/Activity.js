/**
 * Created by Administrator on 2015/4/30.
 */
var mongoose = require("./db");
var Schema = mongoose.Schema;
var users=require("./Users");
var activitySchema = new Schema({
    name: String,
    startDate: Date,
    endDate: Date,
    state: {type: Boolean, default: true},
    addTime: {type: Date, default: Date.now},
    market: String,
    keywords: String,
    description: String,
    script: String,
    messageTemplate: String,
    clickCount: {type: Number, default: 0},
    limitForm: {type: Number, default: 0}
});

var entity = mongoose.model('activity', activitySchema, 'activity');

function Activity(entity) {
    this.name = entity.name;
    this.startDate = entity.startDate;
    this.endDate = entity.endDate;
    this.state = entity.state;
    this.addTime = entity.addTime;
    this.market = entity.market;

    this.messageTemplate = entity.messageTemplate;
    this.clickCount = entity.clickCount;
    this.limitForm = entity.limitForm;
}
Activity.prototype.save = function (callback) {
    var model = {
        name: this.name,
        startDate: this.startDate,
        endDate: this.endDate,
        state: this.state,
        addTime: this.addTime,
        market: this.market,

        messageTemplate: this.messageTemplate,
        clickCount: this.clickCount,
        limitForm: this.limitForm
    };
    entity.create(model, function (err, node, numAffected) {
        if (err) {
            callback(err);
        }
        else {
            callback(null);
        }
    })
};
Activity.findPagination = function (obj, callback) {
    var q = obj.search || {};
    var col = obj.columns;
    var skipFrom = obj.page.offset;
    var resultsPerPage = obj.page.limit;

    var query = entity.find(q, col).sort('-addTime').skip(skipFrom).limit(resultsPerPage);
    query.exec(function (error, results) {
        if (error) {
            callback(error, null, null);
        } else {
            entity.count(q, function (error, count) {
                if (error) {
                    callback(error, null, null);
                } else {
                    callback(null, count, results);
                }
            });
        }
    })
};
Activity.findById = function (_id, callback) {
    // doc 是单个文档
     entity.findById(_id, function (err, doc) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, doc);
        }
    })
};
//修改;
Activity.update = function (model, callback) {
    //var _id = model._id; //需要取出主键_id
    //delete model._id;    //再将其删除

    entity.update({_id: model._id}, model, function (err, numberAffected) {
        callback(err, numberAffected);
    })
};
Activity.remove = function (_id, callback) {

    users.statics.count({activity:_id},function(err,count){
        if(count<=0){
            entity.remove({_id: _id}, function (err) {
                callback(err);
            })
        }else{
            callback(new Error("请先删除活动下的报名信息。"));
        }
    });


};
module.exports = Activity;