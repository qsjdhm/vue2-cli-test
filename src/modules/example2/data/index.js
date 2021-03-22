// 搜索相关
const FilterInfo = {
    data: {
        name: null,
        address: '',
        type: null,
        status: null,
        date: null,
        warningNumber: null
    },
    fieldList: [
        { label: '设备名称', type: 'input', value: 'name' },
        { label: '设备地址', type: 'select', value: 'address', list: 'addressList' },
        { label: '设备类型', type: 'select', value: 'type', list: 'equipTypeList' },
        { label: '启用状态', type: 'select', value: 'status', list: 'statusList' },
        { label: '入厂日期', type: 'date', value: 'date' },
        { label: '告警次数', type: 'inputNumber', value: 'warningNumber' }
    ],
    listTypeInfo: {
        addressList: [],
        equipTypeList: [],
        statusList: [
            { label: '未处理', value: 1 },
            { label: '处理中', value: 2 },
            { label: '已处理', value: 3 }
        ]
    }
};

// 列表相关
const TableInfo = {
    url: '/v1/iot/sensor/status/list',
    methods: 'GET',
    loading: false,
    data: [],
    // 表头
    columns: [
        /**单选 */
        // { type: "radio" },
        { label: '设备编号', prop: 'serialNo', align: 'left' },
        { label: '设备名称', prop: 'name', align: 'left', isCopy: true },
        { label: '设备类型', prop: 'typeDesc', align: 'left' },
        { label: '安装位置', prop: 'address', align: 'left' },
        { label: '入厂日期', prop: 'date', type: 'date', align: 'center', width: 150, format: 'YYYY-MM-DD HH:mm:ss' },
        { label: '状态', prop: 'status', type: 'slot', align: 'left' },
        { label: '操作', prop: 'operate', type: 'slot', align: 'center', width: 150 }
    ]
};

// 新增表单相关
const AddTableInfo = {
    ref: null,
    data: {
        serialNo: null,
        name: null,
        type: 33,
        ctlType: null,
        ctlValue: null,
        longitude: null,
        latitude: null,
        address: null,
        remarks: '',
        appType: 6
    },
    fieldList: [
        { label: '传感器编号', value: 'serialNo', type: 'input', required: true },
        { label: '名称', value: 'name', type: 'input', required: true },
        { label: '控制方式', value: 'ctlType', type: 'select', required: true, list: 'ctlTypeList' },
        { label: '经度', value: 'longitude', type: 'input', required: true },
        { label: '纬度', value: 'latitude', type: 'input', required: true },
        { label: '地址', value: 'address', type: 'input', required: true },
        { label: '备注', value: 'remarks', type: 'textarea', className: 'className' }
    ],
    rules: {
        serialNo: [{ required: true, message: '请输入编号', trigger: ['blur', 'change'] }],
        name: [{ required: true, message: '请输入名称', trigger: ['blur', 'change'] }],
        ctlType: [{ required: true, message: '请选中控制方式', trigger: ['blur', 'change'] }],
        longitude: [{ required: true, message: '请输入经度', trigger: ['blur', 'change'] }],
        latitude: [{ required: true, message: '请输入纬度', trigger: ['blur', 'change'] }],
        address: [{ required: true, message: '请输入地址', trigger: ['blur', 'change'] }]
    },
    listTypeInfo: {
        ctlTypeList: []
    }
};

// 编辑表单相关
const EditTableInfo = {
    ref: null,
    data: {
        id: null,
        serialNo: null,
        name: null,
        type: 33,
        ctlType: null,
        ctlValue: null,
        longitude: null,
        latitude: null,
        address: null,
        remarks: '',
        appType: 6
    },
    fieldList: [
        { label: '传感器编号', value: 'serialNo', type: 'input', required: true },
        { label: '名称', value: 'name', type: 'input', required: true },
        { label: '控制方式', value: 'ctlType', type: 'select', required: true, list: 'ctlTypeList' },
        { label: '经度', value: 'longitude', type: 'input', required: true },
        { label: '纬度', value: 'latitude', type: 'input', required: true },
        { label: '地址', value: 'address', type: 'input', required: true },
        { label: '备注', value: 'remarks', type: 'textarea', className: 'className' }
    ],
    rules: {
        serialNo: [{ required: true, message: '请输入编号', trigger: ['blur', 'change'] }],
        name: [{ required: true, message: '请输入名称', trigger: ['blur', 'change'] }],
        ctlType: [{ required: true, message: '请选中控制方式', trigger: ['blur', 'change'] }],
        longitude: [{ required: true, message: '请输入经度', trigger: ['blur', 'change'] }],
        latitude: [{ required: true, message: '请输入纬度', trigger: ['blur', 'change'] }],
        address: [{ required: true, message: '请输入地址', trigger: ['blur', 'change'] }]
    },
    listTypeInfo: {
        ctlTypeList: []
    }
};

// 查看表单相关
const ViewTableInfo = {
    data: [],
    /**表头 */
    columns: [
        { label: '传感器编号', prop: 'serialNo' },
        { label: '名称', prop: 'name' },
        { label: '控制方式', prop: 'ctlType' },
        { label: '经度', prop: 'longitude' },
        { label: '纬度', prop: 'latitude' },
        { label: '地址', prop: 'address' },
        { label: '备注', prop: 'remarks', isAllLine: true }
    ]
};

export { FilterInfo, TableInfo, AddTableInfo, EditTableInfo, ViewTableInfo };
