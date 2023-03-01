import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import { allAsyncRoutes } from '@/router/index'
import router from '@/router/index'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    routes: [],
    buttons: [],
    routers: []
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },

  SET_ROUTES: (state, routes) => {
    state.routes = routes;
  },
  SET_BUTTONS: (state, buttons) => {
    state.buttons = buttons;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  async getInfo({ commit, state }) {
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token)
    //     .then((response) => {
    //       const { data } = response;
    //       if (!data) {
    //         return reject("Verification failed, please Login again.");
    //       }
    //       const { name, avatar, routes, buttons } = data;
    //       commit("SET_NAME", name);
    //       commit("SET_AVATAR", avatar);
    //       commit("SET_ROUTES", routes);
    //       commit("SET_BUTTONS", buttons);
    //       resolve(data);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
    try {
      const { data } = await getInfo(state.token);
      const { name, avatar, routes, buttons } = data;
      commit("SET_NAME", name);
      commit("SET_AVATAR", avatar);
      commit("SET_ROUTES", routes);
      commit("SET_BUTTONS", buttons);
      // 过滤权限路由\
      console.log(allAsyncRoutes, '我是的');


      const activeRoutes = allAsyncRoutes.filter((item) => {
        if (routes.includes(item.name)) {
          if (item.children) {
            return item.children.filter((itemChildren) => {
              return routes.includes(itemChildren.name)
            })
          } else {
            return '没有子过滤成功了的动态路由'
          }
        }
      })

      console.log(activeRoutes, '过滤完成的菜单数组');

      // activeRoutes.forEach(item => {
      //   console.log(item);
      //   // router.addRoutes(item)
      //   // console.log(router.addRoutes);
      // })
      router.addRoutes(activeRoutes)
    } catch (error) {
      this.$message.error("登录失败!");
      throw new Error("用户名或密码错误!");
    }



  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
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
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
