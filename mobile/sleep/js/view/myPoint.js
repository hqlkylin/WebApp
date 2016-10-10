/**
 * Created by hanqilin on 16/7/22.
 */

var vm = new Vue({
    el: ".page",
    data: {
        list: [],
        curPage: 1,
        pageSize: 5,
        rowsCount: 6,
        loading: false
    },
    created: function () {

        this.getData();

    },
    methods: {
        next: function () {
            if (this.loading) {
                return;
            }
            this.loading = true;
            this.curPage += 1;
            this.getData();
        },
        toDateString: function (datetime) {
            var timestamp3 = datetime.time;
            var newDate = new Date();
            newDate.setTime(timestamp3);
            var year = newDate.getFullYear();
            var month = newDate.getMonth() + 1;//js从0开始取
            var date = newDate.getDate();
            var hour = datetime.hours;
            var minutes = datetime.minutes;
            var second = datetime.seconds;

            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (second < 10) {
                second = "0" + second;
            }

            //var time = year+"-"+month+"-"+date;

            var time = year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second;
            return time;

        },
        getData: function () {

            var _this = this;

            $.ajax({
                type: 'post',
                // url: $.baseUrl + '/members/query/account/detailRxm.do',
                url: '',
                data: {
                    curPage: _this.curPage,
                    pageSize: _this.pageSize
                },
                //dataType: "json",
                success: function (data) {
                    var data = {
                        "account_id": "",
                        "curPage": 1,
                        "id": "",
                        "member_id": "3c2261cf500140438d1ff36c5ea9a5b9",
                        "mode": 0,
                        "newVal": 0.0,
                        "obj_id": "",
                        "oldVal": 0.0,
                        "pageCount": 1,
                        "pageSize": 5,
                        "reason": "",
                        "reasonDisplay": "",
                        "record_time": {},
                        "remark": "",
                        "resultList": [{
                            "account_id": "8b0cab6178844c2e907db4c9535a3dd4",
                            "curPage": 1,
                            "id": "8a6eac87d6ec4956ae125f76e0ace9fc",
                            "member_id": "3c2261cf500140438d1ff36c5ea9a5b9",
                            "mode": 0,
                            "newVal": 0.0,
                            "obj_id": "",
                            "oldVal": 0.0,
                            "pageCount": 0,
                            "pageSize": 15,
                            "reason": "姓名：麒麟",
                            "reasonDisplay": "姓名：麒麟",
                            "record_time": {
                                "date": 11,
                                "day": 4,
                                "hours": 20,
                                "minutes": 58,
                                "month": 7,
                                "seconds": 32,
                                "time": 1470920312000,
                                "timezoneOffset": -480,
                                "year": 116
                            },
                            "remark": "签到领用",
                            "resultList": [],
                            "rowsCount": 0,
                            "startNo": 1,
                            "type": "1",
                            "typeText": "签到领用",
                            "updateBy": "",
                            "val": 1.0
                        }, {
                            "account_id": "8b0cab6178844c2e907db4c9535a3dd4",
                            "curPage": 1,
                            "id": "2b2f030d58a84e6d90a59daf23a69ac4",
                            "member_id": "3c2261cf500140438d1ff36c5ea9a5b9",
                            "mode": 0,
                            "newVal": 0.0,
                            "obj_id": "",
                            "oldVal": 0.0,
                            "pageCount": 0,
                            "pageSize": 15,
                            "reason": "姓名：麒麟",
                            "reasonDisplay": "姓名：麒麟",
                            "record_time": {
                                "date": 8,
                                "day": 1,
                                "hours": 18,
                                "minutes": 13,
                                "month": 7,
                                "seconds": 31,
                                "time": 1470651211000,
                                "timezoneOffset": -480,
                                "year": 116
                            },
                            "remark": "签到领用",
                            "resultList": [],
                            "rowsCount": 0,
                            "startNo": 1,
                            "type": "1",
                            "typeText": "签到领用",
                            "updateBy": "",
                            "val": 1.0
                        }, {
                            "account_id": "8b0cab6178844c2e907db4c9535a3dd4",
                            "curPage": 1,
                            "id": "f4446dfb922f4a6089f24d6992a5fd7f",
                            "member_id": "3c2261cf500140438d1ff36c5ea9a5b9",
                            "mode": 0,
                            "newVal": 0.0,
                            "obj_id": "",
                            "oldVal": 0.0,
                            "pageCount": 0,
                            "pageSize": 15,
                            "reason": "姓名：麒麟",
                            "reasonDisplay": "姓名：麒麟",
                            "record_time": {
                                "date": 8,
                                "day": 1,
                                "hours": 18,
                                "minutes": 12,
                                "month": 7,
                                "seconds": 40,
                                "time": 1470651160000,
                                "timezoneOffset": -480,
                                "year": 116
                            },
                            "remark": "注册奖励",
                            "resultList": [],
                            "rowsCount": 0,
                            "startNo": 1,
                            "type": "12",
                            "typeText": "注册奖励",
                            "updateBy": "",
                            "val": 10.0
                        }],
                        "rowsCount": 3,
                        "startNo": 1,
                        "type": "",
                        "typeText": "",
                        "updateBy": "",
                        "val": 0.0
                    }; /*测试数据*/
                    _this.rowsCount = data.rowsCount;
                    $.each(data.resultList, function () {
                        _this.list.push(this);
                    })
                    _this.loading = false;
                },
                error: function () {
                    console.log("错误");
                }
            })

        }
    }
})

