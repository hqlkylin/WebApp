/**
 * Created by hanqilin on 16/4/25.
 */
var tip = $.showMsg();
var jsonData = {
    "data": [
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "[新品上市]大核桃点桃仁200g"
                },
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 1.01,
                    "qty": 2,
                    "productName": "测试订单推广"
                }
            ],
            "status": "已完成le ",
            "total_price": 0.01,
            "order_no": "20160425131407498213"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广"
                }
            ],
            "status": "已完成",
            "total_price": 10.01,
            "order_no": "20160421231407498212"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                }
            ],
            "status": "已完成1",
            "total_price": 11.01,
            "order_no": "204212314074d98214"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广"
                }
            ],
            "status": "已完成",
            "total_price": 10.01,
            "order_no": "20160421231407498212"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                },
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "测试订单推广2"
                }
            ],
            "status": "已完成1",
            "total_price": 11.01,
            "order_no": "204212314074d98214"
        },
        {
            "Row_Id": "749cb99c755c4df58a0737b9e5e92071",
            "items": [
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 0.01,
                    "qty": 1,
                    "productName": "[新品上市]大核桃点桃仁200g"
                },
                {
                    "imgUrl": "images/000/000/134/201604/571888125cc2e.jpg",
                    "price": 1.01,
                    "qty": 2,
                    "productName": "测试订单推广"
                }
            ],
            "status": "已完成le ",
            "total_price": 0.01,
            "order_no": "20160425131407498213"
        }
    ],
    "counts": 10,
    "type": "0"

}

var jsonData1 = {
 "data": [

 ],
 "counts": 0,
 "type": "0"

 }
var vm = new Vue({
    el: ".page",
    data: {
        items: [],
        loading: false,
        pageSize: 5,
        counts: 1,
        type: "0"
    },
    created: function () {
        this.getData();
        $(document.body).infinite().on("infinite", function () {
            if (vm.loading) return;
            vm.loading = true;
            if (vm.items.length >= vm.counts) {
                $(".weui-infinite-scroll").hide();
                $(".text").show();
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
                url: '',
                data: {
                    type: _this.type,
                    startSize: _this.items.length,
                    pageSize: _this.pageSize,
                    userId: userId
                }
            }).done(function (data) {

                $.each(jsonData.data, function () {
                    _this.items.push(this);
                });
                _this.counts = jsonData.counts;
                _this.type = jsonData.type;
                tip.hide();

                if (_this.items.length >= _this.counts) {
                    $(".weui-infinite-scroll").hide();
                    $(".text").show();
                    return;
                }
                _this.loading = false;

            })

        },
        showAll: function () {
            var $dom = $(event.target);
            $dom.empty().closest(".weui_cell").nextAll(".weui_cell").show();
        }
        //statusStr: function (num) {
        //    switch (num){
        //        case :0
        //            return
        //
        //    }
        //}
    },
    computed: {
        showData: function () {
            return this.counts > 0;
        }
    }
});
