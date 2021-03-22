import Layout from '@/layout';

const example = {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
        title: 'Example',
        icon: 'bug'
    },
    children: [
        {
            path: 'create',
            component: () => import('@/modules/example/create'),
            name: 'CreateArticle',
            meta: { title: 'CreateArticle' }
        },
        {
            path: 'edit/:id(\\d+)',
            component: () => import('@/modules/example/edit'),
            name: 'EditArticle',
            meta: { title: 'EditArticle', noCache: true, activeMenu: '/example/list' },
            hidden: true
        },
        {
            path: 'list',
            component: () => import('@/modules/example/list'),
            name: 'ArticleList',
            meta: { title: 'ArticleList' }
        }
    ]
};

export default example;
