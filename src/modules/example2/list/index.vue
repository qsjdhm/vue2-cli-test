<template>
    <div class="full-content">
        <div class="table-content">
            <!-- 搜索区域 -->
            <v-filter
                :data="filterInfo.data"
                :field-list="filterInfo.fieldList"
                :list-type-info="filterInfo.listTypeInfo"
                @handleSearch="handleSearch"
                @handleReset="handleReset"
            />
            <!-- 操作区域 -->
            <v-deploy @handleRefresh="handleRefresh">
                <template #option>
                    <el-button size="mini" icon="el-icon-plus" @click="handleAdd({}, 1)"> 新增</el-button>
                    <el-button size="mini" icon="el-icon-edit" @click="handleEdit({}, 1)"> 编辑</el-button>
                    <el-button size="mini" icon="el-icon-edit" :@click="handleStatus({ status: 0 })"> 启用</el-button>
                    <el-button size="mini" icon="el-icon-edit" @click="handleStatus({ status: 9 })"> 停用</el-button>
                    <el-button size="mini" icon="el-icon-delete" @click="handleDelete({}, 1)"> 删除</el-button>
                </template>
            </v-deploy>
            <!-- 表格区域 -->
            <v-table
                ref="VTable"
                :data="tableInfo.data"
                :columns="tableInfo.columns"
                :loading="tableInfo.loading"
                :pagination="pagination"
                @selection-change="selectionChange"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
            >
                <template #table-status="{ scope }">
                    <v-status :text="statusText(scope.row.status)" :color="statusColor(scope.row.status)" />
                </template>
                <template #table-operate="{ scope }">
                    <el-button size="mini" type="text" @click="handleView(scope.row)">查看</el-button>
                    <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </v-table>
        </div>

        <!-- 新增表格弹窗 -->
        <add-table ref="AddTable" :ctlTypeList="ctlTypeList" @handleConfirm="handleTableAddConfirm" />

        <!-- 编辑表格弹窗 -->
        <edit-table ref="EditTable" :edit-info="editInfo" :ctlTypeList="ctlTypeList" @handleConfirm="handleTableEditConfirm" />

        <!-- 查看表格弹窗 -->
        <view-table ref="ViewTable" :view-info="viewInfo" />
    </div>
</template>
<script>
import { FilterInfo, TableInfo } from '../data/index';
import tableFilterMixin from '@/subtree/mixins/table-filter';
import AddTable from '../components/AddTable';
import EditTable from '../components/EditTable';
import ViewTable from '../components/ViewTable';

export default {
    name: 'EquipmentLedger',
    // Mixin 混入了与表格相关的搜索, 重置, 刷新, 分页功能
    mixins: [tableFilterMixin],
    components: {
        AddTable,
        EditTable,
        ViewTable
    },
    data() {
        return {
            // 搜索相关
            filterInfo: _.cloneDeep(FilterInfo),
            filterData: {},
            // 表格相关
            selectData: [],
            selectRowList: [], // 选中的数据
            componentKey: true,
            tableInfo: _.cloneDeep(TableInfo),
            // 表单相关
            // 控制方式列表
            ctlTypeList: [],
            // 表格编辑所需数据
            editInfo: {},
            // 表格查看所需数据
            viewInfo: {}
        };
    },
    mounted() {
        // 获取控制方式列表
        this.getCtlType();
        // 获取地址列表
        this.getAddressList();
        // 获取故障类型
        this.getEquipTypeList();
        // 获取表格数据
        this.getTableList();
    },
    methods: {
        // 获取控制方式列表
        async getCtlType() {
            let res = await this.$request({
                url: '/v1/iot/sensor/ctltype/list',
                method: 'get',
                params: {}
            });
            let list = [];
            res.item.forEach((element) => {
                list.push({
                    id: element.id,
                    name: element.value
                });
            });
            this.ctlTypeList = _.cloneDeep(list);
        },
        // 获取地址列表
        async getAddressList() {
            let res = await this.$request({
                url: '/v1/asset/list/type/4',
                method: 'get',
                params: {}
            });
            this.filterInfo.listTypeInfo.addressList = _.cloneDeep(res.item);
        },
        // 获取设备类型
        getEquipTypeList() {
            this.filterInfo.listTypeInfo.equipTypeList = _.cloneDeep([
                { label: '加工机床', value: 1 },
                { label: 'CNC加工中心', value: 2 }
            ]);
        },
        // 获取表格数据
        async getTableList(val = {}, event) {
            this.tableInfo.loading = true;
            // 点击搜索，当前分页为一
            if (event === 'searchBtn') {
                this.tableInfo.pagination.pageNum = 1;
            }
            let params = {
                page: this.pagination.pageNum,
                size: this.pagination.pageSize,
                appType: 3,
                ...this.filterData,
                beginTime: this.filterData.date ? this.filterData.date[0] : null,
                endTime: this.filterData.date ? this.filterData.date[1] : null
            };
            try {
                let res = await this.$request({
                    url: this.tableInfo.url,
                    method: this.tableInfo.methods,
                    params: params
                });
                // 如果当前页是最后一页并且没有数据了，就请求上一页数据
                if (res.object.records.length === 0 && this.pagination.pageNum !== 1) {
                    this.tableConfig.pagination.page -= 1;
                    this.getTableList(val, event);
                } else {
                    this.tableInfo.data = _.cloneDeep(res.object.records);
                    this.pagination.total = res.object.total;
                    this.tableInfo.loading = false;
                }
            } catch (error) {
                this.tableInfo.loading = false;
            }
        },
        // 状态名称
        statusText(value) {
            if (value == '0') return '正常';
            if (value == '1') return '异常';
            if (!value) return '-';
        },
        // 状态颜色
        statusColor(value) {
            if (value == '0') return '#6196E8';
            if (value == '1') return '#F6BF38';
            if (value == '2') return '#F87269';
            if (value == '3') return '#66C56B';
            if (value == '4') return '#FEE105';
            if (value == '5') return '#24263F';
            if (!value) return '-';
        },
        /**
         * 按钮操作相关
         * */
        // 新增
        handleAdd() {
            this.$refs.AddTable.dialogVisible = true;
        },
        // 查看
        handleView(row) {
            this.viewInfo = _.cloneDeep(row);
            this.$refs.ViewTable.dialogVisible = true;
        },
        // 编辑
        handleEdit(row) {
            this.editInfo = _.cloneDeep(row);
            this.$refs.EditTable.dialogVisible = true;
        },
        // 删除
        handleDelete(row) {
            this.$confirm(`确定要删除名称为 ${row.name} 的灌溉设备么？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            })
                .then(async () => {
                    let res = await this.$request({
                        url: `/v1/iot/sensor/${row.id}`,
                        method: 'delete',
                        params: {}
                    });
                    this.$message.success('成功删除该灌溉设备');
                    this.getTableList(this.$refs.VtFilter.defaultData);
                })
                .catch(() => {});
        },
        // 启用、停用
        handleStatus(data) {
            // // console.log(data);
            // let query = {
            //     idList: [],
            //     status: data.status
            // };
            // this.selectRow.forEach((v) => {
            //     query.idList.push(v.id);
            // });
            // console.log(query);
            // this.$service('PUT', this.$global.bus + '/api/equipmentMaintenanceTool/status', query)
            //     .then(() => {
            //         this.$message({
            //             message: '状态修改成功！',
            //             type: 'success'
            //         });
            //         this.getTableList();
            //     })
            //     .catch(() => {
            //         this.$message({
            //             message: '状态修改失败！',
            //             type: 'warning'
            //         });
            //     });
        },
        // 表格选择变化触发
        selectionChange(data) {
            this.selectRowList = _.cloneDeep(data);
        },
        // 表格 新增 确认
        handleTableAddConfirm() {
            // 新增的数据基本都在第一页
            this.getTableList(this.$refs.VFilter.defaultData, 'searchBtn');
        },
        // 表格 编辑 确认
        handleTableEditConfirm() {
            // 编辑的数据基本都在当前页
            this.getTableList(this.$refs.VFilter.defaultData);
        }
    }
};
</script>
<style lang="scss" scoped>
// 整屏撑满
.full-content {
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 0;
    background: #f5f7fa;
}
// 表格区域
.table-content {
    background: #ffffff;
    flex: 1;
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
}
</style>
