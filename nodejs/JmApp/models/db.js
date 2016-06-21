/**
 * Created by Administrator on 2015/6/8.
 */

var mongoose=require('mongoose');
//mongoose.connect('mongodb://kylin:123123@192.168.10.238:27017/website');
mongoose.connect('mongodb://kylin:123123@127.0.0.1:27017/website');
module.exports=mongoose;