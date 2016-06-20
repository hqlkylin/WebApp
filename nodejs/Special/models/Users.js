/**
 * Created by Administrator on 2015/5/7.
 */
var mongoose = require("./db");
var Schema = mongoose.Schema;
var usersSchema = new Schema({
    name: String,
    state: {type: Boolean, default: false},
    addTime: {type: Date, default: Date.now},
    tel: String,
    address: String,
    money: Number,
    ip: String,
    activity: {type: mongoose.Schema.ObjectId, ref: 'activity'}
});
var entity = mongoose.model('users', usersSchema);

usersSchema.statics = {
    findUserId: function (UserId, callback) {
        return entity
            .findOne({_id: UserId}).populate('activity')
            .exec(callback)
    },
    save: function (model, callback) {
        return entity.create(model, function(err,doc){
                if(err){
                    callback(err);
                }else{
                    return entity .findOne({_id: doc._id}).populate('activity').exec(callback);
                }
        });

    },
    update: function (model, callback) {
        entity.update({_id: model._id}, model, function (err, numberAffected) {
            callback(err, numberAffected);
        })
    },
    remove: function (arr, callback) {
        return entity.remove({_id: {$in: arr}}, callback);
    },
    findAll: function (obj,callback) {
        return entity.find({activity:obj.activity},obj.columns,callback);
    },
    count: function (obj,callback) {
        return entity.count(obj,callback);
    }

}
usersSchema.findPagination = function (obj, callback) {
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

usersSchema.create=function(arr,callback){
    return entity.create(arr, callback);
}

module.exports = usersSchema;