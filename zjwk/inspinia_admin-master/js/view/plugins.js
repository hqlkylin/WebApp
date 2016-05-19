
/*******************************************************************************************************
 *   View : $.getFromTemplate()    替换模板
 *    @param [options:template($dom)]        template jquery dom
 *    @param [options:model(obj)]            { name : value }
 ********************************************************************************************************/
$.getFromTemplate = function (template, model) {
    var templateData;
    if (template.constructor === jQuery) {
        templateData = template.html();
    } else if (template.constructor === String) {
        templateData = template;
    }
    templateData = templateData.replace(
        new RegExp("\\#\\{([^\\}]+)\\}", "gi"),
        function ($0, $1) {
            if ($1 in model) {
                return ( model[$1] );
            } else {
                return ( $0 )
            }
        }
    );
    if (template.constructor === jQuery) {
        return ( $(templateData).data("model", model) );
    } else if (template.constructor === String) {
        return templateData;
    }
};

/*******************************************************************************************************
 *  调用方法 : $.closeLoader()    关闭加载等待提示
 ********************************************************************************************************/
$.closeLoader = function () {
    $(".be-loader").hide();
}
/*******************************************************************************************************
 *  调用方法 : $.openLoader()    打开加载等待提示
 ********************************************************************************************************/
$.openLoader = function () {
    $(".be-loader").show();
    setTimeout(function () {
        $(".be-loader").hide();
        //console.log("系统异常!");
    }, 6000);
};

/*******************************************************************************************************
 *  调用方法 : $.showTipData()    关闭加载等待提示
 ********************************************************************************************************/
$.showTipData = function () {
    $(".data-loader").show();
}
/*******************************************************************************************************
 *  调用方法 : $.hideTipData()    打开加载等待提示
 ********************************************************************************************************/
$.hideTipData = function () {
    setTimeout(function () {
        $(".data-loader").hide();
    }, 200);
};
/*------------------------------------------通用分页模块-------------------------------------------------*/
/*******************************************************************************************************
 *    调用方法 : $.initPage(options)    分页模块 * 为必填
 *    @param [options]     pageBox(*) : 输出的分页容器
 *    @param [options]     rowsCount(*) : 总条数
 *    @param [options]     curPage(*) : 当前页
 *    @param [options]     pageCount(*) : 总页数
 *    @param [options]     callback(curPage : 分页点击回调函数     参数：当前页

 ********************************************************************************************************/
$.initPage = function (options) {
    var opt = {
        pageBox: ".pageBox",
        rowsCount: 0,
        curPage: 1,
        pageCount: 1,
        callback: function (curPage) {

        }
    };
    $.extend(opt, options);
    $(opt.pageBox).createPage({
        pageCount: opt.pageCount,
        current: opt.curPage,
        backFn: function (curPage) {
            opt.callback(curPage);
        }
    });
};
/*******************************************************************************************************
 *  调用方法 : $.initPageSet()    序列化表单
 *  @param data: 数据源
 *  @param name: 键名
 *  @param value: 键值
 ********************************************************************************************************/
$.initPageSet=function(data,name,value){
    $.each(data, function () {
        if (this.name == name) {
            this.value = value;
            return;
        }
    });
}
/*------------------------------------------通用分页模块-------------------------------------------------*/

/*******************************************************************************************************
 *  调用方法 : $.getFormSerialize()    序列化表单
 *  @param form   表单容器 class || id
 ********************************************************************************************************/
$.getFormSerialize = function (form) {
    return $(form).serialize();
};


/*******************************************************************************************************
 *  调用方法 : $.highlightMenu()    高亮菜单选中
 *  @param menuName  菜单名称
 ********************************************************************************************************/
$.highlightMenu = function (menuName) {
    var $a = $("#side-menu .nav-second-level li a");
    $a.each(function (i) {
        var $this = $(this);
        if ($this.html() == menuName) {
            $this.parent().addClass("active").parent().addClass("in").parent().addClass("active");
            return false; // 跳出each
        }
    })
};

///
//*******************************************************************************************************
//*  调用方法 : $.highlightMenu_level()    高亮菜单选中  (一级菜单)
//*  @param menuName  菜单名称
//********************************************************************************************************/
$.highlightMenu_level = function (menuName) {
    var $a = $("#side-menu .nav-label");
    $a.each(function (i) {
        var $this = $(this);
        if ($this.html() == menuName) {
            $this.closest("li").addClass("active")
            return false; // 跳出each
        }
    })
};



/*******************************************************************************************************
 *  调用方法 : $.baseUrl   获取页面根路径
 *
 ********************************************************************************************************/
$.baseUrl = (function getContextPath() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0, index + 1);
    return result;
})();

/*------------------------------------------正则验证----------------------------------------------------*/
/*******************************************************************************************************
 *  调用方法 : $. isInt  正则验证
 *
 ********************************************************************************************************/

/*int型*/
$.isInt = function (strNumber) {
    return (strNumber.search(/^(-|\+)?\d+$/) != -1);
};
/*浮点型*/
$.isFloat = function (strNumber) {
    return (strNumber.search(/^(-|\+)?\d+(\.\d+)?$/) != -1);
};
/*手机号*/
$.isMobile = function (mobile) {
    return /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(mobile);
};
// 四舍五入 (数字,保留小数后几位)
$.forDight = function (Dight, How) {
    return Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How);
};
//空判断
$.isNull = function (value) {
    if (value == null) return true;
    if (value == "") return true;
    if (value.IsArray && value.length == 0) return true;
    return false;
};

/*------------------------------------------正则验证----------------------------------------------------*/


/*------------------------------------------HTML元素处理方法--------------------------------------------*/
/*******************************************************************************************************
 *  调用方法 : $.getCheckBoxValue  返回多选按钮checkbox或者radiobox选中的结果
 *
 ********************************************************************************************************/
$.getCheckBoxValue = function (name) {
    var cks = document.getElementsByName(name);
    var value = "";
    for (var i = 0; i < cks.length; i++) {
        if (cks[i].checked) {
            value += ((value != "" ? "," : "") + cks[i].value);
        }
    }
    return value;
};


/*******************************************************************************************************
 *  调用方法 : $.getDropDownListText  获得选中下拉列表的文本
 *
 ********************************************************************************************************/
$.getDropDownListText = function (name) {
    var cks = $("#" + name)[0];
    for (var i = 0; i < cks.length; i++) {
        if (cks[i].selected) {
            return cks[i].innerText;
        }
    }
};
/*******************************************************************************************************
 *  调用方法 : $.getUrlParam  获得url参数
 *
 ********************************************************************************************************/
$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*---------------------------------------- Ajax 扩展 -------------------------------------------------*/

/*******************************************************************************************************
 *  调用方法 : $.ajaxJson  获取 json 对象
 *
 ********************************************************************************************************/
$.ajaxJson = function (url, data, onSuccess, onError) {
    return  $.ajax({
        url: url,
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: data,
        success: onSuccess,
        error: onError
    });
};
/*---------------------------------------- Ajax 扩展 -------------------------------------------------*/



/*----------------------------------------扩展原型方法-------------------------------------------------*/

/*********************************   字符，数字处理方法   ******************************************/
String.prototype.endWith = function (oString) {
    return new RegExp(oString + "$").test(this);
}
String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length) {
        return false;
    }
    return this.substr(0, str.length) == str;
}
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)、毫秒(S)
 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用1个占位符(是1-3位的数字)
 * eg:    (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *        (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 *        (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 *        (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
/*----------------------------------------扩展原型方法-------------------------------------------------*/

/*******************************************************************************************************
 *  页面初始化 init
 ********************************************************************************************************/
(function () {
    $(document).on("click", "#side-menu .nav-second-level li a", function () {
        if ($(this).attr("data-url")) {
            return;
        }
        $(".be-loader").show();
    });
    //页面初始化关闭的等待层
    $(document).on('ready', function () {
        $.closeLoader();
    });
}());

/*----------------------------------------图片上传方法-------------------------------------------------*/

/*******************************************************************************************************
 *  callback（pathImg,fileName）
 *  pathImg:图片完整地址   http://dkload.oss-cn-beijing.aliyuncs.com/tmp_e8c90395a2334ac4995d94506dcdcdb4_logo-30px.png
 *  fileName:文件名称
 ********************************************************************************************************/

$.pluplaad = function (callback) {
    var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'selectfiles',
        //runtimes : 'flash',
        container: document.getElementById('plwrap'),
        //flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
        //silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
        url: host,
        filters: {
            mime_types: [ //只允许上传图片
                {title: "Image files", extensions: "jpg,gif,png,jpeg"}
            ],
            max_file_size: '1024kb' //最大只能上传2048kb的文件
        },
        multi_selection: false,//是否可以在文件浏览对话框中选择多个文件
        unique_names: true,//每个上传的文件生成一个唯一的文件名，并作为额外的参数post到服务器端，参数明为name,值为生成的文件名。
        multipart_params: {
            'Filename': '${filename}',
            'key': fileName + '${filename}',
            'policy': policy,
            'OSSAccessKeyId': accessid,
            'success_action_status': '200', //让服务端返回200,不然，默认会返回204
            'signature': signature,
        },
        init: {
            PostInit: function () {
                document.getElementById('ossfile').innerHTML = '';
            },
            FilesAdded: function (up, files) {
                plupload.each(files, function (file) {
                    document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                        + '<div class="progress" style="width:200px;"><div class="progress-bar" style="width: 0%"></div></div>'
                        + '</div>';
                });
                uploader.start();
            },
            UploadProgress: function (up, file) {
                var d = document.getElementById(file.id);
                d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";

                var prog = d.getElementsByTagName('div')[0];
                var progBar = prog.getElementsByTagName('div')[0]
                progBar.style.width = 2 * file.percent + 'px';
                progBar.setAttribute('aria-valuenow', file.percent);
            },

            FileUploaded: function (up, file, info) {
                if (info.status >= 200 || info.status < 200) {
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功';
                    setTimeout(function () {
                        $("#ossfile").empty();
                    }, 1000);
                    var subPath = fileName + file.name;
                    subPath = subPath.trim();
                    subPath = subPath.replace("%", "%25").replace(/!/g, "%21").replace(/"/g, "%22").replace(/#/g, "%23").replace("$", "%24").replace(/&/g, "%26").replace(/'/g, "%27");
                    var pathImg = host + "/" + subPath;
                    callback(pathImg, subPath);
                } else {
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                }
            },
            Error: function (up, err) {
                swal("错误提示！", "上传失败:图片大小不能超过1024kb!", "error");
                //document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
            }
        }
    });
    uploader.init();
    return uploader;
};


