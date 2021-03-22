<template>
    <div>
        <el-dialog
            v-drag-dialog
            title="选择客商"
            width="1250px"
            append-to-body
            :visible.sync="visible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <div class="container">
                <div class="page">
                    <div
                        v-show="isShow"
                        class="left"
                    >
                        <div
                            v-show="isShow"
                            class="btn-show"
                            @click="isShow = false"
                        >
                            <span class="el-icon-arrow-up btn-close" />
                        </div>
                        <!-- <VtTreeNext
                            ref="treeRef"
                            draggable
                            :style="treeHeight"
                            :default-expanded-keys="[0]"
                            :top-level="['']"
                            :operate-list="[]"
                            :expand-on-click-node="false"
                            :props="{ id: 'id',label: 'name',children: 'children'}"
                            :tree-data="treeData"
                            @node-click="handleNodeClick"
                        /> -->
                        <div style="height: 100%;">
                            <div class="left-title">
                                <el-input
                                    v-model="filterText"
                                    placeholder="请输入搜索条件"
                                    suffix-icon="el-icon-search"
                                />
                            </div>
                            <!-- 左侧代码区 -->
                            <el-tree
                                ref="viewTree"
                                node-key="id"
                                :data="treeData"
                                :props="defaultProps"
                                :expand-on-click-node="false"
                                :filter-node-method="filterNode"
                                default-expand-all
                                highlight-current
                                style="height: 90%; width: 100%; padding-bottom: 30px;"
                                @node-click="handleNodeClick"
                            >
                                <span
                                    slot-scope="{ data }"
                                    class="custom-tree-node"
                                >
                                    <span
                                        :title="data.name"
                                        class="show-ellipsis text-style"
                                    >
                                        {{ data.name }}
                                    </span>
                                </span>
                            </el-tree>
                        </div>

                    </div>
                    <div class="right table-content">
                        <div
                            v-show="!isShow"
                            class="btn-hidden"
                            @click="isShow = true"
                        >
                            <span class="el-icon-arrow-up btn-open" />
                        </div>
                        <!-- 搜索区域 -->
                        <vt-filter
                            ref="filter"
                            :count="2"
                            :data="filterInfo.data"
                            :field-list="filterInfo.fieldList"
                            :list-type-info="listTypeInfo"
                            @handleSearch="handleSearch"
                            @handleReset="handleReset"
                        />
                        <!-- 表格区域 -->
                        <vt-table-plus
                            ref="VtTablePlus"
                            :data="tableInfo.data"
                            :columns="tableInfo.columns"
                            :loading="tableInfo.loading"
                            :pagination="pagination"
                            :choose-type="chooseType"
                            :select-data="selectData"
                            @handleSizeChange="handleSizeChange"
                            @handleCurrentChange="handleCurrentChange"
                            @handleSelect="handleSelect"
                        >
                            <template #table-status="{scope}">
                                <el-switch
                                    v-model="scope.row.status"
                                    :active-value="0"
                                    :inactive-value="9"
                                    disabled
                                />
                            </template>
                            <template #table-isForeign="{scope}">
                                <el-tag
                                    v-if="scope.row.isForeign"
                                    type="success"
                                >是</el-tag>
                                <el-tag
                                    v-if="scope.row.isForeign === false"
                                    type="info"
                                >否</el-tag>
                                <span v-if="scope.row.isForeign === null">-</span>
                            </template>
                        </vt-table-plus>
                    </div>
                </div>
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
 * @date 2021-02-20
 * @desc 选择设备弹框
 */
import LogicMixin from "@/plugins/mixins/logic";
import { filterInfo, tableInfo } from "./data";

export default {
    name: "ChoseToEquip",
    mixins: [LogicMixin],
    props: {
        // 弹窗开关
        visible: {
            type: Boolean,
            default: false,
        },
        // 选择类型 多选: checked 单选: radio
        chooseType: {
            type: String,
            default: "radio",
        },
        // 已选数据
        selectData: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            /**
             * init
             */
            loadingToggle: false, // 数据提交开关
            isShow: true,
            /**
             * tree
             */
            treeData: [{ id: 0, name: "所有客商", children: [] }],
            filterText: null, // 树搜索关键字
            businessTypeId: 0, // 当前选中树id
            treeType: null, // 当前选中树type
            defaultProps: { id: "id", label: "name", children: "children" }, // 树组件配置项
            /**
             * filter
             */
            filterInfo: { ...filterInfo },
            filterData: {},
            listTypeInfo: {
                // 搜索列表
                statusList: [],
                foreginList: [
                    { id: true, name: "是" },
                    { id: false, name: "否" },
                ],
            },
            /**
             * table
             */
            tableInfo: { ...tableInfo },
            selectList: [],
        };
    },
    watch: {
        filterText(val) {
            this.$refs.viewTree.filter(val);
        },
        visible(val) {
            if (val) {
                this.selectList = _.cloneDeep(this.selectData);
                this.getStatusList();
                this.getDeviceTypeTree();
            } else {
                this.filterData = _.cloneDeep({});
                this.tableInfo.loading = false;
                this.tableInfo.data = _.cloneDeep([]);
                this.pagination.total = 0;
                this.selectList = _.cloneDeep([]);
            }
        },
    },
    methods: {
        /**
         * table
         */
        async getTableList() {
            try {
                let params = {
                    pageNum: this.pagination.pageNum,
                    pageSize: this.pagination.pageSize,
                    categoryId: this.businessTypeId
                        ? this.businessTypeId
                        : null,
                    ...this.filterData,
                    status: 0,
                };
                let res = await this.$service(
                    "GET",
                    this.$global.bus + "/api/supplier/page",
                    params
                );
                this.pagination.total = res.total;
                this.tableInfo.data = _.cloneDeep(
                    res.list.filter((item) => item.useStatus !== 9)
                );
                this.tableInfo.loading = false;
            } catch (error) {
                this.tableInfo.loading = false;
                throw error;
            }
        },
        // 表格选择
        handleSelect(data) {
            this.selectList = _.cloneDeep(data);
        },

        /**
         * tree
         */
        // 获取设备分类树
        async getDeviceTypeTree() {
            try {
                let query = { type: 14 };
                let res = await this.$service(
                    "POST",
                    this.$global.bus + "/api/category/listIsUsed",
                    query
                );
                this.treeData[0].children = _.cloneDeep(res);
                this.$nextTick(() => {
                    this.$refs.viewTree.setCurrentKey(this.treeData[0].id);
                    this.getTableList();
                });
            } catch (error) {
                throw error;
            }
        },
        // 树组件点击
        handleNodeClick(data) {
            console.log(data);
            this.businessTypeId = data.id;
            this.getTableList();
        },
        // 树组件数据过滤
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        /**
         * other
         */
        // 获取状态列表
        async getStatusList() {
            try {
                let query = { type: 5 },
                    res = await this.$service(
                        "POST",
                        this.$global.bus + "/api/base/enum/{type}",
                        query
                    );
                this.listTypeInfo.statusList = res.status.map((item) => {
                    return {
                        id: item.id,
                        name: item.desc,
                    };
                });
            } catch (error) {
                throw error;
            }
        },
        /**
         * Dialog
         */
        handleConfirm() {
            this.$emit("confirm", this.selectList);
            this.$emit("update:visible", false);
        },
        handleCancel() {
            this.$emit("cancel");
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/clientTree.scss";
/deep/ .semicircle {
    z-index: 999;
}
/deep/ .table-page {
    padding-top: 20px;
}
.container {
    height: 500px;
    overflow: hidden;
}
/deep/ .el-table__body tr.current-row > td {
    // width: 0px;
    // padding: 0;
    background: #38adff !important;
    color: #ffffff !important;
}
</style>
