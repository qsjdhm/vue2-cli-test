import Layout from '@/layout';

const clipboard = {
    path: '/clipboard',
    component: Layout,
    meta: { title: 'Clipboard', icon: 'clipboard' },
    children: [
        {
            path: 'index',
            component: () => import('@/modules/clipboard/index'),
            name: 'ClipboardDemo',
            meta: { title: 'ClipboardDemo', icon: 'clipboard' }
        }
    ]
};

export default clipboard;
