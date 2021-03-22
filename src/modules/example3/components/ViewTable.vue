<template>
    <el-dialog
        v-el-drag-dialog
        title="查看基础信息"
        width="800px"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
    >
        <v-view-title title="基础信息" prefix-sign="icon" />
        <v-view-table
            :data="viewTableInfo.data"
            :columns="viewTableInfo.columns"
            format-time="YYYY-MM-DD HH:mm:ss"
            :num="2"
            style="margin-bottom: 10px"
        >
        </v-view-table>
        <span slot="footer">
            <el-button size="mini" icon="el-icon-circle-close" @click="handleCancel">返回</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { ViewTableInfo } from '../data/index.js';

export default {
    name: 'ViewTable',
    props: {
        viewInfo: {
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
            // 表单数据
            viewTableInfo: { ...ViewTableInfo }
        };
    },
    watch: {
        viewInfo: {
            handler(newVal, oldVal) {
                this.viewTableInfo.data = _.cloneDeep(newVal);
            }
        }
    },
    methods: {
        // 点击取消按钮
        handleCancel() {
            this.dialogVisible = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.className {
    width: 100% !important;
}
</style>
