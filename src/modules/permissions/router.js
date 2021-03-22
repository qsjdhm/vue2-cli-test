import Layout from '@/layout/index';

const permission = {
    path: '/permissions',
    component: Layout,
    redirect: '/permissions/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permissions',
    meta: {
        title: 'Permissions',
        icon: 'lock',
        roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
        {
            path: 'page',
            component: () => import('@/modules/permissions/page'),
            name: 'PagePermission',
            meta: {
                title: 'Page Permissions',
                roles: ['admin'] // or you can only set roles in sub nav
            }
        },
        {
            path: 'directive',
            component: () => import('@/modules/permissions/directive'),
            name: 'DirectivePermission',
            meta: {
                title: 'Directive Permissions'
                // if do not set roles, means: this page does not require permission
            }
        },
        {
            path: 'role',
            component: () => import('@/modules/permissions/role'),
            name: 'RolePermission',
            meta: {
                title: 'Role Permissions',
                roles: ['admin']
            }
        }
    ]
};

export default permission;
