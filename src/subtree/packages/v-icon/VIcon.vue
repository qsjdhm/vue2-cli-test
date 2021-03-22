<template>
    <!-- 多色模式 -->
    <svg v-if="symbol" class="icon" aria-hidden="true" v-on="$listeners">
        <use :href="svgClass" />
    </svg>
    <!-- Font class模式 -->
    <i v-else :class="svgClass" v-on="$listeners" />
</template>

<script>
/**
 * @author zhangyan <qsjdhm@163.com>
 * @date 2020-03-19
 * @desc 图标组件，基于iconfont内部自动切换多色和单色模式
 */
export default {
    name: 'VIcon',
    props: {
        // 是否是多色模式
        symbol: {
            type: Boolean,
            required: false,
            default: false
        },
        // 对应到iconfont中每个图标的class名称
        iconClass: {
            type: String,
            required: true
        }
    },
    computed: {
        svgClass() {
            if (this.symbol === true) {
                return '#' + this.iconClass;
            } else {
                return 'iconfont ' + this.iconClass;
            }
        }
    }
};
</script>

<style scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
