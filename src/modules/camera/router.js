import Layout from '@/layout';

const camera = {
    path: '/camera',
    component: Layout,
    redirect: '/camera/list',
    name: 'Camera',
    meta: {
        title: 'Camera',
        icon: 'bug'
    },
    children: [
        {
            path: 'list',
            component: () => import('@/modules/camera/list'),
            name: 'CameraList',
            meta: { title: 'CameraList' }
        }
    ]
};

export default camera;
