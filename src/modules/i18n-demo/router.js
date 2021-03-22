import Layout from '@/layout';

const i18n = {
    path: '/i18n',
    component: Layout,
    children: [
        {
            path: 'index',
            component: () => import('@/modules/i18n-demo/index'),
            name: 'I18n',
            meta: { title: 'I18n', icon: 'international' }
        }
    ]
};

export default i18n;
