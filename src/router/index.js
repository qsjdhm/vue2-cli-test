import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout';

Vue.use(Router);

// 1. 固定路由，当前系统可以直接访问的页面
export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/modules/dashboard/index'),
                name: 'Dashboard',
                meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/pages/login/index'),
        hidden: true
    },
    // {
    //     path: '/profile',
    //     component: Layout,
    //     redirect: '/profile/index',
    //     hidden: true,
    //     children: [
    //         {
    //             path: 'index',
    //             component: () => import('@/views/profile/index'),
    //             name: 'Profile',
    //             meta: { title: 'Profile', icon: 'user', noCache: true }
    //         }
    //     ]
    // },
    {
        path: '/404',
        component: () => import('@/pages/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/pages/error-page/401'),
        hidden: true
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/pages/redirect/index')
            }
        ]
    },
    {
        path: '/auth-redirect',
        component: () => import('@/pages/login/auth-redirect'),
        hidden: true
    }
    // {
    //     path: '/documentation',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'index',
    //             component: () => import('@/views/documentation/index'),
    //             name: 'Documentation',
    //             meta: { title: 'Documentation', icon: 'documentation', affix: true }
    //         }
    //     ]
    // },
    // {
    //     path: '/guide',
    //     component: Layout,
    //     redirect: '/guide/index',
    //     children: [
    //         {
    //             path: 'index',
    //             component: () => import('@/views/guide/index'),
    //             name: 'Guide',
    //             meta: { title: 'Guide', icon: 'guide', noCache: true }
    //         }
    //     ]
    // },
];

// 2. 通过require.context动态加载modules目录下的路由文件，组织业务模块路由数据
let routerList = [];
const moduleList = require.context('@/modules', true, /router.js$/);

moduleList.keys().forEach((modulePath) => {
    const routerItem = moduleList(modulePath).default;
    routerList.push(routerItem);
});
// 根据每个路由的order字段排序
for (var i = 0; i < routerList.length; i++) {
    for (var j = 0; j < routerList.length - i + 1; j++) {
        if (routerList[j + 1] !== undefined) {
            if (routerList[j].order === undefined) {
                routerList[j].order = 999;
            }
            if (routerList[j + 1].order === undefined) {
                routerList[j + 1].order = 999;
            }
            if (routerList[j + 1].order < routerList[j].order) {
                var temp = routerList[j + 1];
                routerList[j + 1] = routerList[j];
                routerList[j] = temp;
            }
        }
    }
}

// 3. 导出业务模块路由和不受权限控制路由，供外部使用（这里有坑导致外部使用出现问题，奇葩的问题, 这里供外部使用）
export const initConstantRoutes = ['/404', '401', '/login'];
export const asyncRoutes = [
    ...routerList,
    {
        path: 'external-link',
        component: Layout,
        children: [
            {
                path: 'https://gitee.com/panjiachen/vue-element-admin',
                meta: { title: 'ExternalLink', icon: 'link' }
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
];

// 4. 初始化路由
const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
