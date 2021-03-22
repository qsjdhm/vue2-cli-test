import Layout from '@/layout';

const tab = {
    path: '/tab',
    component: Layout,
    children: [
        {
            path: 'index',
            component: () => import('@/modules/tab/index'),
            name: 'Tab',
            meta: { title: 'Tab', icon: 'tab' }
        }
    ]
};

export default tab;
