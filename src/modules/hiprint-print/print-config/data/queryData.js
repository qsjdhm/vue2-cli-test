export const queryData = {
    data: [
        {
            title: '姓名',
            // tid: 'configModule.name',
            field: 'name'
        },
        {
            title: '个人网页',
            // tid: 'configModule.qrcode',
            field: 'qrcode'
        },
        {
            title: '性别',
            // tid: 'configModule.gender',
            field: 'gender'
        },
        {
            title: '爱好',
            // tid: 'configModule.like',
            field: 'like'
        },
        {
            // tid: 'configModule.c',
            title: '图片',
            // data: '/Content/assets/hi.png',
            field: 'image'
        },
        {
            // tid: 'configModule.c',
            title: '表格',
            // data: '/Content/assets/hi.png',
            field: 'table',
            columns: [
                {
                    title: '职位',
                    align: 'center',
                    field: 'position',
                    width: 100
                },
                {
                    title: '公司',
                    align: 'center',
                    field: 'company',
                    width: 100
                },
                {
                    title: '地点',
                    align: 'center',
                    field: 'address',
                    width: 100
                },
                {
                    title: '时间',
                    align: 'center',
                    field: 'date',
                    width: 100
                },
                {
                    title: '主要工作',
                    align: 'center',
                    field: 'work',
                    width: 200
                }
            ]
        }
    ]
};
export const auxiliaryData = [
    {
        tid: 'configModule.hline',
        title: '横线',
        type: 'hline'
    },
    {
        tid: 'configModule.vline',
        title: '竖线',
        type: 'vline'
    },
    {
        tid: 'configModule.rect',
        title: '矩形',
        type: 'rect'
    },
    {
        tid: 'configModule.oval',
        title: '椭圆',
        type: 'oval'
    }
];
