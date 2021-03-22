export default {
    // 中文
    zh: {
        route: {
            Example: '综合实例',
            CreateArticle: '创建文章',
            EditArticle: '编辑文章',
            ArticleList: '文章列表'
        },
        button: {
            warning:
                '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
        }
    },
    // 英文
    en: {
        route: {
            Example: 'Example',
            CreateArticle: 'Create Article',
            EditArticle: 'Edit Article',
            ArticleList: 'Article List'
        },
        button: {
            warning:
                'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
        }
    }
};
