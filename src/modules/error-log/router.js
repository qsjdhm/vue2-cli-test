import Layout from '@/layout';

const errorLog = {
    path: '/error-log',
    component: Layout,
    meta: { title: 'ErrorLog', icon: 'bug' },
    children: [
        {
            path: 'log',
            component: () => import('@/modules/error-log/index'),
            name: 'ErrorLog',
            meta: { title: 'ErrorLog', icon: 'bug' }
        }
    ]
};

export default errorLog;
