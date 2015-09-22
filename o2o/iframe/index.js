/**
 * Created by 韩麒麟 on 2015/9/2.
 */
var Message = function () {
    var self = this;
    this.body = $("body");
    this.renderDOM();
    this.mask = $(".mask");
    this.pop = $(".pop");
    this.closeBtn = $(".pop a");
    this.closeBtn.click($.proxy(this.close, this));
};
Message.prototype = {
    close: function () {
        this.pop.hide();
        this.mask.fadeOut(300);
        $("#frame_content").contents().find("h2").html("已经触发click事件");
    },
    show: function () {
        var self = this;
        this.mask.fadeIn(300, function () {
            self.pop.fadeIn(100);
        });
    },
    renderDOM: function () {
        var strDOM =
            '<div class="mask"></div>' +
            '<div class="pop">' +
            '<a class="close" href="###">关闭</a>' +
            '</div>';
        this.body.append(strDOM);
    }
}