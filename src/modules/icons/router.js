import Layout from '@/layout/index';

const icons = {
    path: '/icon',
    component: Layout,
    meta: { title: 'Icons', icon: 'icon' },
    alwaysShow: false,
    children: [
        {
            path: 'index',
            component: () => import('@/modules/icons/index'),
            name: 'Icons',
            meta: { title: 'Icons', icon: 'icon', noCache: true }
        }
    ]
};

export default icons;
