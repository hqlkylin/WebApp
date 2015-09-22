/**
 * Created by Administrator on 2015/6/3.
 */
function A() {
    this.name = "kylin";
    this.say = (function (age) {
        var age = age;
        return {
            age: age
        }
    })(20);
    this.obj = {
        oName: "ky",
        iAge: 12
    }
}
var a = new A();
console.log(a.say);

function B() {

}
var b = new B();

extend(b, a);
a.obj.name = "hanqilin";
console.log(b.obj);
console.log(a.obj);

function extend(target, source) {
    for (var prototype in source) {

        if (type(source[prototype]) == "Array") {
            target[prototype] = arguments.callee(target[prototype] || [], source[prototype]);
        } else if (type(source[prototype]) == "Object") {
            target[prototype] = arguments.callee(target[prototype] || {}, source[prototype]);
        } else {
            target[prototype] = source[prototype];
        }
    }
    return target;
}
function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}