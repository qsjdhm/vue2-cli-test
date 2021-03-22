<!--
 * @Author: your name
 * @Date: 2021-03-01 10:48:44
 * @LastEditTime: 2021-03-01 14:07:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \donghong-mes-webd:\项目\vtcloud-tpm-web\src\modules\basic-data\business-archives\support-tools\chose-to-customer\README.md
-->
# 选择客商

## 1.使用
```html

<choseToCustomer
    ref="choseToCustomer"
    :visible.sync="visible"
    :choose-type="chooseType"
    :select-data="selectData"
    @confirm="confirmCustomer"
/>

```
```javascript

import choseToCustomer from '@/modules/basic-data/business-archives/support-tools/chose-to-customer'
export default {
    components: {
        choseToCustomer
    },
    data() {
        return {
            visible: false,
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
        }
    }
}

```

## 2.api
|参数|类型|默认值|说明|
| - | - | - | - |
| visible            | Boolean    | false       | 弹窗开关，绑定该属性时需加上.sync |
| selectData         | Array      | []          | 已选数据回传 |
| chooseType         | String     | radio       | 选择类型 |

## 3.简单使用
单选 & 无回传数据
```html

<template>
    <div>
        <choseToCustomer
            :visible.sync="Customer.visible"
            @confirm="confirmCustomer"
        />
    </div>
</template>

```
```javascript
import choseToCustomer from '@/modules/basic-data/business-archives/support-tools/chose-to-customer'
export default {
    components: {
        choseToCustomer
    },
    data() {
        return {
            Customer: {
                visible: false,
                data: {},
            },
        }
    }
    methods: {
        confirmCustomer(data) {
            this.selectData = _.cloneDeep(data)
        }
    }
}

## 4.更新日志
- 2021-3-1<br>
1. 构建