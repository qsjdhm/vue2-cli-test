<template>
    <div class="login-container">
        <div class="container">
            <div class="c-pack">
                <div class="c-left-pack">
                    <AppLogo />
                    <div class="l-container my-auto">
                        <img src="./images/login-box-bg.svg" class="w-1/2 -mt-16 -enter-x" />
                        <div class="title">
                            <span class="mt-4 text-3xl inline-block">开箱即用的中后台管理系统</span>
                        </div>
                        <div class="desc">输入您的个人详细信息开始使用！</div>
                    </div>
                </div>
                <div class="c-right-pack">
                    <div class="r-container my-auto">
                        <h2>登录</h2>
                        <el-form
                            ref="loginForm"
                            :model="loginForm"
                            :rules="loginRules"
                            class="login-form"
                            autocomplete="on"
                            label-position="left"
                        >
                            <el-form-item prop="username">
                                <span class="svg-container">
                                    <svg-icon icon-class="user" />
                                </span>
                                <el-input
                                    ref="username"
                                    v-model="loginForm.username"
                                    placeholder="请输入用户名"
                                    name="username"
                                    type="text"
                                    tabindex="1"
                                    autocomplete="on"
                                />
                            </el-form-item>

                            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                                <el-form-item prop="password">
                                    <span class="svg-container">
                                        <svg-icon icon-class="password" />
                                    </span>
                                    <el-input
                                        :key="passwordType"
                                        ref="password"
                                        v-model="loginForm.password"
                                        :type="passwordType"
                                        placeholder="请输入密码"
                                        name="password"
                                        tabindex="2"
                                        autocomplete="on"
                                        @keyup.native="checkCapslock"
                                        @blur="capsTooltip = false"
                                        @keyup.enter.native="handleLogin"
                                    />
                                    <span class="show-pwd" @click="showPwd">
                                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                                    </span>
                                </el-form-item>
                            </el-tooltip>

                            <div class="description-title">
                                <span class="left-span">
                                    <el-checkbox v-model="loginForm.checked" size="mini">记住用户名</el-checkbox>
                                </span>
                                <span class="right-span"> 忘记密码？ </span>
                            </div>

                            <el-button
                                :loading="loading"
                                type="primary"
                                style="width: 100%; margin-bottom: 20px"
                                @click.native.prevent="handleLogin"
                                >登录</el-button
                            >

                            <el-divider>其他登录方式</el-divider>

                            <el-row class="login-way" :gutter="20">
                                <el-col :span="8"><el-button @click="showDialog = true" size="mini">手机登录</el-button></el-col>
                                <el-col :span="8"><el-button @click="showDialog = true" size="mini">二维码登录</el-button></el-col>
                                <el-col :span="8"><el-button @click="showDialog = true" size="mini">注册</el-button></el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog title="Or connect with" :visible.sync="showDialog">
            不能在本地模拟，所以请结合你自己的商业模拟！！！
            <br />
            <br />
            <br />
            <social-sign />
        </el-dialog>
    </div>
</template>

<script>
// 设置cookie方法
import { getCookie, setCookie } from '@/subtree/utils/storage/cookie';
import { validUsername } from '@/subtree/utils/validate';
import SocialSign from './components/SocialSignin';
import AppLogo from '@/components/AppLogo';

export default {
    name: 'Login',
    components: { AppLogo, SocialSign },
    data() {
        const validateUsername = (rule, value, callback) => {
            // if (!validUsername(value)) {
            //     callback(new Error('请输入正确的用户名'));
            // } else {
            callback();
            // }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能少于6位数字'));
            } else {
                callback();
            }
        };
        return {
            userInfo: {},
            loginForm: {
                username: '18000000002',
                password: 'sptchosp1',
                checked: false
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {}
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                const query = route.query;
                if (query) {
                    this.redirect = query.redirect;
                    this.otherQuery = this.getOtherQuery(query);
                }
            },
            immediate: true
        }
    },
    created() {
        // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
        // 判断是否记住密码
        if (localStorage.getItem('checked') === 'true') {
            this.loginForm.checked = true;
            getCookie(this.loginForm);
        } else {
            if (this.loginForm.username === '') {
                this.$refs.username.focus();
            } else if (this.loginForm.password === '') {
                this.$refs.password.focus();
            }
        }
    },
    destroyed() {
        // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
        checkCapslock(e) {
            const { key } = e;
            this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z';
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('user/login', this.loginForm)
                        .then(() => {
                            this.rememberPassword(); // 记住密码
                            this.$router.push({ path: this.redirect || '/', query: this.otherQuery });
                            this.loading = false;
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur];
                }
                return acc;
            }, {});
        },
        // TODO 不建议使用cookie, 每次发送请求都会带着cookie
        rememberPassword() {
            // 参考地址 https://github.com/mgbq/vue-cookie-demo
            if (this.loginForm.checked) {
                // 传入账号，密码，保存天数
                localStorage.setItem('checked', this.loginForm.checked);
                setCookie(this.loginForm.username, this.loginForm.password, 7);
            } else {
                // 清空Cookie
                setCookie('', '', 0);
                localStorage.setItem('checked', this.loginForm.checked);
            }
        }
        // afterQRScan() {
        //   if (e.key === 'x-admin-oauth-code') {
        //     const code = getQueryObject(e.newValue)
        //     const codeMap = {
        //       wechat: 'code',
        //       tencent: 'code'
        //     }
        //     const type = codeMap[this.auth_type]
        //     const codeName = code[type]
        //     if (codeName) {
        //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
        //         this.$router.push({ path: this.redirect || '/' })
        //       })
        //     } else {
        //       alert('第三方登录失败')
        //     }
        //   }
        // }
    }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

// $bg: #283443;
// $light_gray: #fff;
// $cursor: #fff;

/* reset element-ui css */
.login-container {
    position: relative;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 100%;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin-left: -48%;
        background-image: url('./images/login-bg.svg');
        background-position: 100%;
        background-repeat: no-repeat;
        background-size: auto 100%;
        content: '';
    }

    .container {
        max-width: 1600px;
        padding-left: 2.5rem;
        padding-right: 2.5rem;
        position: relative;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;
        .c-pack {
            display: flex;
            height: 100%;
            .c-left-pack {
                width: 50%;
                flex-direction: column;
                display: flex;
                padding-left: 1rem;
                min-height: 100%;
                margin-right: 1rem;
                .app-logo {
                    display: flex;
                    width: 60%;
                    height: 80px;
                    position: absolute;
                    top: 12px;
                }
                .l-container {
                    img {
                        z-index: 9;
                        width: 50%;
                        margin-top: -4rem;
                        vertical-align: middle;
                        border-style: none;
                        max-width: 100%;
                        height: auto;
                        display: block;
                    }
                    .title {
                        color: #fff;
                        margin-top: 2.5rem;
                        font-weight: 500;
                        z-index: 8;
                        span {
                            font-size: 1.875rem;
                            line-height: 2.25rem;
                            display: inline-block;
                            margin-top: 1rem;
                        }
                    }
                    .desc {
                        color: #fff;
                        margin-top: 1.25rem;
                        font-weight: 400;
                        z-index: 7;
                    }
                }
            }
            .c-right-pack {
                width: 50%;
                height: auto;
                padding-top: 0px;
                padding-bottom: 0px;
                margin-top: 0px;
                margin-bottom: 0px;
                display: flex;
                box-sizing: border-box;
                .r-container {
                    width: auto;
                    margin-left: 5rem;
                    position: relative;
                    margin-right: auto;
                    margin-top: auto;
                    margin-bottom: auto;
                    h2 {
                        text-align: left;
                        font-size: 1.875rem;
                        line-height: 2.25rem;
                        margin-bottom: 1.5rem;
                        font-weight: 700;
                    }
                    .login-form {
                        position: relative;
                        width: 420px;
                        max-width: 100%;
                        margin: 0 auto;
                        overflow: hidden;
                        .description-title {
                            display: flex;
                            width: 100%;
                            height: 34px;
                            line-height: 34px;
                            justify-content: space-between;
                            margin-bottom: 20px;
                            .left-span {
                                font-size: 14px;

                                ::v-deep .el-checkbox .el-checkbox__label {
                                    color: #bbbfc5 !important;
                                    font-size: 14px;
                                }
                            }

                            .right-span {
                                font-size: 14px;
                                color: #0960bd;
                                cursor: pointer;
                            }
                        }
                        .login-way {
                            margin-bottom: 25px;
                            .el-button--mini {
                                width: 100%;
                                padding: 7px;
                            }
                        }
                        .el-divider {
                            background-color: #eee;
                            .el-divider__text {
                                color: #999;
                                font-size: 14px;
                            }
                        }
                    }
                    .tips {
                        font-size: 14px;
                        color: #333;
                        margin-bottom: 10px;

                        span {
                            &:first-of-type {
                                margin-right: 16px;
                            }
                        }
                    }

                    .svg-container {
                        padding: 6px 5px 6px 15px;
                        vertical-align: middle;
                        width: 30px;
                        display: inline-block;
                    }

                    .show-pwd {
                        position: absolute;
                        right: 10px;
                        top: 7px;
                        font-size: 16px;
                        color: #333;
                        cursor: pointer;
                        user-select: none;
                    }

                    .thirdparty-button {
                        position: absolute;
                        right: 0;
                        bottom: 6px;
                    }

                    @media only screen and (max-width: 470px) {
                        .thirdparty-button {
                            display: none;
                        }
                    }
                }
            }
            .my-auto {
                margin-top: auto;
                margin-bottom: auto;
            }
        }
    }
    .el-input {
        display: inline-block;
        // height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            // height: 47px;
        }
    }
    .el-button--mini {
        padding: 11px 15px;
        font-size: 16px;
        border-radius: 2px;
    }

    .el-form-item {
        border: 1px solid #ccc;
        border-radius: 2px;
        color: #454545;
        margin-bottom: 25px;
    }
}
</style>
