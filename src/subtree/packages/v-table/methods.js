const METHOD_NAMES = [
    'setCurrentRow',
    'toggleRowSelection',
    'toggleRowExpansion',
    'toggleAllSelection',
    'clearSelection',
    'clearFilter',
    'clearSort',
    'doLayout',
    'sort'
];

const methods = {};

METHOD_NAMES.forEach((name) => {
    methods[name] = function (...args) {
        const { VTable } = this.$refs;
        if (VTable && VTable[name]) {
            VTable[name](...args);
        }
    };
});

export default methods;
