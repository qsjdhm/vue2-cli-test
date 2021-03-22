# Filter 新版搜索组件

## 页面使用 示例

```html
<v-filter
    :data="filterInfo.data"
    :field-list="filterInfo.fieldList"
    :list-type-info="listTypeInfo"
    :btn-hidden="filterInfo.btnHidden"
    @handleSearch="handleSearch"
    @handleReset="handleReset"
    @handleEvent="handleEvent"
>
    <template #filter-插槽名称="{scope}"> ... </template>
</v-filter>
```

-   data (字段数据, **必传**) `Object`
-   field-list (字段配置项, **必传**) `Array`
-   list-type-info (下拉数据配置, **非必传**) `Object`
-   btn-hidden (按钮区域是否隐藏,默认 `false`. **非必传**) `Boolean`
-   searchBtn (搜索按钮是否禁用, 默认 `false`. **非必传**) `Boolean`
-   resetBtn (重置按钮是否禁用, 默认 `false`. **非必传**) `Boolean`
-   count (搜索条件数量, 默认 4. **非必传**) `Number` - _新增_
-   handleSearch (搜索按钮点击事件)
-   handleReset (重置按钮点击事件)
-   handleEvent (事件触发, 可用于联动)

## 数据样例

```js
filterInfo: {
    data: {
        name: null,
        age: null,
        sex: 1,
        date: null,
        dateTime: null,
        range: null
    },
    /**
     * 配置项可参考 form 组件
     * ...
     */
    fieldList: [
        { label: '姓名', type: 'input', value: 'name' },
        { label: '年龄', type: 'input', value: 'age', disabled: true },
        { label: '性别', type: 'select', value: 'sex', list: 'sexList' },
        { label: '日期', type: 'date', value: 'date' },
        { label: '插槽', type: 'slot', value: 'slot' },
        { label: '创建时间', type: 'date', value: 'dateTime', dateType: 'datetime', clearable: true  },
        { label: '时间区间', type: 'date', value: 'range', dateType: 'daterange' },
    ],
    /**搜索/重置区域是否隐藏 */
    // btnHidden: true
},
listTypeInfo: {
    sexList: [
        { id: 1, name: '男' },
        { id: 2, name: '女' },
        { id: 3, name: '保密' },
    ]
}
```

## 方法调用示例

```js
/**搜索 */
handleSearch (row) {
    console.log(row);
},
/**重置 */
handleReset (row) {
    console.log(row);
},
/**焦点失去事件 */
handleEvent (row) {
    console.log(row);
}
```
