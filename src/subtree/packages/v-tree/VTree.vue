<template>
    <div class="tree-component flex-col flex-1">
        <div class="tree-search-pack">
            <el-input
                v-if="searchInput === true"
                v-model="filterText"
                placeholder="请输入搜索关键字"
                suffix-icon="el-icon-search"
                clearable
            />
        </div>
        <div class="tree-wrapper">
            <el-tree ref="ElTreeRef" :data="treeData" v-bind="setTreeAttr()" v-on="setEvents()">
                <span slot-scope="{ node, data }" class="custom-tree-node vt-overflow-hidden">
                    <span
                        v-tip
                        style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
                        class="flex-1 vt-overflow-hidden vt-truncate"
                        :data-txt="node.label"
                        :title="node.label"
                    >
                        <i :class="(nodeIconFun && nodeIconFun(node, data)) || ''" />
                        {{ node.label }}
                    </span>
                    <!-- <el-popover
                            placement="left"
                            trigger="hover"
                        > -->
                    <span v-if="data.id === 0 || data.id === null">
                        <i class="el-icon-plus" v-if="operate('add', node)" @click.stop="iconClick(node, data, 'add')"></i>
                    </span>
                    <span v-else :ref="`operatorBtn${data.id}`" slot="reference" class="tree-icon-node">
                        <el-popover
                            placement="bottom-end"
                            trigger="click"
                            popper-class="tree-popover-menu"
                            @show="popShow(node, data)"
                            @hide="popHide(node, data)"
                        >
                            <div v-if="operateList && Array.isArray(operateList) && operateList.length > 0" class="operator-box">
                                <i
                                    class="el-icon-rank operator-item"
                                    v-if="operate('drag', node)"
                                    @click.stop="iconClick(node, data, 'drag')"
                                ></i>
                                <i
                                    class="el-icon-plus operator-item"
                                    v-if="operate('add', node)"
                                    @click.stop="iconClick(node, data, 'add')"
                                ></i>
                                <i
                                    class="el-icon-edit operator-item"
                                    v-if="operate('edit', node)"
                                    @click.stop="iconClick(node, data, 'edit')"
                                ></i>
                                <i
                                    class="el-icon-switch-button operator-item"
                                    v-if="operate('close', node)"
                                    @click.stop="iconClick(node, data, 'close')"
                                ></i>
                                <i
                                    class="el-icon-video-play operator-item"
                                    v-if="operate('open', node)"
                                    @click.stop="iconClick(node, data, 'open')"
                                ></i>
                                <i
                                    class="el-icon-delete operator-item"
                                    v-if="operate('del', node)"
                                    @click.stop="iconClick(node, data, 'del')"
                                ></i>
                            </div>
                            <!-- 这里是查看更多 -->
                            <i v-if="operateList.length > 0" slot="reference" class="el-icon-more" />
                        </el-popover>
                    </span>
                </span>
            </el-tree>
        </div>
    </div>
</template>

<script>
import treeMethods from './setMethods';
export default {
    name: 'VTree',
    inheritAttrs: false,
    props: {
        // 不自动绑定  后期会监听数据
        treeData: {
            type: Array
            // required: true
        },
        // showSetting:{
        //     type:Boolean,
        //     default:true
        // },

        // 右侧操作按钮列表
        operateList: {
            type: [Array, Boolean],
            default: () => {
                return ['add', 'edit', 'del', 'drag'];
            }
        },

        // 第一级节点配置  （全部）
        topLevel: {
            type: [Array, Boolean],
            default: () => {
                // 值和 operateList 相同
                return [];
            }
        },
        // 配置节点的icon
        nodeIconFun: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            searchInput: true,
            filterText: ''
        };
    },
    watch: {
        // 树节点过滤
        filterText(val) {
            this.$refs.ElTreeRef.filter(val);
        }
    },
    mounted() {},
    methods: {
        ...treeMethods,
        setTreeAttr() {
            // 项目tree默认属性
            let defaultAttr = {
                // "default-expand-all": true, // 展开所有节点
                'highlight-current': true, // 高亮选中节点
                'empty-text': '暂无分类视图数据',
                'node-key': 'id',
                'expand-on-click-node': false, // 禁止点击节点时收缩展开节点
                'filter-node-method': this.filterNode,
                props: {
                    children: 'children',
                    label: 'name'
                } // 设置默认props
            };
            let attr = Object.assign(defaultAttr, this.$attrs);
            return attr;
        },
        // 设置树组件事件
        setEvents() {
            let event = Object.assign({}, this.$listeners);
            return event;
        },
        // 树节点过滤搜索
        filterNode(value, data) {
            if (!value) return true;
            // 通过props.label 取过滤的可以  默认name
            let opt = this.setTreeAttr().props.label;
            if (this.content === true) {
                return data.content.indexOf(value) !== -1;
            } else {
                return data[opt].indexOf(value) !== -1;
            }
        },

        /**
         * 新增编辑 删除事件
         */
        iconClick(node, data, type) {
            // console.log("node", node);
            // console.log("data", data);
            // console.log("type", type);
            this.$emit('operate', { node, data, type });
        },

        /**
         * 操作列显示判断
         */
        operate(type, node) {
            let id = node?.data?.id || 0;
            if (id === 0) {
                // console.log('this.topLevel.includes(type)', this.topLevel.includes(type))
                return this.topLevel.includes(type);
            } else {
                // console.log('this.operateList.includes(type)', this.operateList.includes(type))
                return this.operateList.includes(type);
            }
        },
        /**pop显示 */
        popShow(node, data) {
            this.$refs[`operatorBtn${data.id}`].style.visibility = 'visible';
        },
        /**pop隐藏 */
        popHide(node, data) {
            this.$refs[`operatorBtn${data.id}`].style.visibility = 'hidden';
        }
    }
};
</script>

<style lang="scss" scoped>
.tree-search-pack {
    padding: 10px;
}
.tree-component {
    height: 100%;
}
.tree-wrapper {
    height: 100%;
    flex: 1;
    overflow-y: auto;
}
.custom-tree-node {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .flex-box {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.operator-box {
    height: 32px;
    line-height: 32px;
}
.operator-item {
    cursor: pointer !important;
    text-align: center;
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;

    &:hover {
        color: $menuActive;
    }
}
</style>
