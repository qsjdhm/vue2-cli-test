<template>
    <el-dialog
        v-el-drag-dialog
        title="新增灌溉设备传感器"
        width="800px"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
    >
        <v-form
            :count="2"
            :ref-obj.sync="addTableInfo.ref"
            :data="addTableInfo.data"
            :field-list="addTableInfo.fieldList"
            :rules="addTableInfo.rules"
            :list-type-info="addTableInfo.listTypeInfo"
        />
        <span slot="footer">
            <el-button size="mini" icon="el-icon-circle-close" @click="handleCancel">取消</el-button>
            <el-button size="mini" icon="el-icon-circle-check" type="primary" :loading="confirmLoading" @click="handleConfirm"
                >确定</el-button
            >
        </span>
    </el-dialog>
</template>
<script>
import { AddTableInfo } from '../data/index.js';

export default {
    name: 'AddTable',
    props: {
        ctlTypeList: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            // 弹窗开关
            dialogVisible: false,
            // 数据提交开关标识
            confirmLoading: false,
            // 表单数据
            addTableInfo: { ...AddTableInfo }
        };
    },
    watch: {
        ctlTypeList: {
            handler(newVal, oldVal) {
                this.addTableInfo.listTypeInfo.ctlTypeList = _.cloneDeep(newVal);
            }
        }
    },
    methods: {
        formChange(obj) {
            if (obj.label === 'ctlType') {
                this.ctlTypeList.forEach((item) => {
                    if (item.id === obj.value) {
                        this.addTableInfo.data.ctlValue = item.name;
                    }
                });
            }
        },
        // 点击确定按钮
        handleConfirm() {
            this.addTableInfo.ref.validate(async (valid) => {
                try {
                    if (valid) {
                        this.confirmLoading = true;
                        let params = _.cloneDeep(this.addTableInfo.data);
                        let res = await this.$request({
                            url: '/v1/iot/sensor/',
                            method: 'POST',
                            params: params
                        });
                        this.$message.success('新增灌溉设备成功');
                        this.confirmLoading = false;
                        this.dialogVisible = false;
                        this.addTableInfo.ref.resetFields();
                        this.$emit('handleConfirm');
                    }
                } catch (error) {
                    this.confirmLoading = false;
                }
            });
        },
        // 点击取消按钮
        handleCancel() {
            this.dialogVisible = false;
            this.addTableInfo.ref.resetFields();
        }
    }
};
</script>

<style lang="scss" scoped>
.className {
    width: 100% !important;
}
</style>
