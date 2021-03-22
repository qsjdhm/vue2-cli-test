import Vue from 'vue';
import permission from './permission'; // 页面按钮权限
import dragDialog from './el-drag-dialog'; // 弹框拖动
import waves from './waves'; // 按钮波纹效果
import clipboard from './clipboard'; // 剪切板
import realImg from './real-img'; // 图片加载
import rendering from './rendering'; // 解决页面的渲染
import sticky from './sticky';
import adaptive from './el-table/adaptive'; // 让表格有适应能力  @source 来源于vue-element-admin
import tip from './tip/index'; // tree显示不开时的tip
import formatTime from './format-time'; // 提示窗
import nameClipboard from './name-clipboard'; // 复制文本

Vue.use(permission);
Vue.use(dragDialog);
Vue.use(waves);
Vue.use(clipboard);
Vue.use(realImg);
Vue.use(rendering);
Vue.use(sticky);
Vue.use(adaptive);
Vue.use(tip);
Vue.use(formatTime);
Vue.use(nameClipboard);
