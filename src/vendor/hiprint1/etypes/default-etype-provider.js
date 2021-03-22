/* eslint-disable */
import { hiprint } from '../hiprint.bundle.js';
export const defaultElementTypeProvider = (function () {
    return function (options) {
        var addElementTypes = function (context) {
            context.addPrintElementTypes('testModule', [
                new hiprint.PrintElementTypeGroup('常规', [
                    {
                        tid: 'configModule.text',
                        title: '姓名',
                        // field: 'text',
                        data: '古力娜扎',
                        type: 'text'
                        // options: {
                        //     "height": 42,
                        //     "width": 107,
                        //     "fontSize": 19,
                        //     "fontWeight": "700",
                        //     "textAlign": "center",
                        //     "lineHeight": 39,
                        //     "hideTitle": true
                        // }
                    },
                    {
                        tid: 'configModule.image',
                        // field: 'image',
                        title: '图片',
                        data: require('@/vendor/hiprint1/css/image/example.png'),
                        type: 'image'
                    },
                    {
                        tid: 'configModule.longText',
                        title: '长文',
                        // field: 'longText',
                        data: '155123456789',
                        type: 'longText'
                    },
                    {
                        tid: 'configModule.qrcode',
                        title: '二维码',
                        // field: 'qrcode',
                        data: '123456789',
                        type: 'text',
                        textType: 'qrcode',
                        options: {
                            height: 50,
                            width: 50,
                            fontSize: 19,
                            fontWeight: '700',
                            textAlign: 'center',
                            lineHeight: 39,
                            hideTitle: true,
                            textType: 'qrcode'
                        }
                    },
                    {
                        tid: 'configModule.table',
                        // field: "table",
                        title: '表格',
                        type: 'table',
                        groupFields: ['name'],
                        groupFooterFormatter: function (group, option) {
                            return '这里自定义统计脚信息';
                        },
                        columns: [
                            [
                                {
                                    title: '行号',
                                    fixed: true,
                                    rowspan: 2,
                                    field: 'id',
                                    width: 70
                                },
                                {
                                    title: '人员信息',
                                    colspan: 2
                                },
                                {
                                    title: '销售统计',
                                    colspan: 2
                                }
                            ],
                            [
                                {
                                    title: '姓名',
                                    align: 'left',
                                    field: 'name',
                                    width: 100
                                },
                                {
                                    title: '性别',
                                    field: 'gender',
                                    width: 100
                                },
                                {
                                    title: '销售数量',
                                    field: 'count',
                                    width: 100
                                },
                                {
                                    title: '销售金额',
                                    field: 'amount',
                                    width: 100
                                }
                            ]
                        ]
                    },
                    {
                        tid: 'configModule.tableCustom',
                        title: '表格',
                        type: 'tableCustom'
                    },
                    {
                        tid: 'configModule.html',
                        title: 'html',
                        formatter: function (data, options) {
                            return $('div style="height:50pt;width:50pt;background:red;border-radius: 50%;"></div>');
                        },
                        type: 'html'
                    },
                    {
                        tid: 'configModule.customText',
                        title: '自定义文本',
                        customText: '自定义文本',
                        custom: true,
                        type: 'text'
                    }
                ]),
                new hiprint.PrintElementTypeGroup('辅助', [
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
                ])
            ]);
        };

        return {
            addElementTypes: addElementTypes
        };
    };
})();
