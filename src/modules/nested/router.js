import Layout from '@/layout';

const nested = {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
        title: 'Nested',
        icon: 'nested'
    },
    children: [
        {
            path: 'menu1',
            component: () => import('@/modules/nested/menu1/index'), // Parent router-view
            name: 'Menu1',
            meta: { title: 'Menu1' },
            redirect: '/nested/menu1/menu1-1',
            children: [
                {
                    path: 'menu1-1',
                    component: () => import('@/modules/nested/menu1/menu1-1'),
                    name: 'Menu1-1',
                    meta: { title: 'Menu1-1' }
                },
                {
                    path: 'menu1-2',
                    component: () => import('@/modules/nested/menu1/menu1-2'),
                    name: 'Menu1-2',
                    redirect: '/nested/menu1/menu1-2/menu1-2-1',
                    meta: { title: 'Menu1-2' },
                    children: [
                        {
                            path: 'menu1-2-1',
                            component: () => import('@/modules/nested/menu1/menu1-2/menu1-2-1'),
                            name: 'Menu1-2-1',
                            meta: { title: 'Menu1-2-1' }
                        },
                        {
                            path: 'menu1-2-2',
                            component: () => import('@/modules/nested/menu1/menu1-2/menu1-2-2'),
                            name: 'Menu1-2-2',
                            meta: { title: 'Menu1-2-2' }
                        }
                    ]
                },
                {
                    path: 'menu1-3',
                    component: () => import('@/modules/nested/menu1/menu1-3'),
                    name: 'Menu1-3',
                    meta: { title: 'Menu1-3' }
                }
            ]
        },
        {
            path: 'menu2',
            name: 'Menu2',
            component: () => import('@/modules/nested/menu2/index'),
            meta: { title: 'Menu2' }
        }
    ]
};

export default nested;
