import Vue from 'vue';
import Vuex from 'vuex';
import auth from '~/store/modules/auth';
import  charts from './modules/charts';
import { sensors } from './modules/sensors';
import {ChartsState} from "./modules/state"

Vue.use(Vuex);

export interface RootState {
  charts: ChartsState;
  // Add other state modules here
}

export default () => {
  return new Vuex.Store({
    modules: {
      auth,
      charts,
      sensors,
    },
  });
};



