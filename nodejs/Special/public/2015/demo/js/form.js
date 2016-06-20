/**
 * Created by kylin on 2015/5/7.
 */
$(function () {
    //init 活动
    var activity='5767a8546d2d34ae0cf5f9a7';
    $("input[name='activity']").val(activity);

    /*form submit*/
    $("#form1").submit(function () {
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
                $.messager.popup(data.msg);
            }
        });
        return false;
    });
    loadData();
    function loadData() {

        // cookies is true  add clickCount
        if (!$.cookie('activity_'+activity)) {
            $.ajax({
                url: '/users/click',
                type: 'get',
                dataType: 'json',
                data: {activity:activity },
                success: function (data) {
                  if(data.success){
                      $.cookie('activity_'+activity, new Date(), {expires: 10});
                  }else{
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
                    var newline = $("<li><span></span><span></span><span>无</span><span>无</span></li>");
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

                if(data.success){
                    $.messager.popup(data.msg);
                }else{
                    //活动关闭
                    $("button","#form1").attr("disabled","disabled");
                    $.messager.popup(data.msg);
                }
            }
        });

    };

    //get code
    $("#getCode").click(function (e) {

        $.ajax({
            url: '/users/getCode',
            type: 'post',
            dataType: 'json',
            data: {tel: $("input[name='tel']").val(), activity: activity},
            success: function (data) {
                $.messager.popup(data.msg);
            }
        });
        return false;
    })


})