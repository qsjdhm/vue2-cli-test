<template>
    <div class="ChoseCodeRule">
        <el-dialog
            v-drag-dialog
            title="编码规则"
            width="600px"
            append-to-body
            :visible.sync="visible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <!-- 搜索区域 -->
            <vt-filter
                :data="filterInfo.data"
                :field-list="filterInfo.fieldList"
                @handleSearch="handleSearch"
                @handleReset="handleReset"
            />
            <!-- 表格区域 -->
            <div class="table-box">
                <vt-table-plus
                    ref="VtTablePlus"
                    :key="componentKey"
                    :data="tableInfo.data"
                    :columns="tableInfo.columns"
                    :loading="tableInfo.loading"
                    :pagination="pagination"
                    :choose-type="chooseType"
                    :select-data="selectData"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange"
                    @handleSelect="handleSelect"
                />
            </div>
            <span slot="footer">
                <el-button
                    size="mini"
                    @click="handleCancel"
                >
                    <vt-icon icon-class="icondanchuangquxiao_renwu-62" />
                    取消
                </el-button>
                <el-button
                    size="mini"
                    type="primary"
                    :loading="loadingToggle"
                    @click="handleConfirm"
                >
                    <vt-icon icon-class="icondanchuangdequeren_diannao" />
                    确定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
/**
 * @author 王才铭<wangcaiming@vtstar.net>
 * @date 2021-2-3
 * @desc 选择编码规则
 */
import LogicMixin from "@/plugins/mixins/logic";
import { filterInfo, tableInfo } from "./data";
export default {
    name: "ChoseToCodeRule",
    mixins: [LogicMixin],
    props: {
        // 弹窗开关
        visible: {
            type: Boolean,
            default: false
        },
        //选择的工单数据
        params: {
            type: Object,
            default: () => {
                return {
                    name: ''
                }
            },
        },
        // 选择类型 多选: checked 单选: radio
        chooseType: {
            type: String,
            default: "radio",
        },
        // 已选数据
        selectData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            /**
             * init
             */
            componentKey: true, // 组件key
            loadingToggle: false, // 数据提交开关
            /**
             * filter
             */
            filterInfo: { ...filterInfo },
            filterData: {},
            /**
             * table
             */
            tableInfo: { ...tableInfo },
            selectList: []
        };
    },
    watch: {
        visible(val) {
            this.componentKey = !this.componentKey
            if (val) {
                this.selectList = _.cloneDeep(this.selectData)
                this.getTableList();
            } else {
                this.filterData = _.cloneDeep({})
                this.tableInfo.loading = false
                this.tableInfo.data = _.cloneDeep([])
                this.pagination.total = 0
                this.selectList = _.cloneDeep([])
            }
        }
    },
    methods: {
        /**
         * table
         */
        async getTableList() {
            this.tableInfo.loading = true;
            try {
                let params = {
                    pageNum: this.pagination.pageNum,
                    pageSize: this.pagination.pageSize,
                    ...this.params,
                    ...this.filterData,
                    type: 1,
                }
                let res = await this.$service(
                    "GET",
                    this.$global.bus + "/api/rule/page",
                    params
                )
                this.tableInfo.data = _.cloneDeep(res.list)
                this.tableInfo.loading = false
                this.pagination.total = res.total
            } catch (error) {
                this.tableInfo.loading = false
                throw error
            }
        },
        // 表格选择
        handleSelect(data) {
            this.selectList = _.cloneDeep(data)
        },
        /**
         * Dialog
         */
        handleConfirm() {
            this.$emit("confirm", this.selectList)
            this.$emit('update:visible', false)
        },
        handleCancel() {
            this.$emit("cancel")
            this.$emit('update:visible', false)
        },
    },
};
</script>

<style lang="scss" scoped>
.table-box {
    height: 400px;
    .table-page {
        padding: 0;
    }
}
</style>
