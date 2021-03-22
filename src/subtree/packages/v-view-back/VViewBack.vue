<template>
    <div class="title">
        <div class="name">
            <span>{{ name }}</span>
        </div>
        <el-button size="mini" @click="handleReturnPath"> 返回 </el-button>
    </div>
</template>

<script>
export default {
    name: 'VViewBack',
    props: {
        name: {
            type: String,
            default: () => {
                return '标题';
            }
        },
        returnPath: {
            type: String,
            default: () => {
                return '/welcome';
            }
        }
    },
    data() {
        return {};
    },
    methods: {
        /**返回 */
        handleReturnPath() {
            this.$store
                .dispatch('tagsView/delView', this.$route)
                .then(() => {
                    this.$router.push({
                        path: this.returnPath
                    });
                })
                .catch(() => {});
        }
    }
};
</script>

<style lang="scss" scoped>
.title {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    border-bottom: 1px solid #f0f1f4;
    background-color: #ffffff;
    .name {
        color: #222222;
        font-size: 16px;
        font-weight: 600;
    }
}
</style>
