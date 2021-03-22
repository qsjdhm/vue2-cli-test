import Layout from '@/layout';

const zip = {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
        {
            path: 'download',
            component: () => import('@/modules/zip/index'),
            name: 'ExportZip',
            meta: { title: 'ExportZip' }
        }
    ]
};

export default zip;
