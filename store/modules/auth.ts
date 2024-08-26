import { Module } from 'vuex';
import { state, AuthState } from './state';
import { mutations } from '../mutations/authMutations'; // Adjust path as necessary
import { actions } from '../actions/authActions'; // Adjust path as necessary
import { getters } from '../getters/authGetters'; // Adjust path as necessary
import { RootState } from './state';

const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default auth;


