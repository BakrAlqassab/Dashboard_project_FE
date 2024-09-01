import { ActionTree, ActionContext } from 'vuex';
import axios  from 'axios';
import { AuthState,SensorState, RootState } from '../modules/state';

export const  actions: ActionTree<SensorState, RootState> = {

        async fetchSensors({ commit }) {
          try {
            const response = await axios.get('/sensors');
            commit('SET_SENSORS', response.data);
          } catch (error) {
            console.error('Failed to fetch sensors:', error);
          }
        },  
  
};
