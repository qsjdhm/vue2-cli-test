import Vue from 'vue';
import moment from 'moment';
import request from '@/subtree/utils/request';
import permission from '@/subtree/utils/permission';
import { optionalChaining } from '@/subtree/utils/optional-chaining';
import global from '@/subtree/utils/global';
const install = function () {
    Vue.prototype.$permission = permission;
    Vue.prototype.$moment = moment;
    Vue.prototype.$request = request;
    Vue.prototype.$$ = optionalChaining;
    Vue.prototype.$global = global;
};

Vue.use(install);
