/**
 * Created by Administrator on 2015/6/9.
 */
/**
 * Created by Administrator on 2015/6/8.
 */
var mongoose = require("./db");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: String,
    sort: Number,
    type: String
});

var Model = mongoose.model('category', categorySchema, 'category');

var news = require("./news");
categorySchema.statics = {
    findById: function (_id, callback) {
        return Model
            .findOne({_id: _id})
            .exec(callback)
    },
    count: function (obj, callback) {
        return Model.count(obj, callback);
    },
    add: function (obj, callback) {
        Model.count({'name': obj.name}, function (err, count) {
            if (count) {
                callback(new Error("名称已存在！"), null)
            } else {
                Model.create(obj, function (err, doc) {
                    callback(err, doc);
                });
            }
        });
    },
    save: function (model, callback) {
        return Model.create(model, function (err, doc) {
            if (err) {
                callback(err);
            } else {
                return Model.findOne({_id: doc._id}).exec(callback);
            }
        });

    },
    update: function (model, callback) {
        Model.update({_id: model._id}, model, function (err, numberAffected) {
            callback(err, numberAffected);
        })
    },
    del: function (_id, callback) {

        news.statics.count({category: _id}, function (err, count) {
            if (count <= 0) {
                Model.remove({_id: _id}, function (err) {
                    callback(err);
                })
            } else {
                callback(new Error("请先删除所属类别下的文章。"));
            }
        });
        //return Model.remove({_id: _id}, callback); // 没有检查当前类别下的文章。---error
    },
    findAll: function (obj,callback) {
        return Model.find(obj.search,obj.columns).sort('sort').exec(callback);
    }

};
categorySchema.findPagination = function (obj, callback) {
    var q = obj.search || {};
    var col = obj.columns;
    var skipFrom = obj.page.offset;
    var resultsPerPage = obj.page.limit;

    var query = Model.find(q, col).sort('sort').skip(skipFrom).limit(resultsPerPage);
    query.exec(function (error, results) {
        if (error) {
            callback(error, null, null);
        } else {
            Model.count(q, function (error, count) {
                if (error) {
                    callback(error, null, null);
                } else {
                    callback(null, count, results);
                }
            });
        }
    })
};
module.exports = categorySchema;