<template>
    <div class="part-title vt-flex vt-w-full">
        <div v-if="prefixSign === 'line'" class="title-line" />

        <i v-else-if="prefixSign === 'icon'" class="el-icon-collection-tag"></i>
        <!-- <vt-icon v-else-if="prefixSign === 'icon'" class="vt-mr-1" color="#3365b3" :symbol="true" icon-class="iconchanpinanli" /> -->
        <div class="title-name">{{ title }}</div>

        <span v-if="addBtn" class="btn-add vt-ml-2">
            <el-button size="mini" icon="el-icon-plus" circle @click="btnClick" />
        </span>

        <div class="vt-flex-1 vt-flex vt-justify-between">
            <slot name="left" />
            <slot name="right" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'VViewTitle',
    props: {
        prefixSign: {
            type: String,
            default: 'line' // line  icon
        },
        title: {
            type: String,
            default: ''
        },
        addBtn: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        btnClick() {
            this.$emit('btnClick');
        }
    }
};
</script>
<style scoped lang="scss">
.part-title {
    height: 34px;
    line-height: 34px;
    display: flex;
    align-items: center;
    align-content: center;
    .title-line {
        width: 3px;
        height: 20px;
        background-color: #1890ff;
        display: inline-block;
        margin-right: 12px;
    }
    .title-name {
        font-size: 14px;
        font-weight: bold;
        margin-left: 5px;
    }

    .el-button--mini {
        height: auto !important;
    }
    .el-button--mini.is-circle {
        padding: 3px !important;
    }
}
</style>
