/**
 * Created by 韩麒麟 on 2015/8/20.
 */
/*requirejs.config({
 paths: {
 jquery: "jquery-1.11.0"
 }t
 });*/
requirejs(["jquery", "backtop"], function ($, backtop) {

    new backtop.BackTop($("#backTop"), {
        mode: "go",
        pos: 600,
        speed: 2000
    });

    //jquery  调用

    /*
     $("#backTop").backtop({
     mode:"move",
     pos:600,
     speed:2000
     });
     */

    /*
     var scrollTo = new scrollto.ScrollTo({
     dest: 100,
     speed: 2000
     });

     $("#backTop").on('click', function () {
     scrollTo.move()
     });

     $(window).on("scroll", function () {

     //if($(window).height()>)

     }).trigger("scroll");
     */


});
