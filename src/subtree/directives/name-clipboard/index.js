import nameClipboard from './name-clipboard';

const install = function (Vue) {
    Vue.directive('name-clipboard', nameClipboard);
};

if (window.Vue) {
    window['name-clipboard'] = nameClipboard;
    Vue.use(install); // eslint-disable-line
}

nameClipboard.install = install;
export default nameClipboard;
