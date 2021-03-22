import Layout from '@/layout';

const theme = {
    path: '/theme',
    component: Layout,
    children: [
        {
            path: 'index',
            component: () => import('@/modules/theme/index'),
            name: 'Theme',
            meta: { title: 'Theme', icon: 'theme' }
        }
    ]
};

export default theme;
