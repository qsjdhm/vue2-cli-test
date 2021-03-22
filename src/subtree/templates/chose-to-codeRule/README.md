# 选择编码规则

## 1.使用
```html

<choseToCodeRule
    ref="choseToCodeRule"
    :params="params"
    :visible.sync="visible"
    :choose-type="chooseType"
    :slelect-data="selectData"
    @confirm="confirm"
/>

```
```javascript

import choseToCodeRule from '@/modules/basic-data/encoding-rules/project-custom/chose-to-codeRule'
export default {
    components: {
        choseToCodeRule
    },
    data() {
        return {
            visible: false,
            params: {
                name: 'name'
            },
            selectData: [],
            // 选择类型
            chooseType: 'radio' // 多选: checked 单选: radio(默认)
        }
    }
    methods: {
        // 确定事件
        confirm(data) {
            console.log(data)
            this.selectData = _.cloneDeep(data)
        },
        // 取消事件
        cancel() {
            console.log('cancel')
        },
    }
}

```

## 2.api
|参数|类型|默认值|说明|
| - | - | - | - |
| visible            | Boolean    | false       | 弹窗开关，绑定该属性时需加上.sync |
| params             | Object     | {}          | 必填参数 唯一值 name |
| —— name            | Fixed      | -           | 必填参数-选择的业务名称 |
| selectData        | Array      | []          | 已选数据回传 |
| chooseType         | String     | radio       | 选择类型 |

## 3.简单使用
单选 & 无回传数据   *params.name必填
```html

<template>
    <div>
        <choseToCodeRule
            :params="{ name: ... }"
            :visible="CodeRule.visible"
            @confirm="confirmCodeRule"
        />
    </div>
</template>

```
```javascript
import choseToCodeRule from '@/modules/basic-data/encoding-rules/project-custom/chose-to-codeRule'
export default {
    components: {
        choseToCodeRule
    }
    data() {
        CodeRule: {
            visible: false
        }
    }
    methods: {
        confirmCodeRule(data) {
            this.formInfo.data.codeRule = _.cloneDeep(data)
        }
    }
}
```
## 4.更新日志
- 2021-2-3<br>
1. chose-to-codeRule 重构并迁移到对应业务之中
- 2021-2-4<br>
1. 整理组件文档
- 2021-2-7<br>
1. 确定与取消的方法回调中 使用 this.$emit('update:visible', false) 的方式，所以在父组件不用再处理visible的状态。现在在使用时只需要绑定一个confirm方法即可。（cancel绑定依旧生效，若有点击弹窗取消按钮关联事件，cancel方法可用）