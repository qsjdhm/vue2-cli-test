import Vue from 'vue';
import Cookies from 'js-cookie';
import App from '@/App';
import store from '@/store';
import router from '@/router';
import i18n from '@/lang';
import Element from 'element-ui';

import '@/styles/index.scss'; // 全局css样式

import '@/permission.js'; // 权限的路有守卫
import '@/subtree/index.js'; // subtree 公共模块注册

// mock
// if (process.env.NODE_ENV === 'production') {
//     const { mockXHR } = require('../mock');
//     mockXHR();
// }

Vue.use(Element, {
    size: Cookies.get('size') || 'mini', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
});
Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: (h) => h(App)
});
