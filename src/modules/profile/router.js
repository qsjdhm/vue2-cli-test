import Layout from '@/layout';

const profile = {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
        {
            path: 'index',
            component: () => import('@/modules/profile/index'),
            name: 'Profile',
            meta: { title: 'Profile', icon: 'user', noCache: true }
        }
    ]
};

export default profile;
