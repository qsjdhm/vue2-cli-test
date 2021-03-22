module.exports = {
    presets: [
        // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
        '@vue/cli-plugin-babel/preset'
    ],
    env: {
        development: {
            // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
            // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
            // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
            plugins: ['dynamic-import-node']
        }
    },
    plugins: [
        // 装饰器
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        // 可选链
        ['@babel/plugin-proposal-optional-chaining']
    ]
};
