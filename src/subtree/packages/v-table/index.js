import VTable from './VTable.vue';

VTable.install = function (Vue) {
    Vue.component(VTable.name, VTable);
};

export { VTable };
