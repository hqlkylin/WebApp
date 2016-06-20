/**
 * Created by kylin on 2015/5/7.
 */
$(function () {
    //init 活动
    var activity = '556bf9932a464e380c34ec33';
    $("input[name='activity']").val(activity);

    /*form submit*/
    /*$("#form1").submit(function () {
     // 表单验证
     if (!$("#form1")[0].checkValidity()) {
     return;
     }
     $.ajax({
     url: '/users/add',
     type: 'post',
     dataType: 'json',
     data: $("#form1").serialize(),
     success: function (data) {
     /!*data:{msg:"信息",success:"true"}*!/
     $.messager.popup(data.msg);
     }
     });
     return false;
     });*/


    $("#form1").validate({
        submitHandler: function () {
            $.ajax({
                url: '/users/add',
                type: 'post',
                dataType: 'json',
                data: $("#form1").serialize(),
                success: function (data) {
                    /*data:{msg:"信息",success:"true"}*/
                    $.messager.popup(data.msg);
                    $("#form1").validate().resetForm();
                    $("#form1")[0].reset();
                }
            });
        }
    });


    loadData();
    function loadData() {

        // cookies is true  add clickCount
        if (!$.cookie('activity_' + activity)) {
            $.ajax({
                url: '/users/click',
                type: 'get',
                dataType: 'json',
                data: {activity: activity},
                success: function (data) {
                    if (data.success) {
                        $.cookie('activity_' + activity, new Date(), {expires: 10});
                    } else {
                        console.log(data.msg);
                    }

                }
            });
        }
        // get listData
        $.ajax({
            url: '/users/list',
            type: 'get',
            dataType: 'json',
            data: {activity: activity},
            success: function (data) {
                $.each(data, function (index, item) {
                    var newline = $(".list li:first").clone();
                    newline.find("span").eq(0).html(item.name);
                    newline.find("span").eq(1).html(item.tel);
                    newline.find("span").eq(2).html(item.address);
                    newline.find("span").eq(3).html(item.money);
                    $(".list").append(newline);
                });
            }
        });
        //check
        $.ajax({
            url: '/users/check',
            type: 'post',
            dataType: 'json',
            data: {tel: $("input[name='tel']").val(), activity: activity},
            success: function (data) {
                /*data:{msg:"信息",success:"true"}*/
                if (data.success) {
                    $.messager.popup(data.msg);
                } else {
                    //活动关闭
                    $("button", "#form1").attr("disabled", "disabled");
                    $.messager.popup(data.msg);//弹出信息
                }
            }
        });

    };

    var countdown = 60;
    function settime(val) {
        if (countdown == 0) {
            val.removeAttribute("disabled");
            val.value = "免费获取验证码";
            countdown = 60;
        } else {
            val.setAttribute("disabled", true);
            val.value = "重新发送(" + countdown + ")";
            countdown--;
            setTimeout(function () {
                settime(val)
            }, 1000);
        }
    }

    //获取验证码
    $("#getCode").click(function () {

        if (!$("#form1").validate().element($("input[name='tel']")[0])) {
            return;
        }
        settime($(this).get(0));

        $.ajax({
            url: '/users/getCode',
            type: 'post',
            dataType: 'json',
            data: {tel: $("input[name='tel']").val(), activity: activity},
            success: function (data) {
                /*data:{msg:"信息",success:"true"}*/
                if (data.success) {
                    $.messager.popup(data.msg);
                } else {
                    $.messager.popup(data.msg);
                }
            }
        });
    })


})