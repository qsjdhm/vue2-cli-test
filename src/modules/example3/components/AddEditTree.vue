<template>
    <el-dialog
        v-el-drag-dialog
        :title="title"
        width="480px"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
    >
        <v-form
            :ref-obj.sync="treeFormInfo.ref"
            :data="treeFormInfo.data"
            :field-list="treeFormInfo.fieldList"
            :rules="treeFormInfo.rules"
            :list-type-info="treeFormInfo.listTypeInfo"
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
import { TreeFormInfo } from '../data/index';
export default {
    name: 'AddEditTree',
    props: {
        title: {
            type: String,
            default: '新增分类'
        },
        editInfo: {
            type: Object,
            default: () => {
                return {};
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
            treeFormInfo: { ...TreeFormInfo }
        };
    },
    watch: {
        editInfo: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.treeFormInfo.data = _.cloneDeep(this.editInfo);
                }
            },
            deep: true
        }
    },
    methods: {
        // 点击确定按钮
        handleConfirm() {
            this.treeFormInfo.ref.validate(async (valid) => {
                try {
                    if (valid) {
                        this.confirmLoading = true;
                        let params = _.cloneDeep(this.treeFormInfo.data);
                        let res = await this.$request({
                            url: this.title === '新增分类' ? '/api/category/add' : '/api/category',
                            method: this.title === '新增分类' ? 'post' : 'put',
                            params: params
                        });
                        this.$message.success(this.dialogTitle === '新增分类' ? '新增分类成功' : '编辑分类成功');
                        this.confirmLoading = false;
                        this.dialogVisible = false;
                        this.treeFormInfo.ref.resetFields();
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
            this.treeFormInfo.ref.resetFields();
        }
    }
};
</script>
