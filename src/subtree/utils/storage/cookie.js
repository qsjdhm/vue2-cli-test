// 设置cookie方法
import _ from 'lodash';
import CryptoJS from '@/subtree/utils/storage/crypto';

export function setCookie(username, password, days) {
    const text = CryptoJS.Encrypt(password);
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000); // 保存的天数
    // 字符串拼接存入cookie
    window.document.cookie = `username=${username};path=/;expires=` + exp.toGMTString();
    window.document.cookie = `password=${text};path=/;expires=` + exp.toGMTString();
}

export function getCookie(_this) {
    if (document.cookie.length > 0) {
        const arr = document.cookie.split(';');
        for (let i = 0; i < arr.length; i++) {
            const arr2 = arr[i].split('='); // 再次切割
            // 这里会切割出以mobile为第0项的数组、以password为第0项的数组，判断查找相对应的值
            if (_.trim(arr2[0]) === 'username') {
                _this.username = arr2[1]; // 拿到账号
            } else if (_.trim(arr2[0]) === 'password') {
                // 取消记住用户名密码
                // 拿到拿到加密后的密码arr2[1]并解密
                _this.password = CryptoJS.Decrypt(arr2[1]);
            }
        }
    }
}
