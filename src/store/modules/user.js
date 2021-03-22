import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/subtree/utils/auth';
import router, { resetRouter } from '@/router';
import request from '@/subtree/utils/request';

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    }
};

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            request({
                url: '/v1/user/login',
                method: 'post',
                data: {
                    account: username,
                    password: password
                }
            })
                .then((response) => {
                    commit('SET_TOKEN', response.item.tentantId);
                    setToken(response.item.tentantId);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // get user info
    /**
     * 这里模拟后端给了用户信息相关数据
     * 理论上应该在接口里根据token获取用户相关信息
     */
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            const data = {
                roles: ['admin'],
                name: '赵经理',
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                introduction: 'I am a super administrator'
            };

            if (!data) {
                reject('Verification failed, please Login again.');
            }

            const { roles, name, avatar, introduction } = data;

            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
                reject('getInfo: roles must be a non-null array!');
            }

            commit('SET_ROLES', roles);
            commit('SET_NAME', name);
            commit('SET_AVATAR', avatar);
            commit('SET_INTRODUCTION', introduction);
            resolve(data);
            // getInfo(state.token)
            //     .then((response) => {
            //         const { data } = response;

            //         if (!data) {
            //             reject('Verification failed, please Login again.');
            //         }

            //         const { roles, name, avatar, introduction } = data;

            //         // roles must be a non-empty array
            //         if (!roles || roles.length <= 0) {
            //             reject('getInfo: roles must be a non-null array!');
            //         }

            //         commit('SET_ROLES', roles);
            //         commit('SET_NAME', name);
            //         commit('SET_AVATAR', avatar);
            //         commit('SET_INTRODUCTION', introduction);
            //         resolve(data);
            //     })
            //     .catch((error) => {
            //         reject(error);
            //     });
        });
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token)
                .then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    removeToken();
                    resetRouter();

                    // reset visited views and cached views
                    // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                    dispatch('tagsView/delAllViews', null, { root: true });

                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // remove token
    resetToken({ commit }) {
        return new Promise((resolve) => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve();
        });
    },

    // dynamically modify permissions
    async changeRoles({ commit, dispatch }, role) {
        const token = role + '-token';

        commit('SET_TOKEN', token);
        setToken(token);

        const { roles } = await dispatch('getInfo');

        resetRouter();

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true });
        // dynamically add accessible routes
        router.addRoutes(accessRoutes);

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
