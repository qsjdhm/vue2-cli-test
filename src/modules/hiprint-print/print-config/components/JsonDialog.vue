<template>
    <div>
        <el-dialog
            class="json_dialog"
            ref="JsonDialog"
            title="预览JSON"
            :visible.sync="isDialogShow"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <el-input
                type="textarea"
                :readonly="true"
                :autosize="{ minRows: 15 }"
                placeholder="请输入内容"
                v-model="infoTextarea"
            ></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button @click="saveJson">保 存</el-button>
                <el-button type="primary" v-clipboard:copy="infoTextarea">复 制</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
/**
 * @author zhangxinzhong<zhangxinzhong@vtstar.net>
 * @date 2021-03-10
 * @desc 打印配置-预览json
 */
import '@/vendor/hiprint1/css/hiprint.css';
import '@/vendor/hiprint1/css/print-lock.css';
import '@/vendor/hiprint1/css/print.css';
export default {
    name: 'EditClient',

    data() {
        return {
            // 数据提交开关
            loadingToggle: false,
            // 弹窗开关
            isDialogShow: false,
            infoTextarea: null,
            saveCode: null
        };
    },
    watch: {
        isDialogShow(v) {
            if (v) {
            }
        }
    },
    methods: {
        // 保存json
        saveJson() {
            window.localStorage.setItem(this.saveCode, this.infoTextarea);
            this.infoTextarea = null;
            this.saveCode = null;
            this.isDialogShow = false;
        },
        /**点击取消 */
        handleCancel() {
            this.infoTextarea = null;
            this.saveCode = null;
            this.isDialogShow = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    background-color: #d3dce6;
    color: #333;
    padding: 6px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    padding: 0;
}

.drag_item_box {
    height: 100%;
    padding: 6px;
}

.drag_item_box > div {
    height: 100%;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.drag_item_box > div > a {
    text-align: center;
    text-decoration-line: none;
}

.drag_item_box > div > a > span {
    font-size: 28px;
}

.drag_item_box > div > a > p {
    margin: 0;
}

.drag_item_title {
    font-size: 16px;
    padding: 12px 6px 0 6px;
    font-weight: bold;
}

.preview_dialog .el-dialog__body {
    padding: 0;
}

#params_content .container {
    width: 100% !important;
}

.params_drawer .el-drawer.rtl {
    overflow: auto;
}

.params_drawer .el-drawer__header {
    margin-bottom: 0;
}

.params_drawer {
    left: auto;
}

.hiprint-printTemplate {
    overflow-x: auto;
    margin-bottom: 80px;
}

.hiprint-printPaper {
    background-color: #fff;
}

.full_screen_dialog .el-dialog__header {
    padding: 0;
    margin: 0;
}

.full_screen_dialog .el-dialog__body {
    padding: 0;
}
</style>
