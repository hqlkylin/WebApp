/**
 * Created by Administrator on 2015/6/8.
 */
var mongoose = require("./db");
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    username: String,
    password:String,
    realname:String,
    tel:String
});

var AdminModel = mongoose.model('admin', adminSchema, 'admin');

adminSchema.statics = {
    count: function (obj,callback) {
        return AdminModel.count(obj,callback);
    }
}
module.exports = adminSchema;