/**
 * Created by hanqilin on 16/7/22.
 */
/**
 * 代言排行榜.
 */
var vm = new Vue({
    el: ".page",
    data: {
        list: {
            headImg: "",
            nickName: "",
            amtTotal: "",
            rankTotal: "",
            data: []

        },
        pageCount: 0,
        loading: false,
        pageSize: 10
    },
    created: function () {
        this.getData();
        $(document.body).infinite().on("infinite", function () {
            if (vm.loading) return;
            vm.loading = true;
            if (vm.list.data.length >= vm.pageCount) {
                return;
            }
            setTimeout(function () {
                vm.getData();
            }, 1500)

        });

    },
    methods: {
        getData: function () {
            var _this = this;
            $.ajax({
                //url: $.baseUrl + '/zjind/rankList',
                url:'',
                data: {
                    rankFlag: "list2",
                    startSize: _this.list.data.length,
                    pageSize: _this.pageSize
                }
            }).done(function (Data) {
                var Data = {
                    "pageCount": 586,
                    "headImg": "http://wx.qlogo.cn/mmopen/UmADWTWNE8tAiaicnUPj8WHRSKj9quHr8icoO0SicdJBFSIvmVtSowUbOyuqkRxxhoavJXYGicFZGwyFicrdrYhQIiauCBRFQqwQnfr/0",
                    "amtTotal": 0,
                    "nickName": "Kylin麒麟",
                    "tag": "关注数",
                    "data": [{
                        "headImg": "http://wx.qlogo.cn/mmopen/pQ3hkLIXFvlJ7sCMzCR7G7RtQ412Uyb0HlFCv4GHVsh19JsjAbghKKYwiaNhOFBje7OLkNCPOLb95AwI70AAibx2V8ALaqhnaB/0",
                        "amtTotal": 36,
                        "nickName": "明華&張"
                    }, {
                        "headImg": "http://wx.qlogo.cn/mmopen/4h0Uv4XOMvN3mdBZEuVhFWPyMUpF0pqJokoSw1XTOl6MSx9BszWsquuvSxEozGeLsLKdzWr65LUTww7JLezePw/0",
                        "amtTotal": 30,
                        "nickName": "林洁"
                    }, {
                        "headImg": "http://wx.qlogo.cn/mmopen/ibxlsmicUAexKickxicI01tOHNz26bVEflrq74QVQBMZptQm0ic2sCfsLQ3lk5UznFJib3DeVxJvCVRJCdQM8HeYpLjKr9mENiblziap/0",
                        "amtTotal": 28,
                        "nickName": "温泉冰水"
                    }, {
                        "headImg": "http://wx.qlogo.cn/mmopen/pQ3hkLIXFvlIwj40B8icHpL2dpO7pMwlR4x4DZAJVdfzTF4j930RG9hc2N7j6adK9ACWOLVEia6j6qRmS5e09A7Y50oUJJdKnK/0",
                        "amtTotal": 25,
                        "nickName": "任小米"
                    }, {
                        "headImg": "http://wx.qlogo.cn/mmopen/UmADWTWNE8tAiaicnUPj8WHbj0WEpu7Sr93ia6UPuIV8KpicoeqC9icLSZ90pBn4kEpsEJyfmZDHT71ultRIaffjicIMUss848AEjd/0",
                        "amtTotal": 24,
                        "nickName": "牟正蓬"
                    }, {
                        "headImg": "http://wx.qlogo.cn/mmopen/P4wLOvUby1jCPKGcJGjNOFqXcdMFSAVImk0Ij9rKnbUorSy6FkKyohQRLBICXLjDlD99HQ3dkTGeibic6r6FFPt3z1zus6KvY9/0",
                        "amtTotal": 14,
                        "nickName": "朱晓明"
                    }, {
                        "headImg": "http://wx.qlogo.cn/mmopen/4h0Uv4XOMvN7FR2cA6HtpNI32rUPIe9tdScMhAFaew1y86IGMw8XsSE8ydtZGUoq29NiccboGeYdXcejuUNWaaY8BjxY5CnQN/0",
                        "amtTotal": 10,
                        "nickName": "陈新洲"
                    }, {
                        "headImg": "http://wx.qlogo.cn/mmopen/oSULtfribj4hRWYVXuickCw9Ce9jcBe1ZkdPGXqehaiba2P1dnUoiaoqDud5UwOmGJC3MLgBZzXtMvAwYsEibUibibOOiadp4RtAkrKU/0",
                        "amtTotal": 9,
                        "nickName": "徐凯"
                    }, {
                        "headImg": "http://wx.qlogo.cn/mmopen/PiajxSqBRaEKLichcjDcVOJYv8fUicWDxUHicerEjiadfXVh8Y8TOXJm3rBjWOpJqV0rkR07fIfwzVibQyEnJHsqzAhA/0",
                        "amtTotal": 7,
                        "nickName": "春蕾"
                    }, {
                        "headImg": "http://wx.qlogo.cn/mmopen/oSULtfribj4hRWYVXuickCwxLeSku5Ajlok0nukTbQlvGSZJRjHYhtqeO1xVT2jiaqKFl5WPEemhuPKSMibRGpWNagjFHLkmrqDY/0",
                        "amtTotal": 7,
                        "nickName": "连世斌"
                    }],
                    "rankTotal": 46
                }; /*测试数据*/
                _this.pageCount = Data.pageCount;
                _this.list.headImg = Data.headImg;
                _this.list.nickName = Data.nickName;
                _this.list.amtTotal = Data.amtTotal;
                _this.list.rankTotal = Data.rankTotal;
                $.each(Data.data, function () {
                    _this.list.data.push(this)
                });
                vm.loading = false;
            })
        }
    }
});
