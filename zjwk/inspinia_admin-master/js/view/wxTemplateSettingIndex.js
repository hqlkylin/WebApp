/**
 * Created by hanqilin on 16/5/5.
 */
// 素材库模拟数据
var materialData = {
    resultList: [
        {
            "rowId": "2649911147_1",
            "name": "上周功能更新（5月4日篇）",
            "imageURL": "../../../../kylin/ac/s13.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=2649911147&amp;idx=1&amp;sn=25a568dbdaa13e17d0e07f17df8b2e4c#rd",
            "summary": "啦啦啦啦啦，今天是五四青年节，祝大家青年节快乐！小编呢也立志做个勤奋刻苦的好青年，所以五一小长假刚过就屁颠屁颠的赶回来给大家送上节前一周的系统更新公告了。新鲜出炉的公告，快来看一看吧！",
            "createTime": "2016-05-04"
        },
        {
            "rowId": "2649911143_1",
            "name": "上周功能更新（4月25日篇）",
            "imageURL": "../../../../kylin/ac/s14.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=2649911143&amp;idx=1&amp;sn=14e4ae42d2af0072102ac70bf971a971#rd",
            "summary": "美好的一周又开始了!首先在这里给大家致歉，上周因为开发排期的问题，我们跟大家失约了。所以今天我们赶紧补上了，快来看看上两周都有哪些功能更新吧！",
            "createTime": "2016-05-04"
        },
        {
            "rowId": "2649911140_1",
            "name": "上周功能更新（4月13日篇）",
            "imageURL": "../../../../kylin/ac/s15.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=2649911140&amp;idx=1&amp;sn=d53b711bbd346b77225e5b8bc4ff64d0#rd",
            "summary": "春风送暖，万物复苏，又到了上周功能优化大放送时间啦！快来欣赏码农哥哥为大家送上的春日福利大餐吧~~~",
            "createTime": "2016-05-04"
        },
        {
            "rowId": "2649911139_1",
            "name": "上周功能更新（4月13日篇）",
            "imageURL": "../../../../kylin/ac/s16.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=2649911139&amp;idx=1&amp;sn=b2f1d8b5cb417b5592c27102b21ad754#rd",
            "summary": "春风送暖，万物复苏，又到了上周功能优化大放送时间啦！快来欣赏码农哥哥为大家送上的春日福利大餐吧~~~",
            "createTime": "2016-05-04"
        },
        {
            "rowId": "402427484_1",
            "name": "上周功能更新（4月5日篇）",
            "imageURL": "../../../../kylin/ac/s17.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=402427484&amp;idx=1&amp;sn=80140ed85f2c37c525f8294ac6f87c6f#rd",
            "summary": "清明小长假刚过，我们的一周功能优化又跟大家见面啦！研发攻城师们很勤奋，有木有？快来看看上一周都有哪些功能更新吧！",
            "createTime": "2016-05-04"
        },
        {
            "rowId": "402325329_1",
            "name": "上周升级都有哪些大事件？",
            "imageURL": "../../../../kylin/ac/s18.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=402325329&amp;idx=1&amp;sn=3292808ac04ba4335892c880dc595e56#rd",
            "summary": "一周功能优化，准时送给大家！每周我们勤劳的码农哥哥不仅要在开发新功能的路上挥汗如雨，还会将已开发的功能大力优化一下，让指尖代言的客户朋友们享受到更好的产品体验。",
            "createTime": "2016-05-04"
        },
        {
            "rowId": "401922226_1",
            "name": "指尖会员重磅上线，从粉丝关注到成单So Easy!",
            "imageURL": "../../../../kylin/ac/s19.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=401922226&amp;idx=1&amp;sn=b1b2396f09f8e4c594861683d5147092#rd",
            "summary": "世界上最遥远的距离 不是生与死的距离\n而是 粉丝明明在面前，你却不知道如何管理",
            "createTime": "2016-05-04"
        },
        {
            "rowId": "401738883_1",
            "name": "指尖代言2.0重磅上线 开启微信营销新篇章",
            "imageURL": "../../../../kylin/ac/s20.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=401738883&amp;idx=1&amp;sn=cf5d4408edf7b95fcb575881f03c4a42#rd",
            "summary": "线下营销成本上涨、渠道成本居高不下、平台电商门槛高、微信营销玩不转、公众号没粉丝&amp;没转化？指尖代言,所有微信营销问题一站解决。",
            "createTime": "2016-05-04"
        },
        {
            "rowId": "401525663_1",
            "name": "[有人@你] 您获得一个免费微商城，马上开通赚大钱！",
            "imageURL": "../../../../kylin/ac/s21.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=401525663&amp;idx=1&amp;sn=01cddaaf2f2761b7359ef882f89132a0#rd",
            "summary": "微店不止小和美，还有更赚钱！",
            "createTime": "2016-05-04"
        },
        {
            "rowId": "401285183_1",
            "name": "2015，那些互联网行业热词悄悄告诉你的事",
            "imageURL": "../../../../kylin/ac/s22.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=401285183&amp;idx=1&amp;sn=2c3b34102923d571e7b1271e6d5176d7#rd",
            "summary": "站在2015年的小尾巴上，小编就来盘点一下2015年的那些互联网行业热词，或许，这里有每个圈内人都想知道的未来！",
            "createTime": "2016-05-04"
        },
        {
            "rowId": "401285183_2",
            "name": "第一财经专访《王鸿：用指尖代言颠覆Social CRM》",
            "imageURL": "../../../../kylin/ac/s23.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=401285183&amp;idx=2&amp;sn=178374790608f4feef8b3c535b731e26#rd",
            "summary": "随着互联网思维深入到社会的每个细胞，加上移动终端的全面普及，不仅让社区经济成为社会宏观生产关系和社会关系的重要组织形式，更促使社群经济正在颠覆着很多行业的商业模式。企业管理和品牌传播如何在微营销战场突出重围，成为诸多企业需要思考的问题。",
            "createTime": "2016-05-04"
        }
    ],
    curPage: 1,
    pageCount: 10
};
// 推广模拟数据
var spreadData = {
    resultList: [
        {
            "rowId": "401282787_1",
            "name": "2015，那些互联网行业热词悄悄告诉你的事",
            "imageURL": "../../../../kylin/ac/s22.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=401282787&amp;idx=1&amp;sn=e9e4dd9aa9510e4ce24930026d57f8eb#rd",
            "summary": "站在2015年的小尾巴上，小编就来盘点一下2015年的那些互联网行业热词，或许，这里有每个圈内人都想知道的未来！",
            "createTime": 1451560818
        },
        {
            "rowId": "401282787_2",
            "name": "第一财经专访《王鸿：用指尖代言颠覆Social CRM》",
            "imageURL": "../../../../kylin/ac/s15.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=401282787&amp;idx=2&amp;sn=4c61fb22695177a96cc733b5e732ed0a#rd",
            "summary": "随着互联网思维深入到社会的每个细胞，加上移动终端的全面普及，不仅让社区经济成为社会宏观生产关系和社会关系的重要组织形式，更促使社群经济正在颠覆着很多行业的商业模式。企业管理和品牌传播如何在微营销战场突出重围，成为诸多企业需要思考的问题。",
            "createTime": 1451560818
        },
        {
            "rowId": "401203407_1",
            "name": "纯干货｜微信营销的策略和实操分享",
            "imageURL": "../../../../kylin/ac/s14.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=401203407&amp;idx=1&amp;sn=e89d97e889daaa8950e8201349ce395e#rd",
            "summary": "点击上方关注指尖代言，让微信营销更简单！微信和传统电商（淘宝）到底有什么不一样？王鸿：首先，想请问大家一个问",
            "createTime": 1451034709
        },
        {
            "rowId": "401203407_2",
            "name": "活动运营4招必杀技，效果提升不止10倍！",
            "imageURL": "../../../../kylin/ac/s15.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=401203407&amp;idx=2&amp;sn=b676c5bf0da675409b9e8d0144f74207#rd",
            "summary": "点击上方关注指尖代言，让微信营销更简单！不要为了活动而活动，确认好活动目标是关键现在新媒体圈子里面存在着这种",
            "createTime": 1451034709
        },
        {
            "rowId": "401023584_1",
            "name": "企业公众号运营，必须要知道的5件事！",
            "imageURL": "../../../../kylin/ac/s16.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=401023584&amp;idx=1&amp;sn=04a4e19b0e7cb2bc2f26d053b212a8e8#rd",
            "summary": "内容、活动、推广、用户、数据，样样少不了！",
            "createTime": 1449827532
        },
        {
            "rowId": "400933310_1",
            "name": "微信小店如何挖掘社交红利？朋友圈还靠得住吗？",
            "imageURL": "../../../../kylin/ac/s17.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=400933310&amp;idx=1&amp;sn=1149c03744f30b0807072bf894fb31df#rd",
            "summary": "在微信流量海洋中，我们都不想成为信息孤岛",
            "createTime": 1449218182
        },
        {
            "rowId": "400834965_1",
            "name": "APP？微信公众号？创业公司可以从这里开始！",
            "imageURL": "../../../../kylin/ac/s16.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=400834965&amp;idx=1&amp;sn=26eb432a772fe5f1b76de463b2a24f01#rd",
            "summary": "关于这个选择题，适合自己的才是最好的！",
            "createTime": 1448611270
        },
        {
            "rowId": "400716259_1",
            "name": "传统线下企业转战微信营销，如何从零开始快速吸引粉丝关注？",
            "imageURL": "../../../../kylin/ac/s15.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=400716259&amp;idx=1&amp;sn=510bfdc9c04b804550e6554084a01d18#rd",
            "summary": "形式润物细无声，效果立竿就见影",
            "createTime": 1448009837
        },
        {
            "rowId": "400501582_1",
            "name": "推广渠道选的好，何须运营掉节操！",
            "imageURL": "../../../../kylin/ac/s14.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=400501582&amp;idx=1&amp;sn=a813e013ec43ac2fa8eeedb087c916ec#rd",
            "summary": "指尖代言火爆注册中，11月独享推广优惠！",
            "createTime": 1447210200
        },
        {
            "rowId": "400313544_1",
            "name": "指尖代言11月火爆注册中，线上客户微信粉丝飞涨",
            "imageURL": "../../../../kylin/ac/s13.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=400313544&amp;idx=1&amp;sn=6952df1917c28ed0ed0554e7f71b85d9#rd",
            "summary": "点击上方蓝字，关注指尖代言，让营销推广更简单！九点钟酒店控九点钟是一款基于地理位置查询和预订酒店钟点房、酒店",
            "createTime": 1446605819
        },
        {
            "rowId": "400313544_2",
            "name": "1分钟快速注册指尖代言，微信营销从此简单",
            "imageURL": "../../../../kylin/ac/s12.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=400313544&amp;idx=2&amp;sn=7492bc3a83ae70e37dd190bcf6a48856#rd",
            "summary": "点击上方蓝字，关注指尖代言，让营销推广更简单！1分钟快速注册指尖代言1打开指尖代言官网在PC端打开指尖代言官",
            "createTime": 1446605819
        },
        {
            "rowId": "400171859_1",
            "name": "利普康基因打破微信粉丝僵局，5天成功突破1W",
            "imageURL": "../../../../kylin/ac/s11.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=400171859&amp;idx=1&amp;sn=58b74e9ac2316c6dc713e522e4a8d077#wechat_redirect",
            "summary": "点击上方蓝字，关注指尖代言，让营销推广更简单！粉丝增长慢？订单转化难？推广经费高？微信营销困难重重？指尖代言",
            "createTime": 1446084057
        },
        {
            "rowId": "400171859_2",
            "name": "轻松4步搞定增粉，微信营销赢在指尖！",
            "imageURL": "../../../../kylin/ac/s10.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=400171859&amp;idx=2&amp;sn=97e4916154eeddf12f4a581b2815b344#wechat_redirect",
            "summary": "点击上方蓝字，关注指尖代言，让营销推广更简单！粉丝增长慢？订单转化难？推广经费高？微信营销困难重重？指尖代言",
            "createTime": 1446084057
        },
        {
            "rowId": "400059561_1",
            "name": "3天裂变营销7千粉丝，指尖代言助力为颂智能",
            "imageURL": "../../../../kylin/ac/s9.jpg",
            "outUrl": "http://mp.weixin.qq.com/s?__biz=MzIxNzAxMTk5Nw==&amp;mid=400059561&amp;idx=1&amp;sn=85951e09e519955260a34719672df5e8#rd",
            "summary": "打开才知道，里面多有料！",
            "createTime": 1445390982
        }
    ],
    curPage: 1,
    pageCount: 10
};

var initData = {
    "id": "e96a701186194a04830fded095818821",
    "accountId": "59b68e12f8fb4c9d90c39f0b16e80707",
    "publicId": "gh_78a3263921b8",
    "title": "微信公众平台页面模版功能",
    "updateDate": "May 16, 2016 6:47:11 PM",
    "status": true,
    "carousels": [{
        "rowId": "7275ce92749a4a17b68f55d8f3ab26af",
        "pageType": 2,
        "nodeId": "1",
        "name": "Vue.js – 基于 MVVM 实现交互式的 Web 界面",
        "summary": "",
        "createTime": "May 6, 2016 2:41:15 PM",
        "outUrl": "",
        "imageURL": "../../../../kylin/ac/s4.jpg"
    }, {
        "rowId": "1aeb1e3fc32c4ca0879fb4eb25d0d150",
        "pageType": 2,
        "nodeId": "1",
        "name": "[有人@你] 您获得一个免费微商城，马上开通赚大钱！",
        "summary": "传统电商渴望拓展更多售卖渠道\n线下电商希望转型打造线上品牌\n有好货！有资源！不知如何开店？\n指尖代言推出微店铺功能",
        "createTime": "May 6, 2016 2:40:36 PM",
        "outUrl": "",
        "imageURL": "../../../../kylin/ac/s9.jpg"
    }, {
        "rowId": "9e8165fbdca14149be17f4fbdfd5bb17",
        "pageType": 2,
        "nodeId": "1",
        "name": "内容从推广列表或者代言素材中",
        "summary": "",
        "createTime": "May 6, 2016 2:43:05 PM",
        "outUrl": "",
        "imageURL": "../../../../kylin/ac/s8.jpg"
    }],
    "categorys": [{
        "tabName": "图文",
        "materials": [{
            "rowId": "51fe2d406f4a445bb72bd843281f04e7",
            "pageType": 2,
            "nodeId": "1",
            "name": "Vue.js 是用于构建交互式的 Web  界面的库。",
            "summary": "它提供了 MVVM 数据绑定和一个可组合的组件系统，具有简单、灵活的 API。从技术上讲",
            "createTime": "May 6, 2016 2:38:43 PM",
            "outUrl": "",
            "imageURL": "../../../../kylin/ac/s5.jpg"
        }, {
            "rowId": "96c433e3285f4124a1643dd9afa48add",
            "pageType": 2,
            "nodeId": "1",
            "name": "我好像很屌的燕子",
            "summary": "我是副标题，我来填充术的，你我的名字可能行哦",
            "createTime": "May 6, 2016 2:40:19 PM",
            "outUrl": "",
            "imageURL": "../../../../kylin/ac/s6.jpg"
        }, {
            "rowId": "1aeb1e3fc32c4ca0879fb4eb25d0d150",
            "pageType": 2,
            "nodeId": "1",
            "name": "[有人@你] 您获得一个免费微商城，马上开通赚大钱！",
            "summary": "传统电商渴望拓展更多售卖渠道\n线下电商希望转型打造线上品牌\n有好货！有资源！不知如何开店？\n指尖代言推出微店铺功能",
            "createTime": "May 6, 2016 2:40:36 PM",
            "outUrl": "",
            "imageURL": "../../../../kylin/ac/s7.jpg"
        }, {
            "rowId": "c1c540c197ef4de8b9c0e81340bf61b5",
            "pageType": 2,
            "nodeId": "1",
            "name": "指尖会员重磅上线，从粉丝关注到成单So Easy!",
            "summary": "代购特价原装螺纹陶瓷把手烤肉叉子钎子不锈钢签烤串签子烧烤钢针 [交易快照]\n",
            "createTime": "May 6, 2016 2:37:17 PM",
            "outUrl": "",
            "imageURL": "../../../../kylin/ac/s8.jpg"
        }, {
            "rowId": "7275ce92749a4a17b68f55d8f3ab26af",
            "pageType": 2,
            "nodeId": "1",
            "name": "我们的金卡健康的肌肤",
            "summary": "",
            "createTime": "May 6, 2016 2:41:15 PM",
            "outUrl": "",
            "imageURL": "../../../../kylin/ac/s9.jpg"
        }, {
            "rowId": "9e8165fbdca14149be17f4fbdfd5bb17",
            "pageType": 2,
            "nodeId": "1",
            "name": "纠结啊放假久了阿斯顿发",
            "summary": "",
            "createTime": "May 6, 2016 2:43:05 PM",
            "outUrl": "",
            "imageURL": "../../../../kylin/ac/s10.jpg"
        }]
    }, {
        "tabName": "新闻",
        "materials": [{
            "rowId": "4789ee8182fe40acb7e0c15e4fbb7c92",
            "pageType": 1,
            "nodeId": "1",
            "name": "我们提到的基础参数主要指调用方法时用到的配置项",
            "summary": "基础参数可合理应用于任何层类型中，您不需要所有都去配置，大多数都是可",
            "createTime": "May 6, 2016 2:44:19 PM",
            "imageURL": "../../../../kylin/ac/s11.jpg"
        }, {
            "rowId": "f1e6c6eb99b0434bac654af943f9801d",
            "pageType": 1,
            "nodeId": "1",
            "name": "Class 与 Style 绑定",
            "summary": "数据绑定一个常见需求是操作元素的 class 列表和它的内联样式.",
            "createTime": "May 6, 2016 10:39:14 AM",
            "outUrl": "http://www.baidu.com",
            "imageURL": "../../../../kylin/ac/s12.jpg"
        }]
    }]
}

var vm = new Vue({
    el: ".page",
    data: {
        id: id,
        accountId: accountId,
        publicId: publicId,
        prefix: prefix,
        status: true,
        // 素材库数据
        materialData: {
            resultList: [],
            curPage: 1,
            pageCount: 10,
            pageSize: 5
        },
        // 推广数据
        spreadData: {
            resultList: [],
            curPage: 1,
            pageCount: 10,
            pageSize: 5
        },
        // 选中的素材库
        selectMaterialData: [],
        // 选中的推广
        selectSpreadData: [],
        currentLength: 3,
        //checkBox 临时数据
        tempSelect: [],
        // 已选数据  需要Ajax初始化 数据
        headData: [],
        listData: [{
            "id": "",
            "tabName": "分类名",
            "materials": [],
        }],
        // 标题
        title: '',
        // 临时标题
        tempTitle: '',
        // 打开的dialog 头部 或者 列表的标示
        //headData or listData
        openDialogDataName: "headData",
        // 已选中的数
        selectCount: 0,
        //当前活动的dataList 数据
        dataListCurrentIndex: 0
    },
    watch: {},
    methods: {
        // 检查选择数量
        checkCount: function (dataItem, e) {
            if (e.target.checked == true) {
                var dataLength = 0;
                if (this.openDialogDataName == "headData") {
                    dataLength = this[this.openDialogDataName].length;
                } else {
                    dataLength = this[this.openDialogDataName][this.dataListCurrentIndex].materials.length;
                }

                if (dataLength + this.selectMaterialData.length + this.selectSpreadData.length >= this.currentLength) {
                    toastr.error("最多只能选择" + this.currentLength + "篇", "提示")
                    e.preventDefault();
                } else {
                    this.tempSelect.push(dataItem);
                }


            } else {
                //this.tempSelect.$remove(dataItem);
                var arr = $.map(this.tempSelect, function (item, index) {
                    if (item.rowId == dataItem.rowId) {
                        return null;
                    }
                    return item;
                });
                this.tempSelect = arr;
            }


        },
        // 打开dialog 并初始化数据
        openDialog: function () {

            $.openLoader();
            // 清除数据
            this.selectMaterialData = [];
            this.selectSpreadData = [];
            this.tempSelect = [];

            //set 已选中的文章
            if (this.openDialogDataName == "headData") {
                this.selectCount = this.headData.length;
            } else {
                this.selectCount = this.listData[this.dataListCurrentIndex].materials.length || 0;
            }

            var _this = this;
            // 默认查询参数
            $.initPage.materialData = $("#materialForm").serializeArray();
            $.initPage.spreadData = $("#spreadForm").serializeArray();
            this.getMaterialData().then(function () {
                return _this.getSpreadData()
            }).then(function () {
                $.closeLoader();
                layer.open({
                    type: 1,
                    zIndex:8000,
                    area: ['700px', '600px'],
                    closeBtn: 0, //不显示关闭按钮
                    shift: 2,
                    content: $(".dialog"),
                    name: '从素材管理中选择'
                });

            });
        },
        // 获取推广数据
        getSpreadData: function () {
            var _this = this;
            return $.ajax({
                url: "/favicon.ico",
                type: "post",
                data: $.initPage.spreadData,
                success: function (data) {
                    _this.spreadData = spreadData
                    // _this.spreadData = data;
                    //分页
                    $.initPage({
                        pageBox: ".pageSpread",
                        pageCount: data.pageCount,
                        curPage: data.curPage,
                        callback: function (curPage) {
                            $.initPageSet($.initPage.spreadData, "curPage", curPage);
                            _this.getSpreadData();
                        }
                    });
                    // 还原表单查询条件
                    $.each($.initPage.spreadData, function () {
                        $("input[name=" + this.name + "]", "#spreadForm").val(this.value);
                    });
                },
                error: function () {
                    $.closeLoader();
                    swal("错误", "发生异常！", "error");
                }
            });
        },
        // 获取素材库数据
        getMaterialData: function () {
            var _this = this;
            return $.ajax({
                url: "/favicon.ico",
                type: "post",
                data: $.initPage.materialData,
                success: function (data) {
                    _this.materialData = materialData;
                    //分页
                    $.initPage({
                        pageBox: ".pageMaterial",
                        pageCount: data.pageCount,
                        curPage: data.curPage,
                        callback: function (curPage) {
                            $.initPageSet($.initPage.materialData, "curPage", curPage);
                            _this.getMaterialData();
                        }
                    });
                    // 还原表单查询条件
                    $.each($.initPage.materialData, function () {
                        $("input[name=" + this.name + "]", "#materialForm").val(this.value);
                    });
                },
                error: function () {
                    $.closeLoader();
                    swal("错误", "发生异常！", "error");
                }
            });
        },
        // 页面事件初始化
        initEvent: function () {
            // 素材库事件 选项卡
            $(".dialogNav li").click(function () {
                $(this).addClass("active").siblings().removeClass("active");
                $(".tabContent").eq($(this).index()).addClass("active").siblings().removeClass("active");
            });

            // view选项卡切换事件
            this.initViewTabHover();
            // 计算类别显示width
            this.initTypeStyle();
            // 初始化排序插件
            this.initSortable();
        },
        // 页面数据初始化
        initData: function () {
            var _this = this;


            return $.ajax({
                url: "/favicon.ico",
                type: "get",
                success: function (data) {
                    var data = initData;
                    _this.title = _this.tempTitle = data.title;
                    _this.id = data.id;
                    _this.status = data.status;
                    _this.headData = data.carousels;
                    _this.listData = data.categorys;


                },
                error: function () {
                    $.closeLoader();
                    swal("错误", "发生异常！", "error");
                }
            });
        },
        // 关闭按钮 清除临时数据
        closeDialog: function () {
            this.tempSelect = [];
            layer.closeAll();
        },
        // 确定
        okDialog: function () {
            var _this = this;
            if (this.openDialogDataName == "headData") {
                $.each(this.tempSelect, function () {
                    _this[_this.openDialogDataName].push(this);
                });
            } else {
                $.each(this.tempSelect, function () {
                    _this[_this.openDialogDataName][_this.dataListCurrentIndex].materials.push(this);
                });
            }

            layer.closeAll();
        },
        // 删除已选数据
        headDataDel: function (item) {
            this.headData.$remove(item);
        },
        // 删除已选数据
        listDataDel: function (item) {
            this.listData[this.dataListCurrentIndex].materials.$remove(item);
        },
        // 打开[标题 || 删除]层
        openDiv: function (className) {
            $(className, $(event.target)).addClass("active");
        },
        // 修改标题
        updateTitle: function () {
            if ($.trim(this.tempTitle.length) == 0) {
                toastr.error("主页标题不能为空", "错误");
                return;
            }
            if (this.tempTitle.length > 16) {
                toastr.error("主页标题不能超过16个字符", "错误");
                return;
            }
            this.title = this.tempTitle;
            this.closeDiv('.popTitle');
        },
        // 关闭[标题 || 删除] 层
        closeDiv: function (className) {
            $(className).removeClass("active");
        },
        // 排序
        swap: function (index1, index2) {

            if (this.openDialogDataName == "headData") {
                this[this.openDialogDataName][index1] = this[this.openDialogDataName].splice(index2, 1, this[this.openDialogDataName][index1])[0];
            } else {
                this[this.openDialogDataName][this.dataListCurrentIndex].materials[index1] = this[this.openDialogDataName][this.dataListCurrentIndex].materials.splice(index2, 1, this[this.openDialogDataName][this.dataListCurrentIndex].materials[index1])[0];
            }

        },
        // 初始化排序插件
        initSortable: function () {
            setTimeout(function () {
                $.each($(".sortable"), function () {
                    new Sortable.create($(this).get(0),
                        {
                            delay: 0,
                            chosenClass: 'chosen',
                            onUpdate: function (/**Event*/evt) {
                                var itemEl = evt.item; // 当前拖拽的html元素
                                var current = $(itemEl).attr("data-id");
                                var ids = this.toArray();
                                var index = $.inArray(current, ids);
                                vm.swap(current, index);
                            }
                        });
                });
            }, 20);
        },
        // view选项卡切换事件
        initViewTabHover: function () {
            var _this = this;
            $(".hd").hover(function () {
                if (_this.openDialogDataName != "headData") {
                    $(this).find(".mask").addClass("active");
                }
            }, function () {

                $(this).find(".mask").removeClass("active");

            });
            $(".bd").hover(function () {
                if (_this.openDialogDataName == "headData") {
                    $(this).find(".mask").addClass("active");
                }
            }, function () {

                $(this).find(".mask").removeClass("active");

            })
        },
        viewTab: function (currentLength, openDialogDataName, className) {
            $(event.target).parent().removeClass("active");
            $(".Js-showSetting").hide().filter(className).fadeIn();
            // 初始化 数据
            this.currentLength = currentLength;
            this.openDialogDataName = openDialogDataName;

        },
        // 计算类别显示width
        initTypeStyle: function () {
            $(".tab_hd_inner .item").width(100 / this.listData.length + "%");
        },
        // 添加类别
        addType: function () {
            var _this = this;
            if (this.listData.length >= 5) {
                toastr.error("最多只能添加5个分类", "错误提示");
                return;
            }
            // 添加
            this.listData.push({
                "id": "",
                "tabName": "分类名",
                "materials": [],
            });
            // 设置默认项
            this.dataListCurrentIndex = this.listData.length - 1;
            // 页面部分初始化
            Vue.nextTick(function () {
                _this.initSortable();
                _this.initTypeStyle();
            });

        },
        // 类型切换
        typeTab: function (index) {
            this.dataListCurrentIndex = index;
        },
        // 删除分类
        delType: function (item) {
            var _this = this;
            if (this.listData.length <= 1) {
                toastr.error("至少保留一个分类", "错误提示");
                return;
            }
            this.listData.$remove(item);
            this.dataListCurrentIndex = this.listData.length - 1;
            // 页面部分初始化
            Vue.nextTick(function () {
                _this.initTypeStyle();
            });
        },
        // 发布
        save: function () {


            var _this = this,
                isStop = false;
            if (this.headData.length <= 0) {
                this.viewTab(3, 'headData', '.Js-hd');
                toastr.error("请至少选择一篇文章", "错误提示");
                return false;
            }

            $.each(this.listData, function (index, item) {
                if (this.materials.length <= 0) {
                    // 切换tab 和 当前选中
                    _this.viewTab(30, 'listData', '.Js-bd');
                    _this.typeTab(index);
                    toastr.error("请至少选择一篇文章", "错误提示");
                    isStop = !isStop;
                    return false;
                }
            });
            if (isStop) {
                return;
            }
            var postData = {
                id: _this.id,
                accountId: _this.accountId,
                publicId: _this.publicId,
                title: _this.title,
                status: _this.status,
                carousels: _this.headData,
                categorys: _this.listData
            };
            $.ajax({
                url: "/favicon.ico",
                type: "post",
                data: JSON.stringify(postData),
                success: function (data) {

                    layer.open({
                        type: 1,
                        title:"提交信息",
                        area: ['800px', '500px'],
                        content: $('#submitDiv') //这里content是一个普通的String
                    });
                   /* if (data == true) {
                        swal({
                            title: "操作成功！",
                            text: "",
                            type: "success"
                        }, function () {
                            location.href = $.baseUrl + "/pagetemplates/index";
                        });
                    } else {
                        swal("错误", "发布失败！", "error");
                    }*/

                },
                error: function () {
                    $.closeLoader();
                    swal("错误", "发生异常！", "error");
                }
            });


        }
    },
    created: function () {
        var _this = this;
        // 初始化数据 后 初始化插件
        this.initData().then(function () {

            Vue.nextTick(function () {
                _this.initEvent();
            });

        });

    },
    //计算属性
    computed: {
        // 一个计算属性的 getter
        showCount: function () {
            return this.currentLength - this.selectCount - this.tempSelect.length;
        }
    }
})