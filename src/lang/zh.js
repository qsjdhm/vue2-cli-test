// 通过require.context动态加载modules目录下的路由文件，组织业务模块路由数据
let routeList = {
    ExternalLink: '外链'
};
let buttonList = {
    add: '新增',
    edit: '编辑',
    view: '查看',
    delete: '删除',
    switch: '启用/停用',
    export: '导出',
    operate: '操作',
    copy: '复制',
    print: '打印'
};

const moduleList = require.context('@/modules', true, /lang.js$/);
moduleList.keys().forEach((modulePath) => {
    const langItem = moduleList(modulePath).default.zh;
    Object.assign(routeList, langItem.route);
    Object.assign(buttonList, langItem.button);
});

export default {
    button: buttonList,
    route: {
        ...routeList,
        welcome: '首页',
        page401: '401',
        page404: '404',
        'home-page': '首页图表'
    },
    /* 侧边栏路由 */
    navbar: {
        dashboard: '首页',
        github: '项目地址',
        docs: '文档',
        logOut: '退出登录',
        profile: '个人中心',
        theme: '换肤',
        size: '布局大小'
    },
    tagsView: {
        refresh: '刷新',
        close: '关闭',
        closeOthers: '关闭其它',
        closeAll: '关闭所有'
    },
    settings: {
        title: '系统布局配置',
        theme: '主题色',
        tagsView: '开启 Tags-View',
        fixedHeader: '固定 Header',
        sidebarLogo: '侧边栏 Logo'
    }
};
