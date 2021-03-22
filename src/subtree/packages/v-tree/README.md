## 组件内容

-   tree 顶部搜索
-   添加 tree 默认配置项

## 用法示例

```HTML
<v-tree
    ref="treeRef"
    :operate-list="['add','drag']"
    :tree-data="treeList"
    @operate="treeOperate"
/>

```

```js
// 使用el-tree 方法
// 方法列表基于element-ui 2.14.1 后期element有新方法可在setMenthods.js里添加
this.$refs['treeRef'].getCurrentNode()

/**
 * tree 右侧操作按钮emit
 */
treeOperate(obj){
    let {node, data,type}=obj
    console.log('-------------------')
    console.log('node', node)
    console.log('data', data)
    console.log('type', type)

},
```

### 字段说明 及配置项说明

-   treeData 表格数据

-   operateList: 右侧操作图标

    默认显示全部

    -   新增 add
    -   编辑 edit
    -   删除 del
    -   拖拽 drag (需要继续开发)

-   @operate 操作 emit 自定义事件
    返回参数说明
    -   node
    -   data
    -   type 操作按钮类型

### 封装代码说明

-   setTreeAttr

    -   通过 defaultAttr 和 this.$attrs 对属性做合并处理
    -   v-bind="setTreeAttr()" 自动绑定属性

-   setEvents
    -   通过 this.$listeners 接收要绑定的方法
    -   v-on="setEvents()" 自动绑定方法
