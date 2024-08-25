import Vue from 'vue';
import Vuex from 'vuex';
import { $axios } from '~/utils/api';

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {
      token: null as string | null,
      user: null as object | null,
    },
    mutations: {
      SET_TOKEN(state, token: string) {
        state.token = token;
        $axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },
      SET_USER(state, user: object) {
        state.user = user;
      },
      LOGOUT(state) {
        state.token = null;
        state.user = null;
        delete $axios.defaults.headers.common['Authorization'];
      },
    },
    actions: {
      async login({ commit }, credentials: { email: string; password: string }) {
        try {
            console.log("pass to the login")
            console.log(credentials)
    
          const response = await $axios.post('/users/login', credentials);
          console.log(response)
          const token = response.data.token;
          const user = response.data.user;
          commit('SET_TOKEN', token);
          commit('SET_USER', user);
          return user;
        } catch (error) {
            console.log("not pass to the login")
          throw new Error('Login failed');
        }
      },
      async register({ commit }, credentials: {username:string, email: string; password: string }) {
        try {
            console.log("pass to the register")
            console.log(credentials)
    
          const response = await $axios.post('/users/register', credentials);
          console.log(response)
          const token = response.data.token;
          const user = response.data.user;
          console.log(token)
          commit('SET_TOKEN', token);
          commit('SET_USER', user);
          return user;
        } catch (error) {
            console.log("not pass to the register")
          throw new Error('Login failed');
        }
      },
      logout({ commit }) {
        commit('LOGOUT');
      },
    },
    getters: {
      isAuthenticated(state): boolean {
        return !!state.token;
      },
      getUser(state): object | null {
        return state.user;
      },
    },
  });
};

export default store;
