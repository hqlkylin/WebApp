/**
 * Created by hanqilin on 16/6/1.
 */
//    //定义类
class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        console.log("初始化");
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

module.exports = Point;
