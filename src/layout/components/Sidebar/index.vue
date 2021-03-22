<template>
    <div :class="{ 'has-logo': showLogo }">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="false"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.scss';

export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapGetters(['permission_routes', 'sidebar']),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    }
};
</script>
<style lang="scss">
.el-menu {
    .el-menu-item {
        padding: 15px 20px;
        height: auto;
        line-height: 1;
    }
    .el-submenu {
        height: auto;
        line-height: 1;
        .el-submenu__title {
            padding: 16px 20px;
            height: auto;
            line-height: 1;
        }
        .nest-menu {
            height: auto;
            line-height: 1;
            a {
                height: auto;
                line-height: 1;
            }
            .el-menu-item {
                padding: 16px 20px;
                height: auto;
                line-height: 1;
            }
        }
        .el-menu-item {
            padding: 16px 20px;
            height: auto;
            line-height: 1;
        }
    }
}
#app {
    .sidebar-container {
        transition: width 0.28s;
        width: $sideBarWidth !important;
        background-color: $menuBg;
        height: 100%;
        position: fixed;
        font-size: 0px;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;

        // reset element-ui css
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
            -webkit-transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
            -moz-transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
            -ms-transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
            -o-transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }

        .scrollbar-wrapper {
            overflow-x: hidden !important;
        }

        .el-scrollbar__bar.is-vertical {
            right: 0px;
        }

        .el-scrollbar {
            height: 100%;
        }

        &.has-logo {
            .el-scrollbar {
                height: calc(100% - 50px);
            }
        }

        .is-horizontal {
            display: none;
        }

        a {
            display: inline-block;
            width: 100%;
            overflow: hidden;
        }

        .svg-icon {
            margin-right: 10px;
        }

        .sub-el-icon {
            margin-right: 12px;
            margin-left: -2px;
        }

        .el-menu {
            border: none;
            height: 100%;
            width: 100% !important;
        }
        // 二级item
        .el-submenu > .el-menu > .nest-menu > a > .el-menu-item {
            padding-left: 44px !important;
        }

        // 二级subitem
        .el-submenu > .el-menu > .nest-menu > .el-submenu > .el-submenu__title {
            padding-left: 44px !important;
        }

        // 三级item
        .el-submenu > .el-menu > .nest-menu > .el-submenu > .el-menu > .nest-menu > a > .el-menu-item {
            padding-left: 62px !important;
        }

        // 三级subitem
        .el-submenu > .el-menu > .nest-menu > .el-submenu > .el-menu > .nest-menu > .el-submenu > .el-submenu__title {
            padding-left: 62px !important;
        }

        // 四级item
        .el-submenu
            > .el-menu
            > .nest-menu
            > .el-submenu
            > .el-menu
            > .nest-menu
            > .el-submenu
            > .el-menu
            > .nest-menu
            > a
            > .el-menu-item {
            padding-left: 80px !important;
        }

        // menu hover
        .submenu-title-noDropdown,
        .el-submenu__title {
            &:hover {
                color: $menuHoverText !important;
                background-color: $menuHover !important;
                .el-submenu__icon-arrow {
                    color: $menuHoverText !important;
                }
            }
        }

        .el-submenu.is-active .el-submenu__title {
            color: $subMenuActiveText !important;
            .el-submenu__icon-arrow {
                color: $menuHoverText !important;
            }
        }

        & .nest-menu .el-submenu > .el-submenu__title,
        & .el-submenu .el-menu-item {
            min-width: $sideBarWidth !important;
            background-color: $subMenuBg !important;
            &:hover {
                color: $subMenuActiveText !important;
                background-color: $subMenuHover;
                .el-submenu__icon-arrow {
                    color: $menuHoverText !important;
                }
            }
        }
        .el-menu-item.is-active {
            color: $subMenuActiveText !important;
            background-color: $subMenuActive !important;
        }
    }

    .hideSidebar {
        .sidebar-container {
            width: 54px !important;
        }

        .main-container {
            margin-left: 54px;
        }

        .submenu-title-noDropdown {
            position: relative;
            height: 46px;

            .el-tooltip {
                padding: 0 !important;

                .svg-icon {
                    margin-left: 20px;
                    height: 46px;
                }

                .sub-el-icon {
                    margin-left: 19px;
                }
            }
        }

        .el-submenu {
            overflow: hidden;

            & > .el-submenu__title {
                padding-left: 0 !important;
                padding-right: 0 !important;

                .svg-icon {
                    margin-left: 20px;
                }

                .sub-el-icon {
                    margin-left: 19px;
                }

                .el-submenu__icon-arrow {
                    display: none;
                }
            }
        }

        .el-menu--collapse {
            .el-submenu {
                & > .el-submenu__title {
                    & > span {
                        height: 0;
                        width: 0;
                        overflow: hidden;
                        visibility: hidden;
                        display: inline-block;
                    }
                }
            }
        }
    }

    .el-menu--collapse .el-menu .el-submenu {
        min-width: $sideBarWidth !important;
    }

    // mobile responsive
    .mobile {
        .main-container {
            margin-left: 0px;
        }

        .sidebar-container {
            transition: transform 0.28s;
            width: $sideBarWidth !important;
        }

        &.hideSidebar {
            .sidebar-container {
                pointer-events: none;
                transition-duration: 0.3s;
                transform: translate3d(-$sideBarWidth, 0, 0);
            }
        }
    }

    .withoutAnimation {
        .main-container,
        .sidebar-container {
            transition: none;
        }
    }
}

// when menu collapsed
.el-menu--vertical {
    & > .el-menu {
        .svg-icon {
            margin-right: 10px;
        }
        .sub-el-icon {
            margin-right: 12px;
            margin-left: -2px;
        }
    }

    .nest-menu .el-submenu > .el-submenu__title,
    .el-menu-item {
        &:hover {
            // you can use $subMenuHover
            background-color: $menuHover !important;
        }
    }

    // the scroll bar appears when the subMenu is too long
    > .el-menu--popup {
        max-height: 100vh;
        overflow-y: auto;

        &::-webkit-scrollbar-track-piece {
            background: #d3dce6;
        }

        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background: #99a9bf;
            border-radius: 20px;
        }
    }
}
</style>
