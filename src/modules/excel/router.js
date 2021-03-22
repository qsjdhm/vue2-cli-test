import Layout from '@/layout';

const excel = {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
        title: 'Excel',
        icon: 'excel'
    },
    children: [
        {
            path: 'export-excel',
            component: () => import('@/modules/excel/export-excel'),
            name: 'ExportExcel',
            meta: { title: 'ExportExcel' }
        },
        {
            path: 'export-selected-excel',
            component: () => import('@/modules/excel/select-excel'),
            name: 'SelectExcel',
            meta: { title: 'SelectExcel' }
        },
        {
            path: 'export-merge-header',
            component: () => import('@/modules/excel/merge-header'),
            name: 'MergeHeader',
            meta: { title: 'MergeHeader' }
        },
        {
            path: 'upload-excel',
            component: () => import('@/modules/excel/upload-excel'),
            name: 'UploadExcel',
            meta: { title: 'UploadExcel' }
        }
    ]
};

export default excel;
