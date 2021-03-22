// 与表格相关的搜索、分页mixin
let tableFilterMixin = {
    name: 'TableMixin',
    data: () => ({
        /**分页 */
        pagination: {
            total: 0,
            pageNum: 1,
            pageSize: 50
        }
    }),

    methods: {
        /**搜索 */
        handleSearch(row) {
            this.pagination.pageNum = 1;
            this.filterData = { ...row };
            this.getTableList();
        },
        /**重置 */
        handleReset(row) {
            this.pagination.pageNum = 1;
            this.pagination.pageSize = 50;
            this.filterData = { ...row };
            this.filterInfo.data = { ...row };
            this.getTableList();
        },
        /**刷新 */
        handleRefresh() {
            this.getTableList();
        },
        /**分页 */
        handleSizeChange(val) {
            this.pagination.pageSize = val;
            this.getTableList();
        },
        handleCurrentChange(val) {
            this.pagination.pageNum = val;
            this.getTableList();
        },
        // 更新表格字段
        updateColList(v) {
            this.tableInfo.columns = _.cloneDeep(v).filter((item) => item.checked);
            this.componentKey = !this.componentKey;
        }
    }
};

export default tableFilterMixin;
