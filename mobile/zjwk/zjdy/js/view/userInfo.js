Vue.filter('areaCity', function (value) {
    var str = "";
    if (!value)return "";
    var array = value.split("|");

    $.each(cityData, function () {
        if (this.value == array[0]) {
            str += this.text + " ";
            $.each(this.children, function () {
                if (this.value == array[1]) {
                    str += this.text;
                    return false;
                }
            })
            return false;
        }
    })
    return str;
})
var vm = new Vue({
    el: ".page",
    data: model,
    created: function () {


    },
    methods: {

        save: function () {
            console.log('save');
            if (!this.validate())return;
            //alert(JSON.stringify(vm.$data));
            var tip = $.showMsg({title:"更新数据中…"});
            $.ajax({
                url: "",
                type: 'post',
                data: JSON.stringify(vm.$data),

                success: function (data) {
                    setTimeout(function () {
                        tip.hide();
                        $.popTips({
                            "content": "恭喜您 修改成功!",
                            "type": "success",
                            "stayTime": 2500
                        });
                    },2000)


                }
            });

        },
        validate: function () {

            if (!/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/.test(this.userName)) {
                $.toast("请正确输入姓名！", "error");
                return false;
            }
            if (!/^(13|15|18|16|17)[0-9]{9}$/.test(this.phoneNumber)) {
                $.toast("请正确输入手机号！", "error");
                return false;
            }
            if (!/^\d{4}(\-|\/|\.)\d{2}\1\d{2}$/.test(this.birthday)) {
                $.toast("请输入正确的日期格式!", "error");
                return false;
            }

            if (this.cender == "") {
                $.toast("请选择性别!", "error");
                return false;
            }
            if (this.area == "") {
                $.toast("请选择地区!", "error");
                return false;
            }
            return true;

        }

    },
    /*计算属性*/
    computed: {},
    /*监听变量*/
    watch: {}


});

(function ($, doc) {
    $.ready(function () {
        //级联示例
        var cityPicker = new $.PopPicker({
            layer: 2
        });
        cityPicker.setData(cityData);
        var showCityPickerButton = doc.getElementById('showCityPicker');
        var cityResult = doc.getElementById('cityResult');
        showCityPickerButton.addEventListener('tap', function (event) {
            cityPicker.show(function (items) {
                cityResult.innerText = "" + items[0].text + " " + items[1].text;
                vm.area = items[0].value + "|" + items[1].value;
            });
        }, false);
        /* document.addEventListener('tap', function (event) {
         if (event.target.id != "showCityPicker") {
         cityPicker.hide();
         }
         }, false)*/
    });
})(mui, document);

