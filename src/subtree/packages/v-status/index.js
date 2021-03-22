import VStatus from './VStatus';

VStatus.install = function (Vue) {
    Vue.component(VStatus.name, VStatus);
};

export { VStatus };
