/*
 * @Author: your name
 * @Date: 2021-02-03 17:46:16
 * @LastEditTime: 2021-02-20 15:50:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \donghong-mes-webd:\项目\vtcloud-tpm-web\src\modules\basic-data\encoding-rules\project-custom\chose-to-codeRule\data\index.js
 */
const filterInfo = {
    data: {
        name: null,
    },
    fieldList: [{
        label: '编码规则/名称',
        type: 'input',
        value: 'name'
    }, ]
}
const tableInfo = {
    loading: false,
    data: [],
    // 表头
    columns: [{
            label: "编码规则",
            prop: "code"
        },
        {
            label: "编码规则名称",
            prop: "name"
        },
    ]
}
export {
    filterInfo,
    tableInfo
}
