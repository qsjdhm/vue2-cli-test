/*
 * @Author: your name
 * @Date: 2021-02-20 15:44:13
 * @LastEditTime: 2021-02-23 15:59:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \donghong-mes-webd:\项目\vtcloud-tpm-web\src\modules\equip-info-manage\equip-ledger\support-tools\chose-to-equips\data\index.js
 */
const filterInfo = {
    data: {
        search: null,
        status: null,
        arrival: null,
        repairExpiration: null
    },
    fieldList: [{
            label: '关键字',
            type: 'input',
            value: 'search'
        },
        {
            label: '状态',
            type: 'select',
            value: 'status',
            list: 'statusList'
        },
        {
            label: '入厂日期',
            type: 'date',
            value: 'arrival',
            dateType: 'daterange'
        },
        {
            label: '截止日期',
            type: 'date',
            value: 'repairExpiration',
            dateType: 'daterange'
        }
    ]
}
const tableInfo = {
    loading: false,
    data: [],
    /**表头*/
    columns: [{
            label: '设备名称',
            prop: 'name'
        },
        {
            label: '设备编号',
            prop: 'code'
        },
        {
            label: '型号',
            prop: 'model'
        },
        {
            label: '制造商',
            prop: 'supplierName'
        },
        {
            label: '入厂日期',
            prop: 'arrivalDate',
            type: 'date',
            width: 140,
            align: 'center',
            format: 'YYYY-MM-DD HH:mm:ss'
        },
        {
            label: '保修截止日期',
            prop: 'repairExpirationDate',
            type: 'date',
            width: 140,
            align: 'center',
            format: 'YYYY-MM-DD HH:mm:ss'
        },
        {
            label: '状态',
            prop: 'status',
            type: 'slot',
            width: 100
        },
        {
            label: '责任人',
            prop: 'responsiblePersons'
        }
    ]
}
export {
    filterInfo,
    tableInfo
}
