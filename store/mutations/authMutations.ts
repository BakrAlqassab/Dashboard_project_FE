import { AuthState } from '../modules/state'; // Adjust path as necessary
import { $axios } from '~/utils/api';

export const mutations = {
  SET_TOKEN(state: AuthState, token: string) {
    state.token = token;
    $axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  SET_USER(state: AuthState, user: object) {
    state.user = user;
  },
  SET_USERS(state: AuthState, users: object) {
    state.users = users;
  },
  SET_LOADING(state: AuthState, isLoading: boolean) {
    state.isLoading = isLoading;
  },
};
