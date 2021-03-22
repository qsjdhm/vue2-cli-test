import Vue from 'vue';

// 功能组件
import { VIcon } from './v-icon/index';
import { VFilter } from './v-filter/index';
import { VDeploy } from './v-deploy/index';
import { VTree } from './v-tree/index';
import { VStatus } from './v-status/index';
import { VTable } from './v-table/index';
import { VForm } from './v-form/index';

// 布局组件
import { VViewBack } from './v-view-back/index';
import { VViewTitle } from './v-view-title/index';
import { VViewTable } from './v-view-table/index';

Vue.use(VIcon);
Vue.use(VFilter);
Vue.use(VDeploy);
Vue.use(VTree);
Vue.use(VStatus);
Vue.use(VTable);
Vue.use(VForm);

Vue.use(VViewBack);
Vue.use(VViewTitle);
Vue.use(VViewTable);
