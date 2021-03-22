/*
 * 装饰器使用
 * */

import { MessageBox } from 'element-ui';

/**
 * 删除等类似功能确认框
 * @param {String} message 提示信息
 */
export function confirmation(message) {
    return function (target, name, descriptor) {
        let oldValue = descriptor.value;
        descriptor.value = function (...args) {
            MessageBox.confirm(message, '提示')
                .then(oldValue.bind(this, ...args))
                .catch(() => {});
        };

        return descriptor;
    };
}

// 返回上一级路由，并删除导航栏标签
export function delView(params) {
    return function (target, name, descriptor) {
        let oldValue = descriptor.value;
        descriptor.value = function (...args) {
            if (params === 'end') {
                oldValue.call(this, ...args);
                this.$store.dispatch('tagsView/delView', this.$route).then(() => {
                    this.$router.push({
                        path: this.$route.query.from
                    });
                });
            } else {
                this.$store
                    .dispatch('tagsView/delView', this.$route)
                    .then(() => {
                        oldValue.call(this, ...args);
                        this.$router.push({
                            path: this.$route.query.from
                        });
                    })
                    .catch(() => {});
            }
        };
        return descriptor;
    };
}

export function validate(formName) {
    return function (target, name, descriptor) {
        let oldValue = descriptor.value;
        descriptor.value = function (...args) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    oldValue.call(this, ...args);
                }
            });
        };
        return descriptor;
    };
}

export function handleCatch(callback) {
    return function (target, name, descriptor) {
        let oldValue = descriptor.value;
        descriptor.value = function (...args) {
            try {
                oldValue.call(this, ...args);
            } catch (e) {
                callback();
                console.log(e);
            }
        };
        return descriptor;
    };
}
