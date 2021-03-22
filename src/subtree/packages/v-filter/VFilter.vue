<template>
    <div class="content">
        <div ref="content" class="form-block">
            <template v-for="(item, index) in fieldList">
                <div v-show="icon === 'close' ? index < colCount : true" :key="index">
                    <div class="item-style">
                        <span class="label-style">{{ item.label }}</span>
                        <!--插槽-->
                        <template v-if="item.type === 'slot'">
                            <slot :name="'filter-' + item.value" />
                        </template>
                        <!-- 普通输入框 -->
                        <el-input
                            v-if="item.type === 'input'"
                            v-model.trim="defaultData[item.value]"
                            size="mini"
                            :type="item.type"
                            :disabled="item.disabled"
                            :placeholder="getPlaceholder(item)"
                            @keyup.enter.native="handleSearch"
                            @blur="handleEvent($event, item.value)"
                        />
                        <!-- 日期/时间 -->
                        <el-date-picker
                            v-if="item.type === 'date'"
                            v-model="defaultData[item.value]"
                            size="mini"
                            :type="item.dateType"
                            :picker-options="item.TimePickerOptions"
                            :clearable="item.clearable"
                            :disabled="item.disabled"
                            :default-time="item.defaultTime"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            :placeholder="getPlaceholder(item)"
                            @change="handleEvent($event, item.value, 'change')"
                        />
                        <!-- 选择框 -->
                        <el-select
                            v-if="item.type === 'select'"
                            v-model="defaultData[item.value]"
                            size="mini"
                            :disabled="item.disabled"
                            :clearable="item.clearable"
                            filterable
                            :multiple="item.multiple"
                            :placeholder="getPlaceholder(item)"
                            @change="handleEvent($event, item.value, 'change')"
                        >
                            <el-option
                                v-for="(childItem, childIndex) in listTypeInfo[item.list]"
                                :key="childIndex"
                                :label="childItem.label || childItem.name"
                                :value="setBindValue(childItem)"
                                :disabled="childItem.disabled"
                            />
                        </el-select>
                        <!-- 计数器 -->
                        <el-input-number
                            v-if="item.type === 'inputNumber'"
                            v-model="defaultData[item.value]"
                            size="mini"
                            controls-position="right"
                            :min="item.min"
                            :max="item.max"
                            @change="handleEvent($event, item.value, 'change')"
                        />
                    </div>
                </div>
            </template>
        </div>
        <div v-if="!btnHidden" class="btn-style">
            <div>
                <el-button v-waves type="primary" size="mini" icon="el-icon-search" :disabled="defaultData.searchBtn" @click="handleSearch"
                    >搜索
                </el-button>
                <el-button v-waves size="mini" class="bt-class" icon="el-icon-refresh" :disabled="defaultData.resetBtn" @click="handleReset"
                    >重置
                </el-button>
            </div>
        </div>
        <div
            v-if="fieldList.length > colCount"
            :class="['semicircle', icon === 'close' ? 'down' : '']"
            @click="icon === 'open' ? (icon = 'close') : (icon = 'open')"
        >
            <i class="el-icon-arrow-up" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'VFilter',
    props: {
        /**字段默认数据 */
        data: {
            type: Object,
            default: () => {}
        },
        /**字段配置项 */
        fieldList: {
            type: Array,
            default: () => []
        },
        /**相关的列表 */
        listTypeInfo: {
            type: Object,
            default: () => {}
        },
        /**是否隐藏操作按钮 */
        btnHidden: {
            type: Boolean,
            default: false
        },
        /**searchBtn 是否禁用 */
        searchBtn: {
            type: Boolean,
            default: false
        },
        /**重置按钮 */
        resetBtn: {
            type: Boolean,
            default: false
        },
        /**搜索数量 */
        count: {
            type: [Number, String],
            default: 4
        },
        isNeedResetExtraParam: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        defaultData: {},
        icon: 'close',
        colCount: null, // 每行的列数量
        defaultKeyList: [] //组件内置操作框key数组，用于watch更新
    }),
    watch: {
        data: {
            handler(val) {
                let resolveVal = _.cloneDeep(val);
                for (let key in resolveVal) {
                    if (resolveVal[key] !== null) {
                        if (this.defaultKeyList.indexOf(key) < 0) {
                            this.defaultData[key] = _.cloneDeep(resolveVal[key]);
                        }
                    }
                }
            },
            deep: true
        }
    },

    mounted() {
        /**
         * 子组件无法直接修改父组件传递过来的值
         * 于是将父组件传递的值首先赋值给 defaultData
         * 在搜索条件中同样使用 defaultData
         * 永远保持 props 传递的 data 纯洁度
         */
        this.defaultData = { ...this.data };

        this.setColCount();
        window.addEventListener('resize', this.setColCount);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.setColCount);
    },

    methods: {
        /**
         * 设置 每行的列数量
         */
        setColCount: _.throttle(function () {
            let ref = this.$refs.content;
            let styleAttr = window.getComputedStyle(ref, null);
            let width = Number.parseInt(styleAttr['width']);
            let pl = Number.parseInt(styleAttr['padding-left']);
            let pr = Number.parseInt(styleAttr['padding-right']);

            // 332 每个输入组件 宽度332 暂时写死
            this.colCount = Math.floor((width - pl - pr) / 332);
        }, 500),

        setvalueModel(val) {
            console.log(val);
            return val;
        },
        /**
         * 设置 绑定select 的值
         */
        setBindValue(item) {
            let value = item?.value ?? item?.id;
            return value;
        },
        /**
         * @func 占位符显示
         * @param {Object} row
         * @desc 📝
         */
        getPlaceholder(row) {
            let placeholder;
            if (row.type === 'input') {
                placeholder = '请输入' + row.label;
            } else if (row.type === 'select' || row.type === 'time' || row.type === 'date') {
                placeholder = '请选择' + row.label;
            } else {
                placeholder = row.label;
            }
            return placeholder;
        },
        /**
         * @func 事件处理
         * @desc 📝
         */
        handleEvent(event, val, change) {
            this.defaultKeyList.indexOf(val) < 0 && this.defaultKeyList.push(val);
            let obj = {
                value: change === 'change' ? event : event.target.value,
                label: val
            };
            this.$emit('handleEvent', obj);
        },

        /**
         * @func 搜索
         * @desc 📝
         */
        handleSearch() {
            this.$emit('handleSearch', this.defaultData);
        },

        /**
         * @func 重置
         * @desc 📝
         */
        handleReset() {
            // 防止重置额外参数
            if (this.isNeedResetExtraParam) {
                this.fieldList.forEach((o) => (this.defaultData[o.value] = null));
            } else {
                for (let key in this.defaultData) {
                    this.defaultData[key] = null;
                }
            }
            this.$emit('handleReset', this.defaultData);
        }
    }
};
</script>
<style lang="scss" scoped>
.el-input,
.el-select,
.el-date-editor,
.el-cascader,
.el-autocomplete,
.el-input-number {
    width: 220px;
}
.content {
    background: #fff;
    padding: 5px 10px 3px 10px;
    border-bottom: 2px solid #f0f1f4;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    .item-style {
        margin: 6px auto;
        line-height: 1;
        display: flex;
        align-items: center;

        .label-style {
            display: inline-block;
            justify-self: end;
            width: 100px;
            font-size: 13px;
            white-space: nowrap;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            text-align: right;
            margin-right: 12px;
            color: #222222;
        }
    }
    // &:hover .semicircle {
    //     display: block;
    // }

    .semicircle {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 32px;
        height: 16px;
        text-align: center;
        color: #999999;
        background-color: #ffffff;
        box-shadow: 0px -3px 8px 0px rgba(29, 58, 102, 0.08);
        border: 1px solid #e8e8e8;
        border-radius: 100px 100px 0 0;

        &:hover {
            cursor: pointer;
            color: #409eff;
        }
    }

    .down {
        bottom: -16px;
        border-radius: 0 0 100px 100px;

        & > i {
            position: absolute;
            left: -1px;
            right: 0;
            top: -3px;
            margin: auto;
            transform: rotate(180deg);
        }
    }

    .btn-style {
        margin: 8px 0 8px auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .form-block {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
