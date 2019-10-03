import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 1222,
    isLogin: false
  },
  getters: {
    money(state) {
      return state.count + '元';
    }
  },
  mutations: {
    increase(store, { value }) {
      this.state.count += value;
    },
    login() {
      this.state.isLogin = true;
    },
    logOut() {
      this.state.isLogin = false;
    }
  },
  actions: {
    increaseAsync({ commit }, payload) {
      setTimeout(() => {
        commit('increase', payload);
      }, 1000);
    },
    submitLogin({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('login');
          resolve(true);
        }, 2000);
      });
    },
    submitLogOut({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('logOut');
          resolve(true);
        }, 2000);
      });
    }
  }
});
