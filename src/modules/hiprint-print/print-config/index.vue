<template>
    <div class="print_template_container full-content">
        <el-container
            class="print_template_main"
            style="height: 100vh;"
        >
            <el-aside width="240px">
                <el-row>
                    <el-col
                        :span="24"
                        class="rect-printElement-types hiprintEpContainer"
                    >
                        <el-row class="drag_item_title">拖拽组件列表</el-row>
                        <el-row>
                            <el-col
                                :span="12"
                                class="drag_item_box"
                                v-for="(item,index) in queryData.data"
                                :key="index"
                            >
                                <div>
                                    <!-- tid="configModule.name" -->
                                    <a
                                        class="ep-draggable-item"
                                        :tid="item.tid"
                                        style
                                    >
                                        <span
                                            class="glyphicon glyphicon-text-width"
                                            aria-hidden="true"
                                        ></span>
                                        <p class="glyphicon-class">{{item.title}}</p>
                                    </a>
                                </div>
                            </el-col>

                        </el-row>
                        <!-- <el-row>
                            <el-col
                                :span="12"
                                class="drag_item_box"
                            >
                                <div>
                                    <a
                                        class="ep-draggable-item"
                                        tid="configModule.name"
                                        style
                                    >
                                        <span
                                            class="glyphicon glyphicon-text-width"
                                            aria-hidden="true"
                                        ></span>
                                        <p class="glyphicon-class">姓名</p>
                                    </a>
                                </div>
                            </el-col>
                            <el-col
                                :span="12"
                                class="drag_item_box"
                                tid="configModule.text"
                            >
                                <div>
                                    <a
                                        class="ep-draggable-item"
                                        tid="configModule.image"
                                        style
                                    >
                                        <span
                                            class="glyphicon glyphicon-picture"
                                            aria-hidden="true"
                                        ></span>
                                        <p class="glyphicon-class">图片</p>
                                    </a>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col
                                :span="12"
                                class="drag_item_box"
                                tid="configModule.text"
                            >
                                <div>
                                    <a
                                        class="ep-draggable-item"
                                        tid="configModule.longText"
                                    >
                                        <span
                                            class="glyphicon glyphicon-subscript"
                                            aria-hidden="true"
                                        ></span>
                                        <p class="glyphicon-class">长文</p>
                                    </a>
                                </div>
                            </el-col>
                            <el-col
                                :span="12"
                                class="drag_item_box"
                                tid="configModule.text"
                            >
                                <div>
                                    <a
                                        class="ep-draggable-item"
                                        tid="configModule.tableCustom"
                                        style
                                    >
                                        <span
                                            class="glyphicon glyphicon-th"
                                            aria-hidden="true"
                                        ></span>
                                        <p class="glyphicon-class">表格</p>
                                    </a>
                                </div>
                            </el-col>
                        </el-row> -->
                        <!-- <el-row>
                            <el-col
                                :span="12"
                                class="drag_item_box"
                                tid="configModule.qrcode"
                            >
                                <div>
                                    <a
                                        class="ep-draggable-item"
                                        tid="configModule.qrcode"
                                    >
                                        <span
                                            class="glyphicon glyphicon-qrcode"
                                            aria-hidden="true"
                                        ></span>
                                        <p class="glyphicon-class">二维码</p>
                                    </a>
                                </div>
                            </el-col>
                        </el-row> -->
                        <el-row class="drag_item_title">辅助</el-row>
                        <el-row>
                            <el-col
                                :span="12"
                                class="drag_item_box"
                                v-for="(item,index) in auxiliaryData"
                                :key="index"
                            >
                                <div>
                                    <!-- tid="configModule.name" -->
                                    <a
                                        class="ep-draggable-item"
                                        :tid="item.tid"
                                        style
                                    >
                                        <span
                                            class="glyphicon glyphicon-text-width"
                                            aria-hidden="true"
                                        ></span>
                                        <p class="glyphicon-class">{{item.title}}</p>
                                    </a>
                                </div>
                            </el-col>

                        </el-row>
                        <!-- <el-row>
                            <el-col
                                :span="12"
                                class="drag_item_box"
                                tid="configModule.text"
                            >
                                <div>
                                    <a
                                        class="ep-draggable-item"
                                        tid="configModule.hline"
                                        style
                                    >
                                        <span
                                            class="glyphicon glyphicon-resize-horizontal"
                                            aria-hidden="true"
                                        ></span>
                                        <p class="glyphicon-class">横线</p>
                                    </a>
                                </div>
                            </el-col>
                            <el-col
                                :span="12"
                                class="drag_item_box"
                                tid="configModule.text"
                            >
                                <div>
                                    <a
                                        class="ep-draggable-item"
                                        tid="configModule.vline"
                                        style
                                    >
                                        <span
                                            class="glyphicon glyphicon-resize-vertical"
                                            aria-hidden="true"
                                        ></span>
                                        <p class="glyphicon-class">竖线</p>
                                    </a>
                                </div>
                            </el-col>
                        </el-row> -->
                        <!-- <el-row>
                            <el-col
                                :span="12"
                                class="drag_item_box"
                                tid="configModule.text"
                            >
                                <div>
                                    <a
                                        class="ep-draggable-item"
                                        tid="configModule.rect"
                                    >
                                        <span
                                            class="glyphicon glyphicon-unchecked"
                                            aria-hidden="true"
                                        ></span>
                                        <p class="glyphicon-class">矩形</p>
                                    </a>
                                </div>
                            </el-col>
                            <el-col
                                :span="12"
                                class="drag_item_box"
                                tid="configModule.text"
                            >
                                <div>
                                    <a
                                        class="ep-draggable-item"
                                        tid="configModule.oval"
                                    >
                                        <span
                                            class="glyphicon glyphicon-record"
                                            aria-hidden="true"
                                        ></span>
                                        <p class="glyphicon-class">椭圆</p>
                                    </a>
                                </div>
                            </el-col>
                        </el-row> -->
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-header>
                    <el-row style="height: 100%">
                        <el-col
                            :span="24"
                            style="height: 100%"
                        >
                            <el-button-group>
                                <el-button
                                    :type="currentPaperType === 'A3' ? 'primary' : 'info'"
                                    @click="setPaper('A3')"
                                >A3</el-button>
                                <el-button
                                    :type="currentPaperType === 'A4' ? 'primary' : 'info'"
                                    @click="setPaper('A4')"
                                >A4</el-button>
                                <el-button
                                    :type="currentPaperType === 'A5' ? 'primary' : 'info'"
                                    @click="setPaper('A5')"
                                >A5</el-button>
                                <el-button
                                    :type="currentPaperType === 'B3' ? 'primary' : 'info'"
                                    @click="setPaper('B3')"
                                >B3</el-button>
                                <el-button
                                    :type="currentPaperType === 'B4' ? 'primary' : 'info'"
                                    @click="setPaper('B4')"
                                >B4</el-button>
                                <el-button
                                    :type="currentPaperType === 'B5' ? 'primary' : 'info'"
                                    @click="setPaper('B5')"
                                >B5</el-button>
                            </el-button-group>
                            <el-popover
                                placement="bottom"
                                title="请输入自定义纸张宽高"
                                trigger="click"
                            >
                                <el-form
                                    ref="otherPaperForm"
                                    label-position="left"
                                    :model="otherPaper"
                                    label-width="30px"
                                >
                                    <el-row>
                                        <el-col :span="16">
                                            <el-form-item label="宽">
                                                <el-input v-model="otherPaper.width">
                                                    <template slot="append">mm</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="16">
                                            <el-form-item label="高">
                                                <el-input v-model="otherPaper.height">
                                                    <template slot="append">mm</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-form-item>
                                        <el-button
                                            type="primary"
                                            @click="setPaper('other', otherPaper.width, otherPaper.height)"
                                        >确定</el-button>
                                        <el-button @click="setPaper('other', '', '')">清空</el-button>
                                    </el-form-item>
                                </el-form>
                                <el-button
                                    slot="reference"
                                    :type="currentPaperType === 'other' ? 'primary' : 'info'"
                                >自定义纸张</el-button>
                            </el-popover>
                            <el-button-group>
                                <el-button
                                    type="info"
                                    icon="el-icon-refresh-right"
                                    @click="rotatePaper"
                                >旋转</el-button>
                                <el-button
                                    type="info"
                                    icon="el-icon-delete"
                                    @click="clearTemplate"
                                >清空</el-button>
                            </el-button-group>
                            <el-button-group>
                                <el-button
                                    type="info"
                                    icon="el-icon-view"
                                    @click="previewTemplate(printData)"
                                >快速预览</el-button>
                                <el-button
                                    type="info"
                                    icon="el-icon-document"
                                    @click="getJson()"
                                >预览JSON</el-button>
                                <!-- <el-button
                                    type="info"
                                    icon="el-icon-tickets"
                                    @click="getHtml(printData)"
                                >预览HTML</el-button> -->
                            </el-button-group>
                            <!-- <el-button-group>
                                <el-button
                                    type="info"
                                    icon="el-icon-full-screen"
                                    v-if="!fullDialogStatus"
                                    @click="fullDialogStatus = true"
                                >全屏</el-button>
                                <el-button
                                    type="info"
                                    icon="el-icon-full-screen"
                                    v-if="fullDialogStatus"
                                    @click="fullDialogStatus = false"
                                >正常屏幕</el-button>
                            </el-button-group> -->
                            <el-button-group>
                                <el-button
                                    type="info"
                                    icon="el-icon-printer"
                                    @click="printTemplate(printData)"
                                >打印</el-button>
                            </el-button-group>
                            <el-button-group>
                                <!-- <el-button
                                    type="info"
                                    icon="el-icon-coin"
                                    @click="bindDataSources"
                                >数据源</el-button> -->
                            </el-button-group>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main>
                    <el-row>
                        <el-col
                            style="padding: 20px"
                            :span="18"
                            id="hiprint-printTemplate"
                            class="hiprint-printTemplate"
                        ></el-col>
                        <el-col
                            :span="6"
                            style="display:none"
                            class="params_setting_container"
                        >
                            <el-row
                                class="hinnn-layout-sider"
                                style="padding: 10px;"
                            >
                                <div id="PrintElementOptionSetting"></div>
                            </el-row>
                        </el-col>
                    </el-row>

                    <el-drawer
                        size="100%"
                        class="params_drawer"
                        :title="paramsDrawerTitle"
                        :modal="false"
                        :wrapperClosable="true"
                        @opened="handleParamsOpened"
                        :visible.sync="paramsDrawerStatus"
                        direction="rtl"
                    >
                        <h4 slot="title">参数设置: {{ paramsDrawerTitle }}</h4>
                        <div id="params_content"></div>
                    </el-drawer>
                </el-main>
            </el-container>
        </el-container>

        <!-- <el-dialog
            class="preview_dialog"
            ref="previewDialog"
            title="快速预览"
            @opened="handlePreviewOpened(printData)"
            :width="currentPaper.width * 1 + 'mm'"
            :visible.sync="previewDialogStatus"
        >
            <div id="preview_content"></div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="previewDialogStatus = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="previewDialogStatus = false"
                >确 定</el-button>
            </span>
        </el-dialog> -->

        <!-- <el-dialog
            ref="infoDialog"
            :title="infoDialogTitle"
            :lock-scroll="true"
            :visible.sync="infoDialogStatus"
        >
            <el-input
                type="textarea"
                :readonly="true"
                :autosize="{ minRows: 15}"
                placeholder="请输入内容"
                v-model="infoTextarea"
            ></el-input>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="infoDialogStatus = false">取 消</el-button>
                <el-button
                    v-if="infoDialogTitle !== '预览HTML'"
                    @click="saveJson"
                >保 存</el-button>
                <el-button
                    type="primary"
                    v-clipboard:copy="infoTextarea"
                    @click="infoDialogStatus = false"
                >复 制</el-button>
            </span>
        </el-dialog> -->

        <!-- <el-dialog
            ref="infoDialog"
            title="数据源绑定"
            :lock-scroll="true"
            :visible.sync="dataDialogStatus"
        >
            <el-table
                :data="dataSources"
                style="width: 100%"
            >
                <el-table-column
                    label="组件"
                    width="100"
                >
                    <template slot-scope="scope">
                        {{ scope.row.printElementType.title }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="类型"
                    width="100"
                >
                    <template slot-scope="scope">
                        {{ scope.row.printElementType.type }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="字段"
                    width="100"
                >
                    <template slot-scope="scope">
                        {{ scope.row.options.field }}
                    </template>
                </el-table-column>
                <el-table-column label="标题">
                    <template slot-scope="scope">
                        {{ scope.row.options.title }}
                    </template>
                </el-table-column>
                <el-table-column label="远程数据源">
                    <template slot-scope="scope">
                        <el-select
                            :value="scope.row.options.field"
                            placeholder="请选择"
                        >
                            <el-option
                                :label="'名称数据'"
                                :value="'name'"
                            >
                            </el-option>
                            <el-option
                                :label="'描述数据'"
                                :value="'desc'"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dataDialogStatus = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="dataDialogStatus = false"
                >复 制</el-button>
            </span>
        </el-dialog> -->

        <!-- <el-dialog
            class="full_screen_dialog"
            :show-close="false"
            :visible.sync="fullDialogStatus"
            :modal="false"
            @opened="openFullScreen"
            @close="closeFullScreen"
            :fullscreen="true"
        >
            <div
                class="full_content_container"
                style="width:100%; height: 100%"
            ></div>
        </el-dialog> -->
        <!-- 预览弹窗 -->
        <PreviewDialog ref="PreviewDialog" />
        <!-- 预览json弹窗 -->
        <JsonDialog ref="JsonDialog" />
    </div>
</template>
<script>
import "@/vendor/hiprint1/css/hiprint.css";
import "@/vendor/hiprint1/css/print-lock.css";
import "@/vendor/hiprint1/css/print.css";

import "@/vendor/hiprint1/polyfill.min.js";
import "@/vendor/hiprint1/plugins/jquery.minicolors.min.js";
import { hiprint } from "@/vendor/hiprint1/hiprint.bundle.js";
import "@/vendor/hiprint1/plugins/jquery.hiwprint.js";
import "@/vendor/hiprint1/plugins/qrcode.js";
import "@/vendor/hiprint1/plugins/JsBarcode.all.min.js";

// 引入数据
// import { defaultElementTypeProvider } from "@/vendor/hiprint1/etypes/default-etype-provider.js";
// import imgUrl from "@/vendor/hiprint1/css/image/example.png";
import { queryData, auxiliaryData } from "./data/queryData.js";
// import { defaultElementTypeProvider } from "./data/configData.js";
import { printData } from "@/vendor/hiprint1/custom_test/config-print-data.js";
import { configPrintJson } from "@/vendor/hiprint1/custom_test/config-print-json.js";
// import { setTimeout } from "timers";

import PreviewDialog from "./components/PreviewDialog";
import JsonDialog from "./components/JsonDialog";
var hiprintTemplate;
export default {
    components: {
        PreviewDialog,
        JsonDialog,
    },
    data() {
        return {
            imgUrl: require("@/vendor/hiprint1/css/image/hi.png"),
            printData: printData,
            configPrintJson: configPrintJson,
            queryData: _.cloneDeep({ ...queryData }),
            auxiliaryData: _.cloneDeep(auxiliaryData),
            previewDialogStatus: false,
            paramsDrawerStatus: false,
            infoDialogStatus: false,
            fullDialogStatus: false,
            dataDialogStatus: false,
            infoTextarea: "",
            infoDialogTitle: "",
            paramsDrawerTitle: "",
            previewHtml: null,
            paperMap: {
                A3: {
                    width: 420,
                    height: 296.6,
                },
                A4: {
                    width: 210,
                    height: 296.6,
                },
                A5: {
                    width: 210,
                    height: 147.6,
                },
                B3: {
                    width: 500,
                    height: 352.6,
                },
                B4: {
                    width: 250,
                    height: 352.6,
                },
                B5: {
                    width: 250,
                    height: 175.6,
                },
            },
            currentPaper: {
                width: null,
                height: null,
            },
            otherPaper: {
                width: "",
                height: "",
            },
            dataSources: [],
            saveCode: "",
        };
    },
    computed: {
        /**
         * @Desc: 处理当前选中纸张
         */
        currentPaperType() {
            let type = null;
            if (this.otherPaper.width !== "" && this.otherPaper.height !== "") {
                type = "other";
            } else {
                for (const key in this.paperMap) {
                    let item = this.paperMap[key];
                    let { width, height } = this.currentPaper;
                    if (item.width === width && item.height === height) {
                        type = key;
                    }
                }
            }

            return type;
        },
    },
    methods: {
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 10:19:43
         * @Desc: 设置纸张属性
         * @param width 当前纸张宽度 mm
         * @param height 当前纸张高度 mm
         */
        setCurrentPaper(obj) {
            let { width, height } = obj;
            this.currentPaper.width = width;
            this.currentPaper.height = height;
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 09:35:36
         * @Desc: 设置纸张
         * @param type [A3, A4, A5, B3, B4, B5, other]
         * @param width 自定义高度
         * @param height 自定义高度
         */
        setPaper(type, width, height) {
            try {
                if (type === "other") {
                    if (width === "" && height === "") {
                        hiprintTemplate.setPaper("A4", null);
                        this.setCurrentPaper(this.paperMap["A4"]);
                        this.otherPaper = { width: "", height: "" };
                    } else {
                        hiprintTemplate.setPaper(width, height);
                        this.setCurrentPaper({ width: width, height: height });
                    }
                } else {
                    hiprintTemplate.setPaper(type, null);
                    this.setCurrentPaper(this.paperMap[type]);
                    this.otherPaper = { width: "", height: "" };
                }
            } catch (error) {
                this.$message({
                    message: "操作失败:" + error,
                    type: "error",
                });
            }
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 09:41:02
         * @Desc: 旋转
         */
        rotatePaper() {
            try {
                hiprintTemplate.rotatePaper();
            } catch (error) {
                this.$message({
                    message: "操作失败:" + error,
                    type: "error",
                });
            }
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 09:41:38
         * @Desc: 清除配置
         */
        clearTemplate() {
            try {
                hiprintTemplate.clear();
            } catch (error) {
                this.$message({
                    message: "操作失败:" + error,
                    type: "error",
                });
            }
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 09:56:28
         * @Desc: 快速预览
         */
        previewTemplate(printData) {
            // this.previewDialogStatus = true;
            this.$refs.PreviewDialog.hiprintTemplate = hiprintTemplate;
            this.$refs.PreviewDialog.printData = printData;
            this.$refs.PreviewDialog.currentPaper = this.currentPaper;
            this.$refs.PreviewDialog.isDialogShow = true;
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 10:45:49
         * @Desc: 打开预览dialog回调
         */
        handlePreviewOpened(printData) {
            $("#preview_content").html(hiprintTemplate.getHtml(printData));
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 10:46:07
         * @Desc: 打印
         */
        printTemplate(printData) {
            hiprintTemplate.print(printData);
            // hiprintTemplate.printByHtml(hiprintTemplate.getHtml(printData));
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 11:21:20
         * @Desc: 设置element click事件监听
         */
        elementAddEventListen() {
            let self = this;
            window.hinnn.event.on(
                hiprintTemplate.getPrintElementSelectEventKey(),
                function (t) {
                    console.log(t);
                    self.paramsDrawerTitle =
                        t.printElement.printElementType.title;
                    self.paramsDrawerStatus = true;
                }
            );
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 11:21:05
         * @Desc: 参数设置drawer回调,将参数设置dom添加到弹出层中
         */
        handleParamsOpened() {
            $("#params_content").append($(".hinnn-layout-sider"));
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 17:05:25
         * @Desc: 获取配置JSON
         */
        getJson() {
            this.infoTextarea = JSON.stringify(hiprintTemplate.getJson());
            this.$refs.JsonDialog.infoTextarea = this.infoTextarea;
            this.$refs.JsonDialog.saveCode = this.saveCode;
            this.$refs.JsonDialog.isDialogShow = true;
        },
        // 保存json
        // saveJson() {
        //     window.localStorage.setItem(this.saveCode, this.infoTextarea);
        // },
        /**
         * @Author: zhangxinzhong
         * @Date: 2021-03-09 17:05:07
         * @Desc: 获取配置HTML
         * @param printData
         */
        getHtml(printData) {
            console.log(printData);
            console.log(hiprintTemplate.getHtml(printData)[0]);
            this.infoTextarea = hiprintTemplate.getHtml(printData)[0].outerHTML;
            console.log(this.infoTextarea);
            this.infoDialogTitle = "预览HTML";
            this.infoDialogStatus = true;
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2019-07-31 09:45:15
         * @Desc: 打开全屏
         */
        openFullScreen() {
            $(".full_content_container").append($(".print_template_main"));
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2019-07-31 09:45:08
         * @Desc: 关闭全屏
         */
        closeFullScreen() {
            $(".print_template_container").append($(".print_template_main"));
        },
        /**
         * @Author: zhangxinzhong
         * @Date: 2019-07-31 09:44:53
         * @Desc: 绑定数据源
         */
        bindDataSources() {
            let eles = hiprintTemplate.getJson().panels[0].printElements;
            if (eles) {
                this.dataSources = eles;
            } else {
                this.dataSources = [];
            }
            this.dataDialogStatus = true;
        },
    },
    mounted() {
        let self = this;
        $(document).ready(function () {
            self.queryData.data.forEach((item) => {
                item.tid = "configModule." + item.field;
                item.type = "text";
                item.data = item.title;
                if (item.field == "name") {
                    item.options = {
                        height: 42,
                        width: 107,
                        fontSize: 19,
                        fontWeight: "700",
                        textAlign: "center",
                        lineHeight: 39,
                        hideTitle: true,
                    };
                }
                if (item.field == "qrcode") {
                    item.options = {
                        height: 50,
                        width: 50,
                        fontSize: 19,
                        fontWeight: "700",
                        textAlign: "center",
                        lineHeight: 39,
                        hideTitle: true,
                        textType: "qrcode",
                    };
                }
                if (item.field == "image") {
                    item.type = "image";
                    item.data = self.imgUrl;
                }
                if (item.field == "table") {
                    item.type = "table";
                    item.editable = true;
                    // item.columnDisplayEditable = true;
                    // item.columnDisplayIndexEditable = true;
                    // item.columnTitleEditable = true;
                    // item.columnResizable = true;
                    // item.columnAlignEditable = true;
                    item.columns = [item.columns];
                }
            });
            // auxiliaryData.forEach(item=>{
            //     self.queryData.data.push(item)
            // })
            console.log(self.queryData.data);
            const QueryData = _.cloneDeep(self.queryData.data);
            console.log(self.auxiliaryData);
            let defaultElementTypeProvider = (function () {
                return function (options) {
                    var addElementTypes = function (context) {
                        context.addPrintElementTypes("configModule", [
                            new hiprint.PrintElementTypeGroup(
                                "常规",
                                QueryData
                            ),

                            new hiprint.PrintElementTypeGroup(
                                "辅助",
                                auxiliaryData
                            ),
                        ]);
                    };

                    return {
                        addElementTypes: addElementTypes,
                    };
                };
            })();

            console.log(defaultElementTypeProvider);

            self.saveCode = self.$route.name;
            console.log(self.saveCode);

            let _configPrintJson =
                JSON.parse(window.localStorage.getItem(self.saveCode)) ||
                self.configPrintJson;
            console.log(_configPrintJson);
            console.log(typeof _configPrintJson);
            //初始化打印插件
            hiprint.init({
                providers: [new defaultElementTypeProvider()],
            });

            //设置左侧拖拽事件
            hiprint.PrintElementTypeManager.buildByHtml(
                $(".ep-draggable-item")
            );
            // let _configPrintJson = configPrintJson;
            hiprintTemplate = new hiprint.PrintTemplate({
                template: _configPrintJson,
                settingContainer: "#PrintElementOptionSetting",
                paginationContainer: ".hiprint-printPagination",
            });
            //打印设计
            hiprintTemplate.design("#hiprint-printTemplate");
            self.setCurrentPaper(self.paperMap.A4);
            self.elementAddEventListen();
            $(".params_drawer").width(
                $(".params_setting_container").width() * 1
            ); //动态设置右部参数设置框宽度
        });
    },
};
</script>

<style>
/* @import "../../../vendor/hiprint1/css/print.css"; */
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
@media print {
    .hiprint-printElement-tableTarget,
    .hiprint-printElement-tableTarget tr,
    .hiprint-printElement-tableTarget td {
        border-color: rgb(0, 0, 0);
        border-style: none;
        /* border: 1px solid rgb(0, 0, 0); */
        border: 1px solid red !important;
        font-weight: normal;
        direction: ltr;
        padding-bottom: 0pt;
        padding-left: 0pt;
        padding-right: 0pt;
        padding-top: 0pt;
        text-decoration: none;
        vertical-align: middle;
        box-sizing: border-box;
        word-wrap: break-word;
        word-break: break-all;
        /*line-height: 9.75pt;
    font-size: 9pt;*/
    }
}
</style>
