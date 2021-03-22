<template>
    <div class="navbar">
        <div class="left-pack">
            <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
            <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        </div>
        <div class="right-pack">
            <el-tooltip class="item" content="搜索菜单" placement="bottom">
                <div class="search-pack">
                    <search id="header-search" class="right-menu-item hover-effect" />
                </div>
            </el-tooltip>
            <el-tooltip class="item" content="错误日志" placement="bottom">
                <div class="errLog-pack">
                    <error-log class="errLog-container right-menu-item hover-effect" />
                </div>
            </el-tooltip>
            <el-tooltip class="item" content="全屏或结束全屏" placement="bottom">
                <div class="full-pack">
                    <screenfull id="screenfull" class="right-menu-item hover-effect" />
                </div>
            </el-tooltip>
            <el-tooltip class="item" content="退出系统" placement="bottom">
                <div class="logout-pack hover-effect right-menu-item" @click="logout">
                    <svg-icon icon-class="tuichu"></svg-icon>
                </div>
            </el-tooltip>
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover">
                <div class="avatar-wrapper">
                    <!-- !!!!这里不要加载gif动态图片，否则会引起表格选择框勾选的时候页面抖动 -->
                    <img src="./images/head.png" class="user-avatar" />
                    <div class="user-name">{{ name }}</div>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/profile/index">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                    </router-link>
                    <router-link to="/">
                        <el-dropdown-item>修改密码</el-dropdown-item>
                    </router-link>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import ErrorLog from '@/components/ErrorLog';
import Screenfull from '@/components/Screenfull';
import SizeSelect from '@/components/SizeSelect';
import Search from '@/components/HeaderSearch';

export default {
    components: {
        Breadcrumb,
        Hamburger,
        ErrorLog,
        Screenfull,
        SizeSelect,
        Search
    },
    computed: {
        ...mapGetters(['sidebar', 'avatar', 'name', 'device'])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar');
        },
        async logout() {
            await this.$store.dispatch('user/logout');
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        },
        showSetting() {
            this.$store.dispatch('settings/changeSettingDisplay', true);
        }
    }
};
</script>

<style lang="scss" scoped>
.navbar {
    height: 48px;
    overflow: hidden;
    position: relative;
    background: #fff;
    // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-pack {
        height: 48px;
        line-height: 48px;
        display: flex;
        align-items: center;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            padding: 0 8px;
            height: 48px;
            font-size: 22px;
            color: #000;
            // vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.055);
                }
            }
        }

        .avatar-container {
            margin-right: 10px;
            .avatar-wrapper {
                position: relative;
                display: flex;
                align-items: center;

                .user-avatar {
                    cursor: pointer;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    margin-right: 5px;
                }

                .user-name {
                    font-size: 14px;
                    color: #555;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
