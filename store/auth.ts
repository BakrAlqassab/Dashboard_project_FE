import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { $axios } from '~/utils/api'; // Adjust the import path if necessary

@Module({ namespaced: true, stateFactory: true, name: 'auth' }) // Add the name property
export default class Auth extends VuexModule {
  token: string | null = null;

  @Mutation
  SET_TOKEN(token: string) {
    this.token = token;
  }

  @Action
  async login(credentials: { username: string; password: string }) {
    const response = await $axios.post('/users/login', credentials);
    const token = response.data.token;
    this.SET_TOKEN(token);
  }
}
