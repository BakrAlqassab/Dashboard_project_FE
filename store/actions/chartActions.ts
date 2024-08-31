

import axios from 'axios';
import { ActionTree, ActionContext } from 'vuex';
import {  Chart,Mutations,ChartAugmentedActionContext } from '../modules/types';
import { RootState,ChartsState } from '../modules/state';

// type AugmentedActionContext = {
//     commit<K extends keyof Mutations>(
//       key: K,
//       payload?: Parameters<Mutations[K]>[1]
//     ): ReturnType<Mutations[K]>;
//   } & Omit<ActionContext<ChartsState, RootState>, 'commit'>;
  
  export const actions: ActionTree<ChartsState, RootState> = {
  
    // async fetchCharts({ commit }: AugmentedActionContext) {

    //   try {
    //     const token = localStorage.getItem('authToken');
    //     if (!token) {
    //       throw new Error('No token found');
    //     }
    //     const response = await axios.get('/charts', {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       }
    //     });
    

    //     commit('SET_CHARTS', response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch charts:', error);
    //   }
    // },
  

    async fetchCharts({ commit }: ChartAugmentedActionContext, userId?: string) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
    
        // Create the request URL, optionally including the userId query parameter
        const requestUrl = userId ? `/charts?userId=${userId}` : '/charts';
    
        const response = await axios.get(requestUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

     
        // Commit the fetched charts to the store
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
  
  


  // async deleteChart({ commit }: AugmentedActionContext, userId?: string, chartId?: string) {
  //   try {
  //     const token = localStorage.getItem('authToken');
  //     if (!token) {
  //       throw new Error('No token found');
  //     }
  
  //     // Create the request URL, optionally including the userId query parameter
  //     const requestUrl = userId ? `/charts?userId=${userId}` : '/charts';
  
  //     const response = await axios.get(requestUrl, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });

  //     console.log("requestUrl")
  //     console.log( response.data)
  
  //     // Commit the fetched charts to the store
  //     commit('SET_CHARTS', response.data);
  //   } catch (error) {
  //     console.error('Failed to fetch charts:', error);
  //   }
  // },
  // type AugmentedActionContext = {
  //   commit<K extends keyof Mutations>(
  //     key: K,
  //     payload?: Parameters<Mutations[K]>[1]
  //   ): ReturnType<Mutations[K]>;
  // } & Omit<ActionContext<ChartsState, RootState>, 'commit'>;

  async deleteChart({ commit }: ChartAugmentedActionContext, { userId, id }: { userId: string, id: string }) {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found');
      }
  
      // Create the request URL, including both the userId and the chartId
      const requestUrl = `/charts/${id}?userId=${userId}`;
  
      // Send the DELETE request to the server
      const response = await axios.delete(requestUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
   
      console.log("Chart deletion response:", response.data);
  
      // Optionally, you can refetch the charts after deletion to update the UI
      commit('REMOVE_CHART', id); 
   
    } catch (error) {
   
      console.error('Failed to delete chart:', error);
    }
  },
};