import Layout from '@/layout';

const table = {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'Table',
    meta: {
        title: 'Table',
        icon: 'table'
    },
    children: [
        {
            path: 'dynamic-table',
            component: () => import('@/modules/table/dynamic-table/index'),
            name: 'DynamicTable',
            meta: { title: 'DynamicTable' }
        },
        {
            path: 'drag-table',
            component: () => import('@/modules/table/drag-table'),
            name: 'DragTable',
            meta: { title: 'DragTable' }
        },
        {
            path: 'inline-edit-table',
            component: () => import('@/modules/table/inline-edit-table'),
            name: 'InlineEditTable',
            meta: { title: 'InlineEditTable' }
        },
        {
            path: 'complex-table',
            component: () => import('@/modules/table/complex-table'),
            name: 'ComplexTable',
            meta: { title: 'ComplexTable' }
        }
    ]
};

export default table;
