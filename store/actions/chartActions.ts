

import axios from 'axios';
import { ActionTree, ActionContext } from 'vuex';
import { ChartsState, Chart,Mutations} from '../modules/types';
import { RootState } from '../modules/state';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
      key: K,
      payload?: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
  } & Omit<ActionContext<ChartsState, RootState>, 'commit'>;
  
  export const actions: ActionTree<ChartsState, RootState> = {
  
    async fetchCharts({ commit }: AugmentedActionContext) {

      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('/charts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    

        commit('SET_CHARTS', response.data);
      } catch (error) {
        console.error('Failed to fetch charts:', error);
      }
    },
  
  
    async addChart({ commit }: AugmentedActionContext, chartData: Chart) {
      try {
  
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.post('/charts', chartData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        commit('ADD_CHART', response.data);
      } catch (error) {
        console.error('Failed to add chart:', error);
      }
    },
  };
  