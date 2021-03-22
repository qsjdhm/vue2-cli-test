/**
 * Created by PanJiaChen on 16/11/18.
 */
import _ from 'lodash';

/**
 * @desc 外链验证
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @desc url验证
 * @param {string} url
 * @returns {Boolean}
 */
export function isURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return reg.test(url);
}

/**
 * @desc host验证
 * @param {String} str
 */
export function isHost(str) {
    if (notEmpty(str)) {
        const hostReg = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
        if (!hostReg.test(str)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

/**
 * @desc 端口号判断，范围是从0 到 65535
 * @param {String | Number} str
 */
export function isPort(str) {
    if (notEmpty(str)) {
        const hostReg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
        hostReg.lastIndex = 0;
        return hostReg.test(str);
    } else {
        return false;
    }
}

/**
 * IP地址格式判断
 * @param {String} str
 */
export function isIP(str) {
    if (notEmpty(str)) {
        var ipReg = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])(\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)){3}$/;
        if (!ipReg.test(str)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

/**
 * @desc 手机格式
 * @param {String | Number} str
 */
export function isPhone(str) {
    if (notEmpty(str)) {
        var phoneReg = /^1[3|4|5|7|8|9][0-9]{9}$/;
        if (!phoneReg.test(str)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
/**
 * @desc 邮箱验证
 * @param {string} email
 * @returns {Boolean}
 */
export function isEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
}

/**
 * @desc isChinese
 * @param {*} str
 */
export function isChinese(str) {
    if (notEmpty(str)) {
        const reg = /^[\u4e00-\u9fa5]+$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * @desc 大小写英文字母
 * @param {*} str
 */
export function isOnlyEnglishLetter(str) {
    if (notEmpty(str)) {
        const reg = /^[a-zA-Z]+$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * @desc 只匹配中文、数字、英文字母
 * @param {*} str
 */
export function isOnlyRegularLetter(str) {
    if (notEmpty(str)) {
        const reg = /^[\u4e00-\u9fa5A-Za-z0-9]+$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * @desc 非零正整数
 * @param {*} str
 */
export function nonzeroPositiveInteger(str) {
    if (notEmpty(str)) {
        const reg = /^\+?[1-9][0-9]*$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
    const valid_map = ['admin', 'editor'];
    return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
    if (typeof str === 'string' || str instanceof String) {
        return true;
    }
    return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return Array.isArray(arg);
}
