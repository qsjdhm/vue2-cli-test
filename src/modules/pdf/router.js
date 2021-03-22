import Layout from '@/layout';

const pdf = {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
        {
            path: 'index',
            component: () => import('@/modules/pdf/index'),
            name: 'PDF',
            meta: { title: 'PDF', icon: 'pdf' }
        },
        {
            path: 'download',
            component: () => import('@/modules/pdf/download'),
            hidden: true
        }
    ]
};

export default pdf;
