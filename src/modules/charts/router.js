import Layout from '@/layout';

const charts = {
    path: '/charts',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Charts',
    meta: {
        title: 'Charts',
        icon: 'chart'
    },
    children: [
        {
            path: 'keyboard',
            component: () => import('@/modules/charts/keyboard'),
            name: 'KeyboardChart',
            meta: { title: 'KeyboardChart', noCache: true }
        },
        {
            path: 'line',
            component: () => import('@/modules/charts/line'),
            name: 'LineChart',
            meta: { title: 'LineChart', noCache: true }
        },
        {
            path: 'mix-chart',
            component: () => import('@/modules/charts/mix-chart'),
            name: 'MixChart',
            meta: { title: 'MixChart', noCache: true }
        }
    ]
};

export default charts;
