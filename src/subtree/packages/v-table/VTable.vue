<template>
    <div ref="tableBox" class="table-page">
        <el-table
            ref="VTable"
            v-loading="loading"
            v-bind="setTableAttr()"
            row-key="id"
            style="flex: 1"
            :class="columns.findIndex((item) => item.type === 'column') >= 0 ? 'el-table-hisColumn' : ''"
            :data="tableData"
            :height="tableHeight"
            :span-method="SpanMethod"
            v-on="$listeners"
            @cell-mouse-enter="cellMouseEnter"
            @select="handleSelect"
            @select-all="handleSelectAll"
            @sort-change="handleSort"
        >
            <!-- 多选 -->
            <template v-if="chooseType === 'checked'">
                <el-table-column type="selection" width="43" align="center" />
            </template>
            <!-- 单选 -->
            <template v-else-if="chooseType === 'radio'">
                <el-table-column width="34">
                    <template slot-scope="scope">
                        <el-radio v-model="radioId" :label="scope.row.id" @change.native="handleRadio(scope.row)" />
                    </template>
                </el-table-column>
            </template>
            <!-- 序号 -->
            <template v-if="!hideConfig.includes('serial')">
                <el-table-column type="index" align="center" width="55" label="序号" />
            </template>
            <template v-for="(item, index) in columns">
                <!-- 插槽 -->
                <template v-if="item.type === 'slot'">
                    <el-table-column :key="index" v-bind="item" min-width="120px" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <slot :name="'table-' + item.prop" :scope="scope" />
                        </template>
                    </el-table-column>
                </template>
                <!-- moment 时间格式 -->
                <template v-else-if="item.type === 'date'">
                    <el-table-column :key="index" :formatter="item.formatter" v-bind="item" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row[item.prop] ? $moment(scope.row[item.prop]).format(item.format || 'YYYY-MM-DD') : '-' }}
                        </template>
                    </el-table-column>
                </template>
                <!-- 自定义格式化数据 -->
                <template v-else-if="item.type === 'formatter'">
                    <el-table-column :key="index" :formatter="item.formatter" v-bind="item" show-overflow-tooltip />
                </template>
                <!-- 二级表头 -->
                <template v-else-if="item.type === 'column'">
                    <el-table-column :key="index" :label="item.label" v-bind="item" min-width="120px">
                        <template v-if="item.column && item.column.length > 0">
                            <template v-for="(it, i) in item.column">
                                <el-table-column
                                    v-if="it.type === 'formatter'"
                                    :key="index + '-' + i"
                                    :formatter="it.formatter"
                                    v-bind="it"
                                    show-overflow-tooltip
                                />
                                <el-table-column
                                    v-else
                                    :key="index + '-' + i"
                                    :prop="it.prop"
                                    :label="it.label"
                                    :class-name="split.length > 0 && split.includes(it.prop) ? 'split-column' : ''"
                                    min-width="60px"
                                    v-bind="it"
                                >
                                    <template slot-scope="scope">
                                        <template v-if="split.length > 0 && split.includes(it.prop)">
                                            <template v-if="scope.row[it.prop] && scope.row[it.prop].length > 0">
                                                <div class="split-list">
                                                    <template v-for="(_it, j) in scope.row[it.prop]">
                                                        <div :key="j" class="split-item">
                                                            <span v-if="_it === 0">0</span>
                                                            <span v-else>
                                                                {{ _it !== null && _it !== undefined ? _it : '-' }}
                                                            </span>
                                                        </div>
                                                    </template>
                                                </div>
                                            </template>
                                        </template>
                                        <template v-else>
                                            <span v-if="scope.row[it.prop] === 0">0</span>
                                            <span v-else>
                                                {{
                                                    scope.row[it.prop] !== null && scope.row[it.prop] !== undefined
                                                        ? scope.row[it.prop]
                                                        : '-'
                                                }}
                                            </span>
                                        </template>
                                    </template>
                                </el-table-column>
                            </template>
                        </template>
                    </el-table-column>
                </template>
                <!-- 普通列 -->
                <template v-else>
                    <el-table-column
                        :key="index"
                        :class-name="split.length > 0 && split.includes(item.prop) ? 'split-column' : ''"
                        v-bind="item"
                        min-width="120px"
                        show-overflow-tooltip
                    >
                        <template slot-scope="scope">
                            <template v-if="split.length > 0 && split.includes(item.prop)">
                                <template v-if="scope.row[item.prop] && scope.row[item.prop].length > 0">
                                    <div class="split-list">
                                        <template v-for="(it, i) in scope.row[item.prop]">
                                            <div :key="i" class="split-item">
                                                <span v-if="it === 0">0</span>
                                                <span v-else>
                                                    {{ it !== null && it !== undefined ? it : '-' }}
                                                </span>
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </template>
                            <template v-else>
                                <span v-if="scope.row[item.prop] === 0">0</span>
                                <span
                                    v-else
                                    v-name-clipboard="{
                                        value: scope.row[item.prop],
                                        isCopy: item.isCopy
                                    }"
                                    style="
                                        width: 100%;
                                        display: inline-block;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        vertical-align: middle;
                                    "
                                >
                                    {{ scope.row[item.prop] !== null && scope.row[item.prop] !== undefined ? scope.row[item.prop] : '-' }}
                                </span>

                                <!-- <div
                                    v-else
                                    style="width: 100%;display: flex;"
                                >
                                    <span style="width:95%;display:inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                        {{ scope.row[item.prop] !== null && scope.row[item.prop] !== undefined ? scope.row[item.prop] : '-' }}
                                    </span>
                                    <span v-if="item.isCopy"><i class="iconfont iconfuzhi"></i></span>
                                </div> -->
                            </template>
                        </template>
                    </el-table-column>
                </template>
            </template>
            <!-- 操作列 -->
            <template>
                <slot name="table-operate" />
            </template>
            <div slot="append">
                <slot name="append" />
            </div>
        </el-table>
        <!-- 分页与反选 -->
        <div ref="paginationBox" :class="!hideConfig.includes('pagination') ? 'pagination-style' : ''">
            <!-- 反选 -->
            <template v-if="chooseType === 'checked' && !hideConfig.includes('invert')">
                <div>
                    <span class="reverse-left">
                        <el-checkbox v-model="reverseChecked" @change="invertSelect">反选</el-checkbox>
                    </span>
                </div>
            </template>
            <template v-else>
                <div class="reverse-left" />
            </template>
            <!-- 分页 -->
            <el-pagination
                v-if="!hideConfig.includes('pagination')"
                v-bind="setPaginationAttr()"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>
<script>
import methods from './methods';
export default {
    name: 'VTable',
    props: {
        // 表格数据
        data: {
            type: Array,
            default: () => []
        },
        // 表头数据
        columns: {
            type: Array,
            default: () => []
        },
        // 选择类型，有效值 checked: 多选, radio: 单选, none: 没有选择列,
        chooseType: {
            type: String,
            default: 'checked'
        },
        // 表格加载动画开关
        loading: {
            type: Boolean,
            default: false
        },
        // 分页
        pagination: {
            type: Object,
            default: () => ({})
        },
        // 隐藏配置项，用于隐藏部分功能 可用值['pagination', 'invert', 'serial'] 默认隐藏序号列
        hideConfig: {
            type: Array,
            default: () => ['serial']
        },
        // 合并单元格
        merge: {
            type: Array,
            default: () => []
        },
        // 拆分单元格
        split: {
            type: Array,
            default: () => []
        },
        // 回显数据
        selectData: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        tableData: [], // 表格数据承接
        tableHeight: null, // 表格高度
        radioId: '',
        checkedIds: [],
        selectList: [], // 多选选中数据
        reverseChecked: false, // 反选
        /**
         * 合并单元格
         */
        mergeSpan: {},
        mergeValue: {}
    }),
    watch: {
        data(val) {
            if (this.selectData && this.selectData[0] && this.selectData[0].id) {
                this.selectList = _.cloneDeep(this.selectData);
                if (this.chooseType == 'radio') {
                    if (this.selectData && this.selectData.length > 0) {
                        this.radioId = this.selectData[0].id;
                    }
                } else if (this.chooseType == 'checked') {
                    if (this.selectData && this.selectData.length > 0) {
                        this.selectData.forEach((item) => {
                            if (!this.checkedIds.includes(item.id)) {
                                this.checkedIds.push(item.id);
                            }
                        });
                    }
                }
            } else {
                this.selectList = _.cloneDeep([]);
                this.checkedIds = _.cloneDeep([]);
                this.radioId = '';
            }
            if (val && val.length > 0) {
                let _index = {};
                this.merge.forEach((it) => {
                    this.mergeSpan[it] = [];
                    this.mergeValue[it] = [];
                    _index[it] = 0;
                });
                this.data.forEach((item) => {
                    this.merge.forEach((it) => {
                        let length = this.mergeValue[it].length,
                            last = length - 1;
                        if (length > 0) {
                            if (this.mergeValue[it][last] === item[it]) {
                                this.mergeSpan[it][_index[it]]++;
                                this.mergeSpan[it].push(0);
                            } else {
                                this.mergeValue[it].push(item[it]);
                                this.mergeSpan[it].push(1);
                                _index[it] = this.mergeSpan[it].length - 1;
                            }
                        } else {
                            this.mergeValue[it].push(item[it]);
                            this.mergeSpan[it].push(1);
                        }
                    });
                });
                this.tableData = this.data;
            } else {
                this.tableData = _.cloneDeep([]);
                this.mergeSpan = {};
                this.mergeValue = {};
            }
        },
        tableData(data) {
            if (data && data.length > 0) {
                this.$nextTick(() => {
                    if (this.chooseType == 'radio') {
                        data.forEach((item) => {
                            if (item.id == this.radioId) {
                                this.radioId = this.radioId;
                            }
                        });
                    } else if (this.chooseType == 'checked') {
                        data.forEach((item) => {
                            if (this.checkedIds.includes(item.id)) {
                                this.$refs.VTable.toggleRowSelection(item, true);
                            }
                        });
                    }
                });
            }
        },
        radioId(val) {
            // console.log('radioId', val)
        },
        checkedIds(val) {
            // console.log('checkedIds', val)
        }
    },
    mounted() {
        if (this.data && this.data.length > 0) {
            if (this.selectData && this.selectData[0] && this.selectData[0].id) {
                this.selectList = _.cloneDeep(this.selectData);
                if (this.chooseType == 'radio') {
                    if (this.selectData && this.selectData.length > 0) {
                        this.radioId = this.selectData[0].id;
                    }
                } else if (this.chooseType == 'checked') {
                    if (this.selectData && this.selectData.length > 0) {
                        this.selectData.forEach((item) => {
                            this.checkedIds.push(item.id);
                        });
                    }
                }
            } else {
                this.selectList = _.cloneDeep([]);
                this.checkedIds = _.cloneDeep([]);
                this.radioId = '';
            }
            if (this.data && this.data.length > 0) {
                let _index = {};
                this.merge.forEach((it) => {
                    this.mergeSpan[it] = [];
                    this.mergeValue[it] = [];
                    _index[it] = 0;
                });
                this.data.forEach((item) => {
                    this.merge.forEach((it) => {
                        let length = this.mergeValue[it].length,
                            last = length - 1;
                        if (length > 0) {
                            if (this.mergeValue[it][last] === item[it]) {
                                this.mergeSpan[it][_index[it]]++;
                                this.mergeSpan[it].push(0);
                            } else {
                                this.mergeValue[it].push(item[it]);
                                this.mergeSpan[it].push(1);
                                _index[it] = this.mergeSpan[it].length - 1;
                            }
                        } else {
                            this.mergeValue[it].push(item[it]);
                            this.mergeSpan[it].push(1);
                        }
                    });
                });
                this.tableData = this.data;
            } else {
                this.tableData = _.cloneDeep([]);
                this.mergeSpan = {};
                this.mergeValue = {};
            }
        }
        this.$nextTick(() => {
            this.tableHeight = (this.$refs.tableBox?.offsetHeight || 0) - (this.$refs.paginationBox?.offsetHeight || 0);
        });
    },
    methods: {
        ...methods,
        /**表格默认配置项 */
        setTableAttr() {
            let defaultAttr = {
                'highlight-current-row': true,
                stripe: true,
                border: true,
                'max-height': 3000
            };
            let attr = { ...defaultAttr, ...this.$attrs };
            return attr;
        },

        // 多选
        handleSelect(select) {
            this.checkedIds = select.map((item) => item.id);
            this.selectList = _.cloneDeep(select);
            this.$emit('handleSelect', select);
        },
        // 全选
        handleSelectAll(select) {
            this.checkedIds = select.map((item) => item.id);
            this.selectList = _.cloneDeep(select);
            this.$emit('handleSelect', select);
        },
        // 单选
        handleRadio(select) {
            this.selectList = _.cloneDeep([select]);
            this.$emit('handleSelect', [select]);
        },
        // 反选触发
        invertSelect() {
            let select = [];
            this.tableData.forEach((item) => {
                if (this.selectList.findIndex((it) => it.id === item.id) < 0) {
                    select.push(item);
                    // 设置选中
                    this.$refs.VTable.toggleRowSelection(item, true);
                } else {
                    this.$refs.VTable.toggleRowSelection(item, false);
                }
            });
            this.checkedIds = select.map((item) => item.id);
            this.selectList = _.cloneDeep(select);
            this.$emit('handleSelect', select);
        },
        // 表格排序发生变化
        handleSort(row) {
            this.$emit('handleSort', row);
            // this.radioId = null;
        },
        // 当单元格 hover 进入时会触发该事件
        cellMouseEnter(row, column, cell, event) {
            // console.log(row, column, cell, event);
        },
        /**
         * 分页
         */
        // 分页配置
        setPaginationAttr() {
            let defaultAttr = {
                background: true,
                'page-sizes': [50, 100, 200, 500],
                layout: 'total, sizes, prev, pager, next',
                'current-page': 1,
                'page-size': 50,
                total: 0
            };
            let attr = Object.assign({}, defaultAttr, this.pagination);
            // 判断是否需要分页数量控件
            if (this.pagination.hasOwnProperty('pageSizesVisible')) {
                if (!this.pagination.pageSizesVisible) {
                    attr.layout = 'prev, pager, next';
                }
            }
            return attr;
        },
        // 当前页数据条数发生变化
        handleSizeChange(val) {
            this.$emit('handleSizeChange', val);
        },
        // 当前页发生变化
        handleCurrentChange(val) {
            this.$emit('handleCurrentChange', val);
        },

        /**
         * 合并单元格
         */
        SpanMethod({ column, rowIndex }) {
            let rowspan = 1,
                colspan = 1;
            if (this.merge && this.merge.length > 0) {
                if (this.merge.includes(column.property)) {
                    rowspan = this.mergeSpan[column.property][rowIndex];
                    if (rowspan >= 1) {
                        colspan = 1;
                    } else {
                        colspan = 0;
                    }
                }
            }
            return {
                rowspan,
                colspan
            };
        }
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-table__header {
    table-layout: auto !important;
}
::v-deep .el-table--border::after {
    width: 0;
}
::v-deep .el-table--group,
::v-deep .el-table--border {
    border: 0;
}
::v-deep .el-table--border td:nth-child(1) {
    border-left: 1px solid #dfe6ec;
}

.table-page {
    flex: 1;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    overflow: hidden;
    // todo
    padding: 10px 10px 0 10px;
}
.pagination-style {
    display: flex;
    justify-content: space-between;
    text-align: right;
    //padding: 10px 0;
    padding-top: 10px;
    padding-left: 14px;
    ::v-deep .el-input--mini .el-input__inner {
        height: 30px;
        line-height: 30px;
    }
}
::v-deep .el-table.el-table-hisColumn .el-table__header-wrapper {
    height: auto !important;
}

// 滚动条的宽度
::v-deep ::-webkit-scrollbar {
    width: 6px; // 横向滚动条
    height: 6px; // 纵向滚动条 必写
}
// 滚动条的滑块
::v-deep ::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
}
::v-deep .el-table {
    tr {
        td.split-column {
            vertical-align: top;

            .cell {
                padding: 0;

                .split-list {
                    height: 100%;

                    .split-item {
                        height: 33px;
                        padding: 5px 10px;
                        border-bottom: 1px solid #ebeef5;
                    }
                    .split-item:last-child {
                        border-bottom: 0;
                    }
                }
            }
        }
    }
}
// /deep/ .el-tooltip {
//     display: flex;
// }
</style>
