import Layout from '@/layout';

const example3 = {
    path: '/example3',
    component: Layout,
    redirect: '/example3/list',
    name: 'Example3',
    meta: {
        title: 'Example3',
        icon: 'bug'
    },
    children: [
        {
            path: 'list',
            component: () => import('@/modules/example3/list'),
            name: 'EquipmentLedgerTree',
            meta: { title: 'EquipmentLedgerTree' }
        }
    ]
};

export default example3;
