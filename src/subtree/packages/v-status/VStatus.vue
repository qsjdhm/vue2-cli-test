<template>
    <span>
        <span class="circle" :style="{ backgroundColor: color }" />
        <span class="text">{{ text }}</span>
    </span>
</template>

<script>
export default {
    name: 'VStatus',
    props: {
        text: {
            type: String,
            default: () => {
                return '状态';
            }
        },
        color: {
            type: String,
            default: () => {
                return '#66c56b';
            }
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
}
.text {
    padding-left: 5px;
}
</style>
