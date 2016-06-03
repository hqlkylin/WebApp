/**
 * Created by hanqilin on 16/6/1.
 */

require("../css/list.scss");
var j = require("./jquery");
module.exports = {
    init: function () {
        setTimeout(function () {
            j(".box").animate({width: 400, height: 400}, 1000);
        }, 1000);
    }

}
module.exports.init();