<template>
    <div class="app-logo">
        <img src="./images/logo.png" />
        <div>Vue2 Admin</div>
    </div>
</template>

<script>
export default {
    name: 'AppLogo',
    methods: {}
};
</script>

<style lang="scss" scoped>
.app-logo {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
    img {
        width: 48px;
    }
    div {
        font-size: 24px;
        color: #fff;
        font-weight: 700;
        transition: all 0.5s;
        margin-left: 0.5rem;
    }
}
</style>
