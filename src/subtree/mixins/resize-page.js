let resizePageMixins = {
    data() {
        return {
            setHeightFlag: true
        };
    },
    methods: {
        /**
         * @method 重新调整页面高度
         */
        resizePage() {
            // 神坑 多个window.onresize 后面会覆盖前面的
            // 用window.addEventListener 监听无问题
            // window.onresize = _.debounce(
            //     () => {
            //         if (this.setHeightFlag) {
            //             console.log('onresize2333');
            //             this.setPageContentHeight();
            //         }
            //     },
            //     500,
            //     { leading: true }
            // );
            window.addEventListener(
                'resize',
                _.debounce(
                    () => {
                        if (this.setHeightFlag) {
                            this.setPageContentHeight();
                        }
                    },
                    300,
                    { leading: true }
                )
            );
        }
    },
    // 切换tab 时  如果页面没设置缓存
    // 设置会找不到dom 控制台报错
    // 要加锁 setHeightFlag
    // 在 created和 activated时 把setHeightFlag true
    // 在deactivated  和 destroyed 时把setHeightFlag false
    created() {
        this.setHeightFlag = true;
    },
    activated() {
        this.setHeightFlag = true;
        // 缓存页面 切换标签页时 重新计算高度
        if (this.setPageContentHeight) {
            // 设置表格/tree高度
            this.setPageContentHeight();
        }
    },
    mounted() {
        setTimeout(() => {
            if (this.setPageContentHeight) {
                // 设置表格/tree高度
                this.setPageContentHeight();
            }
        }, 0);
        this.resizePage();
    },
    deactivated() {
        this.setHeightFlag = false;
    },
    destroyed() {
        this.setHeightFlag = false;
    }
};
export default resizePageMixins;
