/**
 * Created by hanqilin on 16/2/25.
 */







var jsonData = [
    {"_id": "a1", "order": 1, "type": "元宝", "name": "一等奖", "rate": 11},
    {"_id": "a2", "order": 2, "type": "抵用券", "name": "二等奖", "rate": 14},
    {"_id": "a3", "order": 3, "type": "元", "name": "三等奖", "rate": 15},
    {"_id": "a4", "order": 4, "type": "抵用券", "name": "四等奖", "rate": 16},
    {"_id": "a5", "order": 5, "type": "抵用券", "name": "五等奖", "rate": 17},
    {"_id": "a6", "order": 6, "type": "元宝", "name": "六等奖", "rate": 18},
    {"_id": "a7", "order": 7, "type": "抵用券", "name": "七等奖", "rate": 19},
    {"_id": "a8", "order": 8, "type": "元", "name": "八等奖", "rate": 10},
    {"_id": "a9", "order": 9, "type": "元", "name": "九等奖", "rate": 13},
    {"_id": "a10", "order": 10, "type": "元宝", "name": "十等奖", "rate": 12}
];


console.log(jsonData);


function Item(id, order, type, name, rate) {
    var obj = {};
    obj.id = id;
    obj.order = order;
    obj.type = type;
    obj.name = name;
    obj.rate = rate;
    return obj;
}

add(new Item("", 11, "元宝", "一等奖", 29));
add(Item("", 12, "元宝", "一等奖", 2999));

function add(obj) {
    jsonData.push(obj);
}

del(0);
function del(index) {
    jsonData.splice(index,1);
}
/*function del(obj) {
 var _id = typeof obj == "string" ? obj : obj._id;
 $.each(jsonData, function (i, v) {

 for (var n  in this) {
 if (this._id == _id) {
 jsonData.splice(i, 1);
 return false;
 }
 console.log(2);
 }
 console.log(3);
 })
 console.log(jsonData);
 }*/
