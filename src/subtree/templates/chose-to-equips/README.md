# 选择设备

## 1.使用
```html

<choseToEquips
    ref="choseToEquips"
    :visible.sync="visible"
    :choose-type="chooseType"
    :select-data="selectData"
    @confirm="confirmEquipPart"
/>

```
```javascript

import choseToEquips from '@/modules/equip-info-manage/equip-ledger/support-tools/chose-to-equips'
export default {
    components: {
        choseToEquips
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
        <choseToEquips
            :visible.sync="Equips.visible"
            @confirm="confirmEquips"
        />
    </div>
</template>

```
```javascript
import choseToEquips from '@/modules/equip-info-manage/equip-ledger/support-tools/chose-to-equips'
export default {
    components: {
        choseToEquips
    },
    data() {
        return {
            Equips: {
                visible: false
            }
        }
    }
    methods: {
        confirmEquips(data) {
            this.selectData = _.cloneDeep(data)
        }
    }
}
```
## 4.更新日志
- 2021-2-20<br>
1. chose-to-codeRule 重构并迁移到对应业务之中
2. 整理组件文档