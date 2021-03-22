<template>
    <div class="app-container">
        <el-button style="margin-bottom: 20px" type="primary" icon="el-icon-delete" @click="handleDelete"> 删除按钮 </el-button>
        <span class="test">css变量</span>
        <span
            v-name-clipboard="{
                value: '复制测试文本',
                isCopy: true
            }"
            style="
                width: 100%;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: middle;
            "
        >
            复制测试文本
        </span>
    </div>
</template>

<script>
import { confirmation } from '@/subtree/utils/decorator';

export default {
    name: 'DecoratorIndex',
    data() {
        return {};
    },
    created() {},
    methods: {
        @confirmation('是否要删除数据?')
        handleDelete() {
            this.$message.success('删除数据成功');
        }
    }
};
</script>
<style lang="scss">
.test {
    color: $yellow;
}
</style>
