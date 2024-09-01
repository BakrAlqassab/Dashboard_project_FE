

import axios from 'axios';
import { ActionTree, ActionContext } from 'vuex';
import {  Chart,Mutations,ChartAugmentedActionContext } from '../modules/types';
import { RootState,ChartsState } from '../modules/state';


  export const actions: ActionTree<ChartsState, RootState> = {
  

    async fetchCharts({ commit }: ChartAugmentedActionContext, userId?: string) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
    
        // Create the request URL, dynamically including the userId query parameter
        const requestUrl = userId ? `/charts?userId=${userId}` : '/charts';
    
        const response = await axios.get(requestUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        commit('SET_CHARTS', response.data);
      } catch (error) {
        console.error('Failed to fetch charts:', error);
      }
    },
    
  
    async addChart({ commit }: ChartAugmentedActionContext, chartData: Chart) {
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
  

  async deleteChart({ commit }: ChartAugmentedActionContext, { userId, id }: { userId: string, id: string }) {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found');
      }
  
      // Create the request URL, including both the userId and the chartId to delte the selected user chart
      const requestUrl = `/charts/${id}?userId=${userId}`;
  
      const response = await axios.delete(requestUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("deleted")
      console.log(id)
   

  
      commit('REMOVE_CHART', id); 
   
    } catch (error) {
   
      console.error('Failed to delete chart:', error);
    }
  },
};