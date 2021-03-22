import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file

// 1. 先动态引入框架的modules
const frameFiles = require.context('./modules', true, /\.js$/);
const frame = frameFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = frameFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

// 2. 再动态引入业务的modules
const businessFiles = require.context('@/modules', true, /store.js$/);
const business = businessFiles.keys().reduce((modules, modulePath) => {
    // set './modules/equipment.js' => 'equipment'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')[0];
    const value = businessFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

// 3. 合成，初始化store
const store = new Vuex.Store({
    modules: {
        ...frame,
        ...business
    },
    getters
});

export default store;
