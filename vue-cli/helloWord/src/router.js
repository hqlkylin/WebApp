/**
 * Created by hanqilin on 16/6/23.
 */
export default function (router) {
    router.map({
        '/': {
            name: 'index',
            component: require('./components/hello.vue')
        },
        '/kylin': {
            name: 'kylin',
            // 按需加载
            /*component: function (resolve) {
                require(['./components/kylin.vue'], resolve)
            }*/
            component: require('./components/kylin.vue')
        }
    })
}
