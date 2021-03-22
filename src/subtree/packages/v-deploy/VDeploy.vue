<template>
    <div class="operate-style">
        <div class="btn-style">
            <slot name="option" />
        </div>
        <div class="deploy-style">
            <el-tooltip class="item" effect="dark" content="刷新" placement="top">
                <i ref="rotate" class="el-icon-refresh-right rotate" @click="handleRefresh" />
            </el-tooltip>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VDeploy',
    props: {},
    data: () => ({}),

    watch: {},

    mounted() {
        // console.log(this.colList);
    },

    methods: {
        // 刷新按钮点击
        handleRefresh() {
            let originAngle = this.$refs.rotate.style.transform.replace(/[^0-9]/gi, '');
            if (originAngle) originAngle = parseInt(originAngle, 10);
            else originAngle = 0;
            this.$refs.rotate.style.transform = 'rotate(' + (originAngle + 1) + 'turn)';
            this.$emit('handleRefresh');
        }
    }
};
</script>
<style lang="scss" scoped>
.el-checkbox {
    width: 100%;
    display: inline-block;
}
.confirm-style {
    background: #3365b3;
    height: 24px;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    cursor: pointer;
}
.divider {
    margin: 6px 0 !important;
}
.operate-style {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 0 10px;

    .deploy-style {
        i {
            font-size: 21px;
            margin-right: 6px;

            cursor: pointer;
        }

        .rotate {
            transition: all 0.5s ease-out;
            transform-origin: center center;
        }
    }
}
</style>
