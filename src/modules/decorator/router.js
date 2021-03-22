import Layout from '@/layout';

const decorator = {
    path: '/decorator',
    component: Layout,
    redirect: '/decorator/index',
    name: 'Decorator',
    meta: {
        title: 'Decorator',
        icon: 'el-icon-s-help'
    },
    children: [
        {
            path: 'index',
            component: () => import('@/modules/decorator/index'),
            name: 'DecoratorIndex',
            meta: { title: 'DecoratorIndex', icon: 'list' }
        }
    ]
};

export default decorator;
