/**
 * Created by 韩麒麟 on 2015/8/24.
 */
var DateCalendar = function ($box) {
    this.box = $box;
    this.renderDOM();
    this.month = this.box.find(".month");
    this.month_en = this.box.find(".month_en");
    this.bodyNode = $(document.body);
    this.dayBox = this.box.find(".dayBox");
    this.daySize = 42;
    this.setting = {
        dateTime: "2015-01-01",
        url: ""
    };
    $.extend(this.setting, this.getSetting());
    this.dateTime = new Date(this.setting.dateTime);
    this.setSetValues();
    this.SetStartEnd();
    this.getData();

};
DateCalendar.prototype = {
    SetStartEnd: function () {
        this.setting.url += "?startTime=" + $(".dayBox li").first().html() + "&endTime=" + $(".dayBox li").last().html();
    },
    isLeapYear: function (year) {
        if (year % 4 == 0 && year % 100 != 0) {
            return true;
        }
        else {
            if (year % 400 == 0) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    renderDOM: function () {
        var strDOM =
            '<div class="user-title bgcolor2">' +
            '<!--<span class="FL">加载中</span>-->' +
            '<span class="FL"><span class="month"></span>月<i class="month_en"></i></span>' +
            '<a href="#" target="_blank" class="FR">活动专区</a>' +
            '</div>' +
            '<div class="box">' +
            '<h3>' +
            '<span>日</span>' +
            '<span>一</span>' +
            '<span>二</span>' +
            '<span>三</span>' +
            '<span>四</span>' +
            '<span>五</span>' +
            '<span>六</span>' +
            '</h3>' +
            '<ul class="dayBox"></ul>' +
            '<div class="clear"></div>' +
            '<div class="prompt">' +
            '<span class="overdue" title="已过期"></span>' +
            '<span class="star" title="正在进行"></span>' +
            '<span class="nostar" title="未开始"></span>' +
            '</div>' +
            '</div>';
        this.box.append(strDOM);
    },
    setSetValues: function () {
        var month = new Array(12);
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        this.month.html(this.dateTime.getMonth() + 1);
        this.month_en.html(month[this.dateTime.getMonth()]);
        var initDate = new Date(this.setting.dateTime);
        initDate.setDate(1); // 初始化为 制定月份的1号
        /*循环上一月*/
        var weekIndex = initDate.getDay();//注:0-6对应为星期日到星期六
        if (weekIndex == 0) {
            weekIndex = 7;
        }
        for (var i = 0; i < weekIndex; i++) {
            var lastMonth = new Date(initDate.getTime() - 24 * 60 * 60 * 1000 * (i + 1));
            var dataStr = lastMonth.getFullYear() + "-" + this.pad((lastMonth.getMonth() + 1), 2) + "-" + this.pad(lastMonth.getDate(), 2);
            var li = $("<li class='normal'>").html(lastMonth.getDate()).data("day", dataStr);
            this.dayBox.prepend(li);
        }
        /*循环当前月*/
        var index = 0,
            currentMonthDaySize = this.getCurrentMonthDaySize();
        for (var i = weekIndex; i < currentMonthDaySize + weekIndex; i++) {
            ++index;
            var dataStr = this.dateTime.getFullYear() + "-" + this.pad((this.dateTime.getMonth() + 1), 2) + "-" + this.pad(index, 2);
            var li = $("<li>").html(index).data("day", dataStr);
            this.dayBox.append(li);
        }
        /*循环下一个月*/
        var nextMonth = new Date(initDate.getFullYear(), initDate.getMonth() + 1, initDate.getDate());
        for (var i = 0; i < this.daySize - currentMonthDaySize - weekIndex; i++) {
            var dataStr = nextMonth.getFullYear() + "-" + this.pad((nextMonth.getMonth() + 1), 2) + "-" + this.pad(i + 1, 2);
            var li = $("<li class='normal'>").html(i + 1).data("day", dataStr);
            this.dayBox.append(li);
        }
    },
    getSetting: function () {
        var setting = this.box.attr("data-setting");
        if (setting && setting != "") {
            return $.parseJSON(this.box.attr("data-setting"));
        } else {
            return {};
        }
    },
    getCurrentMonthDaySize: function () {
        var month = this.dateTime.getMonth() + 1;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            return 31;
        }
        else if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        else if (month == 2 && this.isLeapYear(this.dateTime.getYear())) {
            return 29;
        }
        else {
            return 28;
        }
    },
    getData: function () {
        var self = this;
        /*  var json2 = {
         "26": {
         "active_list": [
         {"maillName": "大红门店", "link": "http://www.baidu.com", 'stateStr': "进行中"},
         {"maillName": "定慧桥店", "link": "http://www.google.com", 'stateStr': "已结束"}],
         "active_state": "1"
         },
         "27": {
         "active_list": [
         {"maillName": "大红门店", "link": "http://www.baidu.com", 'stateStr': "进行中"},
         {"maillName": "定慧桥店", "link": "http://www.google.com", 'stateStr': "已结束"}],
         "active_state": "即将开始"
         }
         };
         var json = [
         {
         "active_day": "2015-01-26",
         "active_list": [
         {"maillName": "大红门店", "link": "http://www.baidu.com", 'stateStr': "进行中"},
         {"maillName": "定慧桥店", "link": "http://www.google.com", 'stateStr': "已结束"}],
         "active_state": "进行中"
         },
         {
         "active_day": "2015-01-27",
         "active_list": [
         {"maillName": "大红门店", "link": "http://www.baidu.com", 'stateStr': "进行中"},
         {"maillName": "定慧桥店", "link": "http://www.google.com", 'stateStr': "已结束"}],
         "active_state": "已结束"
         },
         {
         "active_day": "2015-02-01",
         "active_list": [
         {"maillName": "大红门店", "link": "http://www.baidu.com", 'stateStr': "进行中"},
         {"maillName": "定慧桥店", "link": "http://www.google.com", 'stateStr': "进行中"}],
         "active_state": "进行中"
         }
         ];*/
        $.ajax({
            url: self.setting.url,
            type: 'get',
            dataType: "json",
            data: {t: self.setting.dateTime},
            success: function (json) {
                /* current：进行中   future：未开始    over：已过期*/
                for (var item in json) {
                    $("li", self.box).each(function () {
                        if ($(this).data("day") == json[item].active_day) {
                            if (json[item].active_state == "current") { //进行中
                                $(this).addClass("star");
                            } else if (json[item].active_state == "over") { //已过期
                                $(this).addClass("overdue");
                            } else if (json[item].active_state == "future") { //未开始
                                $(this).addClass("nostar");
                            }
                            var sb =
                                '<div class="info">' +
                                '<div class="top"></div>' +
                                '<div class="cont">';
                            for (var i in json[item].active_list) {
                                if (json[item].active_list[i].active_state == "current") {
                                    sb += '<dl>' +
                                    '<dt class="star"></dt>' +
                                    '<dd>' +
                                    '<a href="' + json[item].active_list[i].link + '" target="_blank" class="star">';
                                } else if (json[item].active_list[i].active_state == "over") {
                                    sb += '<dl>' +
                                    '<dt class="overdue"></dt>' +
                                    '<dd>' +
                                    '<a href="' + json[item].active_list[i].link + '" target="_blank" class="overdue">';
                                } else if (json[item].active_list[i].active_state == "future") {
                                    sb += '<dl>' +
                                    '<dt class="nostar"></dt>' +
                                    '<dd>' +
                                    '<a href="' + json[item].active_list[i].link + '" target="_blank" class="nostar">';
                                }
                                sb +=
                                    '<p>' + json[item].active_list[i].startEnd + ' ' + json[item].active_list[i].mallName + '</p>' +
                                    '<p>' + json[item].active_list[i].title + '</p>' +
                                    '</a>' +
                                    '</dd>' +
                                    '</dl>';
                            }
                            sb +=
                                '</div>' +
                                '</div>';
                            $(this).append(sb);
                            $(this).hover(function () {
                                $(this).find(".info").stop().fadeIn();
                            }, function () {
                                $(this).find(".info").stop().fadeOut();
                            });
                        }
                    });
                }

            }
        })

    },
    pad: function (num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }
}
;
DateCalendar.init = function ($box) {
    var _this_ = this;
    $box.each(function () {
        new _this_($(this));
    });
};