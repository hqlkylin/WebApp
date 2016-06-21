/**
 * Created by Administrator on 2015/6/8.
 */
$(function () {

    $("form").submit(function () {
        $.AMUI.progress.start();
        $.post($(this).attr("action"), $(this).serialize(), function (data) {
            $.AMUI.progress.done();
           if(!data.success){
               $("#my-alert").find(".am-modal-bd").html(data.msg).end().modal();
           }else{
               location.href="/admin/index";
           }
        });

        return false;
    })
});