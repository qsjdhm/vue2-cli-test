const METHOD_NAMES = [
    'filter',
    'updateKeyChildren',
    'getCheckedNodes',
    'setCheckedNodes',
    'getCheckedKeys',
    'setCheckedKeys',
    'setChecked',
    'getHalfCheckedNodes',
    'getHalfCheckedKeys',
    'getCurrentKey',
    'getCurrentNode',
    'setCurrentKey',
    'setCurrentNode',
    'getNode',
    'remove',
    'append',
    'insertBefore',
    'insertAfter'
];

const methods = {};

METHOD_NAMES.forEach((name) => {
    methods[name] = function (...args) {
        const { ElTreeRef } = this.$refs;
        if (ElTreeRef && ElTreeRef[name]) {
            let result = ElTreeRef[name](...args);
            if (result) {
                return result;
            }
        }
    };
});
export default methods;
