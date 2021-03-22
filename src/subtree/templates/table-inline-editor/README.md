# 选择设备

## 1.使用

```html
<EditForTable ref="EditForTable" :editInfo="editInfo" :list-type-info="listTypeInfo" @hanleConfirm="getTableList" />
```

```javascript
import EditForTable from './components/EditForTable/index';
export default {
    components: {
        EditForTable
    },
    data() {
        return {
            /**编辑传给组件数据*/
            editInfo: {},
            //搜索列表
            listTypeInfo: {
                statusList: [],
                typeList: [
                    { value: 1, label: '设备数据' },
                    { value: 2, label: '工艺数据' },
                    { value: 3, label: '程序 ' },
                    { value: 4, label: '指令' }
                ],
                fieldTypeList: [
                    { value: 'Integer', label: '整型' },
                    { value: 'Float', label: '字符型' },
                    { value: 'file', label: '文件 ' },
                    { value: 'String', label: '字符串' }
                ],
                showTypeList: []
            }
        };
    },
    mounted() {
        /**获取表格数据*/
        this.getTableList();
    },
    methods: {
        /**获取表格数据*/
        getTableList() {
            this.tableInfo.loading = true;
            let query = {
                pageNum: this.pagination.pageNum,
                pageSize: this.pagination.pageSize,
                ...this.filterData
            };
            console.log(this.$global);
            this.$service('POST', this.$global.scada + '/api/template/page', query).then((res) => {
                this.tableInfo.data = _.cloneDeep(res.list);
                this.pagination.total = res.total;
                this.tableInfo.loading = false;
            });
        }
    }
};
```

## 2.api

| 参数       | 类型    | 默认值 | 说明                              |
| ---------- | ------- | ------ | --------------------------------- |
| visible    | Boolean | false  | 弹窗开关，绑定该属性时需加上.sync |
| selectData | Array   | []     | 已选数据回传                      |
| chooseType | String  | radio  | 选择类型                          |

## 3.简单使用

单选 & 无回传数据

```html
<template>
    <div>
        <choseToEquips :visible.sync="Equips.visible" @confirm="confirmEquips" />
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

-   2021-2-20<br>

1. chose-to-codeRule 重构并迁移到对应业务之中
2. 整理组件文档
