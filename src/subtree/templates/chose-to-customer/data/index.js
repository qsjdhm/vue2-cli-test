/*
 * @Author: your name
 * @Date: 2021-02-20 15:44:13
 * @LastEditTime: 2021-03-01 11:35:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \donghong-mes-webd:\项目\vtcloud-tpm-web\src\modules\equip-info-manage\equip-ledger\support-tools\chose-to-equips\data\index.js
 */
const filterInfo = {
    data: {
        search: null,
        isForeign: null,
        enterpriseType: null,
    },
    fieldList: [{
            label: "关键词搜索",
            type: "input",
            value: "search",
        },
        {
            label: "是否国外企业",
            type: "select",
            list: "foreginList",
            value: "isForeign",
        },
        // {
        //     label: "企业类型",
        //     type: "select",
        //     list: "enterpriseTypeList",
        //     value: "enterpriseType",
        // },
    ]
}
const tableInfo = {
    loading: false,
    data: [],
    /**表头*/
    columns: [{
            label: "编码",
            prop: "no",
            width: 180,
            sortable: true,
        },
        {
            label: "商家名称",
            prop: "name",
        },
        {
            label: "商家简称",
            prop: "shortName",
        },
        {
            label: "地区编码",
            prop: "areaCode",
            align: "right",
        },
        {
            label: "地址",
            prop: "address",
        },
        {
            label: "联系人",
            prop: "contactPerson",
        },
        {
            label: "电话",
            prop: "telephone",
            align: "right",
        },
        {
            label: "是否国外企业",
            prop: "isForeign",
            type: "slot",
            align: "center",
        },
        {
            label: "企业类型",
            prop: "enterpriseTypeName",
        },
        // {
        //     label: "状态",
        //     prop: "status",
        //     type: "slot",
        //     align: "center",
        //     width: 100,
        // },
    ]
}
export {
    filterInfo,
    tableInfo
}
