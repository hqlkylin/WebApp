/**
 * Created by 韩麒麟 on 2015/10/7.
 * QQ:290147465
 */

var util = {
    /*保留小数点位数
     * 将数字转化为拥有x位小数位的形式
     * 使用四舍五入
     */
    foundTo: function (base, precision) {
        var m = Math.pow(10, precision);
        var a = Math.round(base * m) / m;
        return a;
    },
    /*创建受约束的随机数*/
    randomBetween: function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
}