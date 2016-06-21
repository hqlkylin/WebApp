/**
 * Created by Administrator on 2015/6/9.
 */
var mongoose = require("./db");
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    category: {type: mongoose.Schema.ObjectId, ref: 'category'},
    title: String,
    mark: {type: []},
    state: {type: Boolean, default: true},
    addTime: {type: Date, default: Date.now},
    sysTime: {type: Date, default: Date.now},
    author: String,
    keywords: String,
    description: String,
    seoTitle: String,
    fristImgUrl: String,
    listImgUrl: {type: []},
    from: String,
    body: String,
    sort: {type: Number, default: 0},
    information: String,
    clickCount: {type: Number, default: 0}

});

var Model = mongoose.model('news', newsSchema, 'news');

newsSchema.statics = {
    findById: function (_id, callback) {
        return Model
            .findOne({_id: _id})
            .exec(callback)
    },
    count: function (obj, callback) {
        return Model.count(obj, callback);
    },
    add: function (obj, callback) {
        Model.count({'title': obj.title}, function (err, count) {
            if (count) {
                callback(new Error("标题已存在！"), null)
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
        return Model.remove({_id: _id}, callback);
    },
    findAll: function (obj, callback) {
        return Model.find(obj.search, obj.columns).sort('sort').exec(callback);
    },
    findTop: function (search, count, sort, callback) {
        return Model.find(search).sort(sort).limit(count).exec(callback);
    }
};
newsSchema.findPagination = function (obj, callback) {
    var q = obj.search || {};
    var col = obj.columns;
    var skipFrom = obj.page.offset;
    var resultsPerPage = obj.page.limit;
    var query = Model.find(q, col).sort('-sysTime').skip(skipFrom).limit(resultsPerPage).populate('category');
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
    });
};
module.exports = newsSchema;