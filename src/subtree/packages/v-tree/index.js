import VTree from './VTree.vue';

VTree.install = function (Vue) {
    Vue.component(VTree.name, VTree);
};

export { VTree };
