module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaFeatures: {
            legacyDecorators: true
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    // 这块当eslint和prottier冲突时，会覆盖eslint的规则
    extends: ['plugin:vue/recommended', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error'
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off'
            }
        }
    ]
};
