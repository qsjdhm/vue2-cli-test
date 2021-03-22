<template>
    <div>
        <el-dialog
            class="preview_dialog"
            ref="previewDialog"
            title="快速预览"
            @opened="handlePreviewOpened(printData)"
            :width="currentPaper.width * 1 + 'mm'"
            :visible.sync="isDialogShow"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <div id="preview_content"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <!-- <el-button
                    type="primary"
                    @click="isDialogShow = false"
                >确 定</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
/**
 * @author zhangxinzhong<zhangxinzhong@vtstar.net>
 * @date 2021-03-10
 * @desc 打印配置-预览
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
            currentPaper: {
                width: null,
                height: null
            },
            hiprintTemplate: null,
            printData: null
        };
    },
    watch: {
        isDialogShow(v) {
            if (v) {
            }
        }
    },
    methods: {
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 10:45:49
         * @Desc: 打开预览dialog回调
         */
        handlePreviewOpened(printData) {
            $('#preview_content').html(this.hiprintTemplate.getHtml(printData));
        },
        /**点击取消 */
        handleCancel() {
            this.hiprintTemplate = null;
            this.printData = null;
            this.currentPaper = {
                width: null,
                height: null
            };
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
