import { ActionTree, ActionContext } from 'vuex';
import { AuthState } from '~/store/modules/state';
import { MutationTypes } from '~/store/mutations/types';
import { $axios } from '~/utils/api';
import { RootState } from '../modules/state';

export const actions = {
    // to fetch the user when reload the page
    async fetchUser({ commit }: ActionContext<AuthState, RootState>) {
        try {
          const response = await $axios.get('/users/me');
          const user = response.data;

          commit('SET_USER', user);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      },


    async initializeAuth({ commit, dispatch }: ActionContext<AuthState, RootState>)  {
        commit('SET_LOADING', true);
        const token = localStorage.getItem('authToken');
        if (token) {
          commit('SET_TOKEN', token);
          await dispatch('fetchUser');
        }

        commit('SET_LOADING', false);
      },
  async login({ commit }: ActionContext<AuthState, any>, credentials: { email: string; password: string }) {
    try {
      const response = await $axios.post('/users/login', credentials);
      const token = response.data.token;
      const user = response.data.user;
      commit(MutationTypes.SET_TOKEN, token);
      commit(MutationTypes.SET_USER, user);
      localStorage.setItem('authToken', token);
      return user;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  async register({ commit }: ActionContext<AuthState, any>, credentials: { username: string; email: string; password: string }) {
    try {
      const response = await $axios.post('/users/register', credentials);
      const token = response.data.token;
      const user = response.data.user;
      commit(MutationTypes.SET_TOKEN, token);
      commit(MutationTypes.SET_USER, user);
      localStorage.setItem('authToken', token);
      return user;
    } catch (error) {
        console.error(error)
    }
  },


  logout({ commit, dispatch }: ActionContext<AuthState, RootState>) {
      commit(MutationTypes.LOGOUT);
      localStorage.removeItem('authToken');
      dispatch('redirectToHome'); // Dispatch a redirect to home action
    },

    redirectToHome() {
        window.location.href = '/login'; 
      },
  
};
