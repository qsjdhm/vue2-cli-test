<template>
    <div @click="click" class="pack">
        <svg-icon :icon-class="isFullscreen ? 'tuichuquanping' : 'quanping'" />
    </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
    name: 'Screenfull',
    data() {
        return {
            isFullscreen: false
        };
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.destroy();
    },
    methods: {
        click() {
            if (!screenfull.enabled) {
                this.$message({
                    message: 'you browser can not work',
                    type: 'warning'
                });
                return false;
            }
            screenfull.toggle();
        },
        change() {
            this.isFullscreen = screenfull.isFullscreen;
        },
        init() {
            if (screenfull.enabled) {
                screenfull.on('change', this.change);
            }
        },
        destroy() {
            if (screenfull.enabled) {
                screenfull.off('change', this.change);
            }
        }
    }
};
</script>

<style scoped>
.pack {
    width: 100%;
    height: 100%;
}
.screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
}
</style>
