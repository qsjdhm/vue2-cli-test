<!--
 * @Author: your name
 * @Date: 2020-12-08 17:36:29
 * @LastEditTime: 2021-03-08 10:00:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \donghong-mes-webd:\项目\vtcloud-cams2-web\src\modules\production-order\production-order\components\EditProductionOrder.vue
-->
<template>
    <div>
        <el-dialog
            v-drag-dialog
            title="编辑模板配置"
            width="1000px"
            :visible.sync="isDialogShow"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <vt-form
                :ref-obj.sync="EditOrderForm.ref"
                :data="EditOrderForm.data"
                :field-list="EditOrderForm.fieldList"
                :rules="EditOrderForm.rules"
                count="2"
                :list-type-info="listTypeInfo"
            >
                <template slot="form-name">
                    <el-input
                        v-model.trim="EditOrderForm.data.name"
                        size="mini"
                        style="width: 100%"
                        maxlength="20"
                        placeholder="请输入数据模板名称"
                        @blur="nameIsUnique(EditOrderForm.data.id, EditOrderForm.data.name)"
                    />
                </template>
            </vt-form>
            <div class="table-container">
                <div class="tableTitle">
                    <PartTitle
                        title="字段配置"
                        prefix-sign="icon"
                    />
                    <div class="handle-btns">
                        <el-button @click="addField">
                            <vt-icon icon-class="iconxinzeng_shuju" /> 新增
                        </el-button>
                        <!--            <el-button> <vt-icon icon-class="iconmorendaoru" /> 导入</el-button>-->
                    </div>
                </div>

                <div class="table-box">
                    <vt-table-plus
                        ref="VtTablePlus"
                        :key="count"
                        :data="FieldTableInfo.data"
                        :columns="FieldTableInfo.columns"
                        choose-type="none"
                        :hide-config="hideConfig"
                    >
                        <template #table-fieldName="{scope}">
                            <el-input
                                v-model="scope.row.fieldName"
                                placeholder="请输入字段名称"
                            />
                        </template>
                        <template #table-fieldBizName="{scope}">
                            <el-input
                                v-model="scope.row.fieldBizName"
                                placeholder="请输入业务名称"
                            />
                        </template>
                        <template #table-fieldType="{scope}">
                            <el-select
                                v-model="scope.row.fieldType"
                                placeholder="请选择类型"
                                style="width: 100%"
                            >
                                <el-option
                                    v-for="item in listTypeInfo.fieldTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </template>
                        <template #table-fieldDesc="{scope}">
                            <el-input
                                v-model="scope.row.fieldDesc"
                                placeholder="请输入描述"
                            />
                        </template>
                        <template #table-showTypeArr="{scope}">
                            <el-select
                                v-model="scope.row.showTypeArr"
                                placeholder="请选择展现形式"
                                style="width: 100%"
                                multiple
                            >
                                <el-option
                                    v-for="item in listTypeInfo.showTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </template>
                        <template #table-operate="{scope}">
                            <el-button
                                v-has="{role: 'edit'}"
                                size="mini"
                                type="text"
                                @click="handlePartDelete(scope.row, scope.$index)"
                            >
                                <vt-icon icon-class="iconqingchu" /> 删除
                            </el-button>
                        </template>
                    </vt-table-plus>
                </div>
            </div>
            <span slot="footer">
                <el-button
                    size="mini"
                    icon="iconfont icondanchuangquxiao_renwu-62"
                    @click="handleCancel"
                > 取消</el-button>
                <el-button
                    size="mini"
                    icon="iconfont icondanchuangdequeren_diannao"
                    type="primary"
                    :loading="loadingToggle"
                    @click="handleConfirm"
                > 确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
/**
 * @author zhangxinzhong<zhangxinzhong@vtstar.net>
 * @date 2021-02-18
 * @desc 数据模板配置-编辑
 */
import { EditForm, FieldTableInfo } from "./data";
import PartTitle from "@/components/PartTitle";
export default {
    name: "EditDataTemplate",
    components: {
        PartTitle,
    },
    props: {
        editInfo: {
            type: Object,
            default: () => {
                return {};
            },
        },
        listTypeInfo: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            // 数据提交开关
            loadingToggle: false,
            // 弹窗开关
            isDialogShow: false,
            // 表单数据
            EditOrderForm: _.cloneDeep({ ...EditForm }),
            categoryId: "",
            customerData: {},
            count: 0,
            hideConfig: ["pagination", "invert"],
            /**设备字段*/
            FieldTableInfo: _.cloneDeep({ ...FieldTableInfo }),
        };
    },
    watch: {
        isDialogShow(v) {
            // if (v) {
            // }
        },
        editInfo: {
            handler(newVal, oldVal) {
                if (newVal) {
                    // console.log(newVal, "vl");
                    this.EditOrderForm.data = { ...this.editInfo };
                    this.$nextTick(() => {
                        this.FieldTableInfo.data = _.cloneDeep(
                            this.editInfo.templateItemList
                        );
                    });

                    console.log(this.FieldTableInfo.data);
                }
            },
            deep: true,
        },
    },
    methods: {
        /**新增设备字段点击*/
        addField() {
            this.FieldTableInfo.data.push({
                fieldBizName: null,
                fieldDesc: null,
                fieldName: null,
                fieldType: null,
                showTypeArr: null,
            });
        },
        /**删除字段按钮点击*/
        handlePartDelete(row, index) {
            this.FieldTableInfo.data.splice(index, 1);
        },
        // 校验名称是否唯一
        nameIsUnique(id, name) {
            if (name) {
                let query = {
                    id: id,
                    name: name,
                };
                this.$service(
                    "GET",
                    this.$global.scada + "/api/template/isUnique",
                    query
                )
                    .then((res) => {})
                    .catch((res) => {
                        this.formInfo.data.name = null;
                    });
            }
        },
        /**点击确定 */
        handleConfirm() {
            this.EditOrderForm.ref.validate((vaild) => {
                try {
                    if (vaild) {
                        this.confirmLoading = true;
                        let query = {
                            ...this.EditOrderForm.data,
                            templateItemList: [],
                        };
                        console.log(this.FieldTableInfo.data);
                        let templateItemList = [];
                        let greater = false;
                        if (this.FieldTableInfo.data.length > 0) {
                            this.FieldTableInfo.data.forEach((item) => {
                                if (
                                    item.fieldBizName == null ||
                                    item.fieldName == null ||
                                    item.fieldDesc == null ||
                                    item.fieldType == null ||
                                    item.showTypeArr.length == 0
                                ) {
                                    this.$message.error("请将信息填写完整");
                                    greater = true;
                                    return;
                                }
                            });
                            if (greater) {
                                this.confirmLoading = false;
                                return;
                            }

                            templateItemList = this.FieldTableInfo.data.filter(
                                (item) => {
                                    if (
                                        item.fieldBizName != null &&
                                        item.fieldName != null &&
                                        item.fieldDesc != null &&
                                        item.fieldType != null &&
                                        item.showTypeArr.length > 0
                                    ) {
                                        return item;
                                    }
                                }
                            );
                            console.log(templateItemList);
                            templateItemList.forEach((item) => {
                                item.showType = "";
                                item.showTypeArr.forEach((ele) => {
                                    item.showType = item.showType + ele + ",";
                                });
                                item.showType = item.showType.slice(
                                    0,
                                    item.showType.length - 1
                                );
                            });
                        }
                        console.log(templateItemList);
                        query.templateItemList = _.cloneDeep(templateItemList);
                        console.log(query);
                        this.$service(
                            "POST",
                            this.$global.scada + "/api/template",
                            query
                        )
                            .then(async () => {
                                this.$message.success("修改成功");
                                this.$emit("hanleConfirm");
                                this.handleCancel();
                            })
                            .catch((e) => {
                                this.confirmLoading = false;
                                throw e;
                            });
                    } else {
                        this.confirmLoading = false;
                    }
                } catch (error) {
                    this.loadingToggle = false;
                    throw error;
                }
            });
        },
        /**点击取消 */
        handleCancel() {
            this.loadingToggle = false;
            this.isDialogShow = false;
            this.EditOrderForm.ref.resetFields();
            this.customerData = {};
            for (let key in this.EditOrderForm.data) {
                this.EditOrderForm.data[key] = null;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.table-box {
    height: 420px;
    margin: 10px 0;
}
.title {
    margin: 10px 0;
    font-weight: 500;
    font-size: 13px;
    color: #222222 !important;
}
.table-page {
    padding: 0;
}
.tableTitle {
    display: flex;
    justify-content: space-between;
}
</style>
