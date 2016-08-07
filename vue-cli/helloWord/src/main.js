import Vue from 'vue'
import App from './App'
/* eslint-disable no-new */
import Router from 'vue-router'
import routerMap from './router'

Vue.use(Router);
const router = new Router();
routerMap(router);

router.start(App, "#root");



