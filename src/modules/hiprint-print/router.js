import Layout from '@/layout';

const hiprintPrint = {
    path: '/hiprintPrint',
    name: 'HiprintPrint',
    component: Layout,
    redirect: '/hiprintPrint/print-template',
    meta: {
        title: 'HiprintPrint',
        icon: 'excel'
    },
    alwaysShow: true,
    children: [
        {
            path: 'print-template',
            name: 'PirntTemplate',
            component: () => import('@/modules/hiprint-print/print-template'),
            meta: {
                title: 'PirntTemplate'
            }
        },
        {
            path: 'print-config',
            name: 'PirntConfig',
            component: () => import('@/modules/hiprint-print/print-config'),
            meta: {
                title: 'PirntConfig'
            }
        }
    ]
};

export default hiprintPrint;
