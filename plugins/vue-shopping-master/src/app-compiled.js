'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _app = require('./app.vue');

var _app2 = _interopRequireDefault(_app);

var _vueToastMobile = require('vue-toast-mobile');

var _vueToastMobile2 = _interopRequireDefault(_vueToastMobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Toast = _vueToastMobile2.default;
//消息提醒


_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueResource2.default);

//配置前端请求路径
var configPath = '/src/mock/';
window.configPath = configPath;

_vue2.default.http.options.headers = {
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};
_vue2.default.http.options.emulateJSON = true;
_vue2.default.config.debug = true;

var router = new _vueRouter2.default({
	//abstract:true,
	//地址栏不会有变化
	//以下设置需要服务端设置
	hashbang: true,
	history: false, //当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
	saveScrollPosition: true,
	transitionOnLoad: true,
	linkActiveClass: 'nav-active' //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
});

require('./routers')(router);
router.start(_app2.default, 'app');

//# sourceMappingURL=app-compiled.js.map