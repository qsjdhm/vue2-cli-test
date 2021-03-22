<template>
    <div :class="['ViewTable', isViewTable ? 'borderTopN' : '']">
        <div
            v-for="(item, index) in valueList"
            :key="index"
            :class="['view-li', isViewTable ? 'borderTopY' : '', isAllLineList.indexOf(index) > -1 ? 'isAllLine' : '']"
            :style="{ width: 100 / num + '%' }"
        >
            <div class="view-label" :style="'width:' + labelWidth + 'px'">{{ item.label }}:</div>
            <template>
                <!-- 插槽 -->
                <div v-if="item.type === 'slot'" class="view-value">
                    <slot :name="'view-' + item.prop" :scope="item" />
                </div>
                <!-- 时间 -->
                <div v-else-if="item.type === 'date'" class="view-value">{{ item.value ? momentformat(item.value, formatTime) : '-' }}</div>
                <!-- 普通列 -->
                <div v-else class="view-value">{{ item.value !== '' && item.value !== null ? item.value : '-' }}</div>
            </template>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    name: 'VViewTable',
    props: {
        //详情数据detailInfo
        data: {
            type: [Array, Object],
            default: () => {}
        },
        //配置json
        columns: {
            type: Array,
            default: () => []
        },
        //一行中view-li的个数
        num: {
            type: Number,
            default: () => 2
        },
        //label宽度
        labelWidth: {
            type: Number,
            default: () => 130
        },
        /**时间 */
        formatTime: {
            type: String,
            default: 'YYYY-MM-DD HH:mm:ss'
        },
        //配置（配置列不确定时使用）
        config: {
            type: [Array, Object],
            default: () => {}
        }
        /**键值对不确定配置
        config: {
            label: "name", //属性名称
            value: "item", //属性值
            type: 'date', //属性值为时间，需要后台加个 date：true 字段
        },
        */
    },
    data() {
        return {
            valueList: [],
            //是否切换样式
            isViewTable: false,
            //需要占一整行的元素数组
            isAllLineList: []
        };
    },
    watch: {
        data: {
            handler(val) {
                this.valueList = [];
                this.isViewTable = false;
                this.isAllLineList = [];
                this.dealValueList();
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        //数据处理
        dealValueList() {
            //判断是数组还是对象，数组的话配置列不确定
            if (Array.isArray(this.data)) {
                // console.log("数组");
                this.data.map((item) => {
                    this.valueList.push({
                        label: item[this.config.label],
                        value: item[this.config.value],
                        type: item[this.config.type] == true ? 'date' : null
                        // prop: item.prop,
                    });
                });
            } else {
                // console.log("对象");
                this.columns.map((item, index) => {
                    if (!item.hide) {
                        this.valueList.push({
                            label: item.label,
                            value: this.data[item.prop],
                            prop: item.prop,
                            type: item.type
                        });
                        if (item.isAllLine == true) {
                            this.isAllLineList.push(index);
                        }
                    }
                });
            }
            if (this.valueList.length - this.num < 0) {
                this.isViewTable = true;
            } else {
                this.isViewTable = false;
            }
            // console.log(this.valueList);
        },
        //时间格式化
        momentformat(value, format) {
            return moment(value).format(format);
        }
    }
};
</script>
<style scoped lang="scss">
.borderTopN {
    border-top: none !important;
}
.borderTopY {
    border-top: 1px solid #ebedf0 !important;
}
.ViewTable {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid #ebedf0;
    border-top: 1px solid #ebedf0;
    .view-li {
        display: flex;
        // width: calc(100% / 2);
        font-size: 12px;
        color: #606266;
        border-right: 1px solid #ebedf0;
        border-bottom: 1px solid #ebedf0;
        .view-label {
            // width: 130px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 8px 20px;
            box-sizing: border-box;
            background-color: #f0f2f5;
        }
        .view-value {
            flex: 1;
            display: flex;
            align-items: center;
            padding: 8px 10px;
            box-sizing: border-box;
            background-color: #fff;
        }
    }
    .isAllLine {
        width: 100% !important;
    }
}
</style>
