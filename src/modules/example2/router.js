import Layout from '@/layout';

const example2 = {
    path: '/example2',
    component: Layout,
    redirect: '/example2/list',
    name: 'Example2',
    meta: {
        title: 'Example2',
        icon: 'bug'
    },
    children: [
        {
            path: 'list',
            component: () => import('@/modules/example2/list'),
            name: 'EquipmentLedger',
            meta: { title: 'EquipmentLedger' }
        }
    ]
};

export default example2;
