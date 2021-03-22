'use strict';
const webpack = require('webpack');
const path = require('path');
const defaultSettings = require('./src/settings.js');
const TerserPlugin = require('terser-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

let TerserPlugin_Tmp = [];
// issue 92% chunk asset optimization TerserPlugin, 这里需要重新区分环境变量
if (process.env.NODE_ENV === 'production') {
    TerserPlugin_Tmp = [
        new TerserPlugin({
            terserOptions: {
                compress: {
                    warnings: false,
                    drop_debugger: true, // console
                    drop_console: true, //注释console
                    pure_funcs: ['console.log'] // 移除console
                }
            },
            sourceMap: false,
            parallel: true // 是否开启多线程，开启后会导占用过大的资源
        })
    ];
}

const name = defaultSettings.title || 'vue2-admin'; // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9528; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        proxy: {
            // 用于登录模块
            [process.env.VUE_APP_BASE_API]: {
                target: `http://iot-app.allroundai.com:17820`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
        // port: port,
        // open: true,
        // overlay: {
        //     warnings: false,
        //     errors: true
        // },
        // before: require('./mock/mock-server.js')
    },
    configureWebpack: {
        plugins: [
            // 删除console.log
            ...TerserPlugin_Tmp
        ],
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        externals: {
            AMap: 'AMap' // 高德地图配置
        }
    },
    chainWebpack(config) {
        // 使用jquery
        config.plugin('provide').use(webpack.ProvidePlugin, [
            {
                $: 'jquery',
                jquery: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }
        ]);

        // it can improve the speed of the first screen, it is recommended to turn on preload
        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }
        ]);

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch');

        // set svg-sprite-loader
        config.module.rule('svg').exclude.add(resolve('src/subtree/icons')).end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/subtree/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();

        config.when(process.env.NODE_ENV !== 'development', (config) => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [
                    {
                        // `runtime` must same as runtimeChunk name. default is `runtime`
                        inline: /runtime\..*\.js$/
                    }
                ])
                .end();
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            });
            // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
            config.optimization.runtimeChunk('single');
        });
    },
    // 配置scss变量，以及功能寒函数
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/styles/mixin.scss";
                    @import "@/styles/variables.scss";
                `
            }
        }
    }
};
