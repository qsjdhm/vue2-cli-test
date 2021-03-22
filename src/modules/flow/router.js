import Layout from '@/layout';

const flow = {
    path: '/flow',
    name: 'Flow',
    component: Layout,
    redirect: '/flow/index',
    meta: {
        title: 'Flow',
        icon: 'excel'
    },
    children: [
        {
            path: 'index',
            name: 'FlowIndex',
            component: () => import('@/modules/flow/index'),
            meta: {
                title: 'FlowIndex'
            }
        }
    ]
};

export default flow;
