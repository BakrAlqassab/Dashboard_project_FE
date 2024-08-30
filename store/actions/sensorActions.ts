import { ActionTree, ActionContext } from 'vuex';
import { AuthState } from '~/store/modules/state';
import { SensorState } from '~/store/modules/types';
import { $axios } from '~/utils/api';
import { RootState } from '../modules/state';

export const  actions: ActionTree<SensorState, RootState> = {

        async fetchSensors({ commit }) {
          try {
            const response = await $axios.get('/sensors');
            commit('SET_SENSORS', response.data);
          } catch (error) {
            console.error('Failed to fetch sensors:', error);
          }
        },  
  
};
