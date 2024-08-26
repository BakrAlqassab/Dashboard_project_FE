
import { Plugin } from '@nuxt/types';

const initAuth: Plugin = ({ store }) => {
  const token = localStorage.getItem('token');
  if (token) {
    store.commit('auth/SET_TOKEN', token);
  }
};

export default initAuth;
