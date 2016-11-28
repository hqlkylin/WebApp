/**
 * Created by hanqilin on 16/10/22.
 */


var obj = require('./js/r1');



var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var app = Vue.extend({});
var router = new VueRouter();


router.map({
    '/': {
        component: require('./components/index.vue')
    },
    '/a': {
        component: function (resolve) {

            require(['./components/myComponent.vue'], resolve)
        }
    }
})

router.start(app, '.main');


