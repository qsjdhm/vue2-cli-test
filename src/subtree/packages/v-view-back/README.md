# 详情标题组件

## 1.vue 文件中使用

```html
<v-view-back :name="titleName" :return-path="returnPath" />
```

```javascript
data () {
    return {
        /**标题名称 */
        titleName: '编辑流程',
        /**返回路由 */
        returnPath: '/basicData/craftsRoute'
    }
}
```

## 2.api

| 参数       | 说明     |
| ---------- | -------- |
| name       | 标题名称 |
| returnPath | 返回路由 |

## 3.更新日志

-   2020-05-18 17:07<br> 1.新增详情标题组件
-   2020-05-18 17:34<br> 1.修改样式
-   2020-05-21<br> 1.返回时间新增删除当前 tagview 功能
