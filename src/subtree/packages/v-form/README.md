# Form 表单使用教程及规范

## 页面使用 示例

```html
<v-form
    :ref-obj.sync="formInfo.ref"
    :data="formInfo.data"
    :field-list="formInfo.fieldList"
    :rules="formInfo.rules"
    :list-type-info="listTypeInfo"
    @handleEvent="handleEvent"
/>
```

-   ref (必传， 默认为 null)
-   data (数据字段， 必传) `Object`
-   fieldList (字段配置项， 必传) `Array`
-   rules (验证规则， 非必传) `Object`
-   listTypeInfo (数据配置项， 非必传) `Object`
-   labelWidth (label 宽度， 默认 100. 非必传) `String`
-   labelPosition (label 位置， 默认'top', 非必传) `String`
-   whetherDisabled (是否禁用所有， 弹框查看时传入 'view' 即可. 非必传) `String`
-   handleEvent (事件触发， 非必须， 表单联动可用) `Function`

> 推荐写法：将表单及表格数据配置项单独抽离出去。数据模板更轻量

```js
data () {
    return {
        /**表单数据 */
        formInfo: _.cloneDeep(Data.FormInfo)，
        listTypeInfo: _.cloneDeep(Data.ListTypeInfo)
    }
}
```

```js
// Data 文件
const FormInfo = {
    ref: null,
    data: {
        /**
         * 必填，后续编辑需要用到的字段
         * 其余字段根据业务需求自行配置
         */
        id: null,
        name: null,
        array: [],
        code: null
        ...
    },
    /**
     * fieldList 配置项说明：
     * label: 展示字段
     * value: 定义字段， 前后端交互
     * type: 表单项类型
     * required: 必传项
     * slot: 插槽
     * list: 下拉list
     * className: 样式名，一行撑满时使用: 'el-form-block'
     * disabled: 是否禁用  true/false
     * clearable: 是否可清空   true/false
     * placeholder: 展示placeholder 非必传 未传将使用label字段处理
     * maxlength： 输入内容限制长度 非必填
     * ...
     */
    fieldList: [
        {
            label: '姓名',
            value: 'name',
            type: 'input',
            required: true
            ...
        }
    ],
    /**验证规则 */
    rules: {
        name: [{required: true, message: '请输入姓名', trigger: ['blur', 'change']}],
        ...
    }
}
/**下拉选需要用到此字段 */
const ListTypeInfo = {
    statusList: []
}

export default {
    FormInfo,
    ListTypeInfo
}
```

## 页面使用方法

```js
/**
 * 监听弹框
 * 关闭时清空默认值
 * 关闭loading（如有?）
 * this.$nextTick 为规定写法，否则第一次获取不到 ref 。
 * !注: 级联选择, 手动清空数组
 */
watch: {
    formDialog (v) {
        this.$nextTick(() => {
            const formRule = this.formInfo.ref
            if (!v) {
                formRule.resetFields()
                this.loading = false
            }
        })
    }
}

methods: {
    /**
     * @func 表单联动
     * @param {Object} obj
     * @desc 📝当前行 form 项失去焦点时获取 value 和 字段名
     */
    handleEvent (obj) {
        console.log(obj);
    },
    /**
     * @func 新增弹框打开
     * @desc 📝
     */
    handleCreate () {
        this.dialogTitle = 'create'
        this.formDialog = true
    },
    /**
     * @func 编辑时需要注意
     * @param {Object} row
     * @desc 📝this.$nextTick 规定写法。 否则会发生赋值错误
     */
    handleEdit (row) {
        this.dialogTitle = 'edit'
        this.formDialog = true
        // !打开弹框之后赋值
        this.$nextTick(() => {
            this.formInfo.data = {...row}
        })
    },
    /**
     * @func 弹框关闭
     * @desc 📝
     */
    handleFormCancel () {
        this.formDialog = false
    },
    /**
     * @func 保存/确定
     * @desc 📝可自行配置
     * @desc 推荐写法: 根据 dialogTitle 调用不同接口即可
     */
    handleFormConfirm () {
        const query = {...this.formInfo.data}
        this.formInfo.ref.validate(async valid => {
            try {
                if (valid) {
                    this.loading = true
                    if (this.dialogTitle === 'create') {
                        /**新增时不需要id */
                        delete query.id
                        let res = await this.$service('post', '/api/tenant', query)
                    } else {
                        let res = await this.$service('put', '/api/tenant', query)
                    }
                    this.$message.success(this.dialogTitle === 'create' ? '新增成功' : '编辑成功')
                    this.formDialog = false
                    this.$refs.bsTable.searchClick()
                }
            } catch (error) {
                this.loading = false
            }
        })
    }
}
```

**发掘更多玩法， 请看 `VForm` 源码**
