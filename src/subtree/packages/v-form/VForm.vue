<template>
    <el-form
        ref="form"
        class="page-form"
        status-icon
        :class="className"
        :model="data"
        :rules="rules"
        :label-position="labelPosition"
        :label-width="labelWidth"
    >
        <template v-for="item in fieldList">
            <el-form-item
                v-if="!whetherHide.includes(item.value)"
                :key="item.value"
                :prop="item.value"
                :label="item.label"
                :style="{ width: formItemWidth(item) }"
            >
                <!-- solt -->
                <template v-if="item.type === 'slot'">
                    <slot :name="'form-' + item.value" />
                </template>
                <!-- 普通输入框 -->
                <template v-if="item.type === 'input' || item.type === 'password'">
                    <el-input
                        v-model.trim="data[item.value]"
                        size="mini"
                        clearable
                        autocomplete="new-password"
                        :type="item.type"
                        :disabled="item.disabled"
                        :maxlength="item.maxlength || $global.string"
                        :placeholder="item.placeholder || getPlaceholder(item)"
                        :show-password="item.type === 'password'"
                        @blur="handleEvent($event, item.value)"
                    />
                </template>
                <!-- 文本输入框 -->
                <template v-if="item.type === 'textarea'">
                    <el-input
                        v-model.trim="data[item.value]"
                        size="mini"
                        :type="item.type"
                        :disabled="item.disabled"
                        :maxlength="item.maxlength || $global.textarea"
                        :placeholder="item.placeholder || getPlaceholder(item)"
                        :autosize="item.autosize || { minRows: 2, maxRows: 10 }"
                        @blur="handleEvent($event, item.value)"
                    />
                </template>
                <!-- 计数器 -->
                <template v-if="item.type === 'inputNumber'">
                    <el-input-number
                        v-model="data[item.value]"
                        size="mini"
                        :min="item.min"
                        :max="item.max"
                        :step="item.step"
                        :disabled="item.disabled"
                        :precision="item.precision"
                        :step-strictly="item.strictly"
                        style="width: 100%"
                        @change="handleEvent($event, item.value, 'change')"
                    />
                </template>
                <!-- 选择框 -->
                <template v-if="item.type === 'select'">
                    <el-select
                        v-model="data[item.value]"
                        size="mini"
                        filterable
                        :disabled="item.disabled"
                        :multiple="item.multiple"
                        :clearable="item.clearable"
                        :placeholder="item.placeholder || getPlaceholder(item)"
                        @change="handleEvent($event, item.value, 'change')"
                    >
                        <!-- setOptionLabel -->
                        <!-- :label="childItem[$$(item, 'listProps', 'label') || 'label' || 'id' ]"
                            :value="childItem[$$(item, 'listProps', 'value') || 'value'] || 'id'" -->
                        <el-option
                            v-for="(childItem, childIndex) in listTypeInfo[item.list]"
                            :key="childIndex"
                            :label="setOptionLabelvalue(childItem, item)"
                            :value="setOptionLabelvalue(childItem, item, 'value')"
                            :disabled="childItem.disabled"
                        />
                    </el-select>
                </template>
                <!-- 单选框 -->
                <el-radio-group v-if="item.type === 'radio'" v-model="data[item.value]" :disabled="item.disabled">
                    <el-radio v-for="childItem in listTypeInfo[item.list]" :key="childItem.label" :label="childItem.label">{{
                        childItem.title
                    }}</el-radio>
                </el-radio-group>
                <!-- 日期选择框 -->
                <el-date-picker
                    v-if="item.type === 'date'"
                    v-model="data[item.value]"
                    size="mini"
                    :type="item.dateType"
                    :picker-options="item.TimePickerOptions"
                    :clearable="item.clearable"
                    :disabled="item.disabled"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width: 100%"
                    :placeholder="item.placeholder || getPlaceholder(item)"
                    @change="handleEvent($event, item.value, 'change')"
                />
            </el-form-item>
        </template>
    </el-form>
</template>
<script>
export default {
    name: 'VForm',
    props: {
        // 自定义类名
        className: {
            type: String,
            default: null
        },
        // 表单相关字段
        fieldList: {
            type: Array,
            default: () => []
        },
        // 表单数据
        data: {
            type: Object,
            default: () => {}
        },
        // 表单验证规则
        rules: {
            type: Object,
            default: () => {}
        },
        // 表单相关的列表
        listTypeInfo: {
            type: Object,
            default: () => {}
        },
        // 一行容纳的数量
        count: {
            type: [Number, String],
            default: 1
        },
        // label位置
        labelPosition: {
            type: String,
            default: 'top'
        },
        // label宽度
        labelWidth: {
            type: String,
            default: '100px'
        },
        // 是否禁用
        whetherHide: {
            type: Array,
            default: () => []
        },
        // 表单实例
        refObj: {
            type: Object,
            default: () => {}
        }
    },
    watch: {
        data: {
            handler: function (val) {
                // 将form实例返回到父级
                this.$emit('update:refObj', this.$refs.form);
                // 以后废弃此方法
                this.$emit('handleUpdate', val);
            },
            deep: true
        }
    },

    mounted() {
        this.$emit('update:refObj', this.$refs.form);
    },

    methods: {
        // 设置placeholder显示内容
        getPlaceholder(row) {
            let placeholder;
            if (row.type === 'input' || row.type === 'textarea' || row.type === 'password') {
                placeholder = '请输入' + row.label;
            } else if (row.type === 'select' || row.type === 'time' || row.type === 'date') {
                placeholder = '请选择' + row.label;
            } else {
                placeholder = row.label;
            }
            return placeholder;
        },

        /**
         * @method 绑定相关事件
         * @param {Event} event
         * @param {String | Number} val
         * @param {String} change
         * @desc 📝事件处理, 当前form项失去焦点时, 获取 value 值和 字段名称
         * @desc 📝change 事件特殊处理: change 只能拿到选中值. 此时的 event 为选中值的 value
         */
        handleEvent(event, val, change) {
            let obj = {
                value: change === 'change' ? event : event.target.value,
                label: val
            };
            console.log('obj', obj);
            this.$emit('handleEvent', obj);
        },
        // 设备表单item的宽
        formItemWidth(item) {
            let width = `calc(100%/${item.count ? item.count : this.count})`;
            if (item.type === 'textarea') {
                width = `calc(100%/${item.count ? item.count : 1})`;
            }
            return width;
        },

        setOptionLabelvalue(cItem, item, type = 'label') {
            // listProps
            // 老版本 listProps={name:"name",id:'id'} key和默认值   name id 语义不好
            // 新版本 listProps={label:"label",value:'value'} key和默认值

            // 此方法为了保证向后兼容
            let label = '';
            let value = '';
            // 存在 listProps 时
            let listProps = item?.listProps;
            if (listProps) {
                // 老版本
                if (listProps?.name) {
                    label = cItem[listProps?.name];
                    value = cItem[listProps?.id];
                } else if (listProps?.label) {
                    // 新
                    label = cItem[listProps?.label];
                    value = cItem[listProps?.value];
                }
            } else {
                label = cItem['name'] || cItem['label'];
                value = cItem?.id ?? cItem?.value;
                //提示 如果 不配置listProps 而且 cItem里 name label id value 都存在的话  建议对原始数据进行处理
            }
            if (type === 'label') {
                return label;
            } else {
                return value;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.page-form {
    // 父容器添加负外边距和子内容内边距进行抵消
    margin: 0 -10px;
    .el-form-item {
        // 子内容添加右边距，和margin进行抵消
        padding: 10px;
        display: inline-block !important;
        .el-form-item__content {
            .el-input,
            .el-select,
            .el-textarea {
                width: 100%;
            }
            .el-input-number {
                .el-input {
                    width: inherit;
                }
            }
        }
    }
    .el-form-block {
        display: block;
        width: 100%;
        .el-form-item__content {
            .el-input,
            .el-select,
            .el-textarea {
                width: 100%;
            }
        }
    }
}
.page-form-block {
    .el-form-item {
        display: block;
        .el-form-item__content {
            .el-input,
            .el-select,
            .el-textarea {
                width: inherit;
            }
            .el-input-number {
                .el-input {
                    width: inherit;
                }
            }
        }
    }
    .el-form-block {
        display: block;
        width: 100%;
        .el-form-item__content {
            .el-textarea {
                width: 100%;
            }
        }
    }
}
</style>
