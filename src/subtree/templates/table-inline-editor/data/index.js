/*
 * @Author: your name
 * @Date: 2020-12-15 10:10:14
 * @LastEditTime: 2021-02-23 16:42:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \donghong-mes-webd:\项目\vtcloud-cams2-web\src\modules\production-order\production-order\components\AddProductionOrder\data\index.js
 */


/**新增和编辑弹窗 --------------------------- start */
//form
const EditForm = {
    ref: null,
    data: {
        name: null,
        type: null,
        remarks: null,
    },
    fieldList: [{
            label: "数据模板名称",
            type: "slot",
            value: "name"
        },
        {
            label: "数据模板类型",
            type: "select",
            required: true,
            list: "typeList",
            value: "type"
        },
        {
            label: "备注",
            type: "textarea",
            value: "remarks",
            className: "className"
        },
    ],
    rules: {
        name: [{
            required: true,
            message: "请输入数据模板名称",
            trigger: ["blur", "change"],
        }, ],
        type: [{
            required: true,
            message: "请选择数据模板类型",
            trigger: ["blur", "change"],
        }, ],
    },
}
const FieldTableInfo = {
    data: [],
    /**表头 */
    columns: [{
            label: "字段名称",
            prop: "fieldName",
            type: "slot"
        },
        {
            label: "业务名称",
            prop: "fieldBizName",
            type: "slot"
        },
        {
            label: "类型",
            type: "slot",
            prop: "fieldType"
        },
        {
            label: "描述",
            type: "slot",
            width: 200,
            prop: "fieldDesc"
        },
        {
            label: "展现形式",
            type: "slot",
            prop: "showTypeArr"
        },
        {
            label: "操作",
            prop: "operate",
            type: "slot",
            align: "center",
            width: 80,
        },
    ],
}
/**新增和编辑弹窗 --------------------------- end */
export {
    EditForm,
    FieldTableInfo
}
