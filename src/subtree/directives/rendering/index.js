const rendering = {};
rendering.install = function (Vue) {
    Vue.directive('rendering', async function (el, binding, vnode) {
        if (binding.value) {
            vnode.key = vnode.key || 1;
            vnode.key += 1;
        }
    });
};
export default rendering;
