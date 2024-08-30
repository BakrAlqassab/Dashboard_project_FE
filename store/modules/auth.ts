import { Module } from 'vuex';
import { state, AuthState } from './state';
import { mutations } from '../mutations/authMutations';
import { actions } from '../actions/authActions'; 
import { getters } from '../getters/authGetters';
import { RootState } from './state';

const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default auth;


