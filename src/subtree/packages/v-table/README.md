# v-table

通用表格组件

## 1.使用

```html
<v-table
    ref="VTable"
    key="VTable"
    :data="tableInfo.data"
    :columns="tableInfo.columns"
    :loading="tableInfo.loading"
    :pagination="pagination"
    :hideConfig="tableInfo.hideConfig"
    :merge="tableInfo.merge"
    :split="tableInfo.split"
    @handleSelect="handleSelect"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
>
    <template #table-status="{scope}">
        <el-switch v-model="scope.row.status" />
    </template>
    <template #table-operate>
        <el-table-column min-width="120px" :width="80" fixed="right" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleDelNorm(scope.row)">删除 </el-button>
            </template>
        </el-table-column>
    </template>
</v-table>
```

```javascript
// table.vue
import LogicMixin from '@/plugins/mixins/logic';
import { tableInfo } from './data';
export default {
    /**
     * Mixin 混入了搜索, 重置, 刷新, 分页.
     * 特殊情况自行配置, 多谢 👏
     */
    mixins: [LogicMixin],
    data() {
        return {
            tableInfo: _.cloneDeep({ ...tableInfo }),
            selectionData: []
        };
    },
    mounted() {
        this.getTableList();
    },
    methods: {
        /**
         * table
         * 获取表格数据的方法名 固定使用 getTableList
         */
        // getData
        async getTableList() {
            let query = {
                pageNum: this.pagination.pageNum,
                pageSize: this.pagination.pageSize,
                ...this.filterData // 搜索相关
            };
            let res = await this.$service('POST', this.$global.bus + '/api/url...', query);
            this.pagination.total = res.total;
            this.tableInfo.data = _.cloneDeep(res.list);
        },
        // 表格选择
        handleSelect(data) {
            this.selectData = _.cloneDeep(data);
        }
    }
};
```

```javascript

// data.js
const tableInfo = {
    columns: [
        {
            label: '启用状态',
            prop: 'status',
            type: 'slot',
            align: 'center',
            width: 100
        },
        {
            label: '编码',
            prop: 'code',
            type: 'input'
        },
        {
            label: '名称',
            prop: 'name',
            type: 'input'
        },
        {
            label: '状态',
            prop: 'state',
            type: 'formatter',
          	formatter: setStateValue(row)
        },
        {
            label: '创建人',
            prop: 'userName',
            type: 'input'
        },
        {
            label: '创建时间',
            prop: "createTime",
            type: 'date',
            align: 'center',
            format: 'YYYY-MM-DD HH:mm:ss'
        },
        {
            label: '备注',
            prop: 'remarks',
            type: 'input'
        }
    ],
    data: [],
    loading: false,
    merge: ['userName'],
    split: ['remarks'],
}

setStateValue(row) {
  	let stateValue = ''
		switch(row.state) {
    case 1:
    	stateValue = '新建'
        break;
    case 2:
        stateValue = '审核中'
        break;
    case 3:
        stateValue = '审核通过'
        break;
    default:
        stateValue = ''
    }
  	return stateValue
}

export {
    tableInfo
}

```

## 2.api

| 参数          | 类型    | 默认值     | 说明                                                                        |
| ------------- | ------- | ---------- | --------------------------------------------------------------------------- |
| data          | Array   | []         | 表格数据                                                                    |
| columns       | Array   | []         | 表头数据                                                                    |
| chooseType    | String  | checked    | 选择类型                                                                    |
| loading       | Boolean | false      | 表格加载动画开关                                                            |
| pagination    | Object  | {}         | 分页配置项                                                                  |
| —— pageNum    | Number  | -          | 分页配置项-当前页                                                           |
| —— pageSize   | Number  | -          | 分页配置项-每页条数                                                         |
| —— total      | Number  | -          | 分页配置项-总数量                                                           |
| hideConfig    | Array   | ['serial'] | 隐藏配置 可用值['pagination', 'invert', 'serial'] 默认隐藏序号列            |
| —— pagination | Fixed   | -          | 隐藏配置-分页功能                                                           |
| —— invert     | Fixed   | -          | 隐藏配置-反选功能                                                           |
| —— serial     | Fixed   | -          | 隐藏配置-序号                                                               |
| merge         | Array   | []         | 合并单元格 针对所传列 prop 字段进行合并单元格                               |
| split         | Array   | []         | 拆分单元格 针对所传列 prop 字段进行拆分单元格，对应数据必须是可循环处理数据 |
| selectData    | Array   | []         | 表格回显数据                                                                |

## 3.更新日志

-   2021-02-04<br>

1. v-table 组件重构
2. 整理组件文档

-   2021-02-05<br>

1. 提供了表格回显功能
2. 只保留 handleSelect 方法做为表格选择事件（将单选，多选，全选，反选，合并为一个抛出使用）

-   2021-02-06<br>

1. columns 中 新增两种类型 formatter & date
   type = formatter (自定义格式化数据); 通过参数 formatter 绑定一个函数 return 得到自己想展示的内容
   type = date (moment 时间格式); 可以设置参数 format 设备 moment 转换类型 默认为'YYYY-MM-DD'
2. 删除文档中使用插槽修改时间类型的代码

-   2021-02-07<br>

1. 新增单元格拆分功能 split： 拆分单元格 针对所传列 prop 字段进行拆分单元格，对应数据必须是可循环处理数据
   拆分单元格与合并单元格的区别
   合并单元格： 如 3 条数据某一列合并单元格 只是将相同数据合并显示 会保留三个操作列与三个选择框
   拆分单元格： 如 1 条数据某一列拆分单元格 只是将这条数据循环处理 只会有一个操作列和一个选择框
