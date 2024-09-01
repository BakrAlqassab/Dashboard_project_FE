import { Module } from 'vuex';
import { mutations } from '../mutations/sensorMutations';
import { actions } from '../actions/sensorActions'; 
import { getters } from '../getters/sensorGetters';
import { RootState } from './state';
import { SensorState } from '../modules/state';


const state: SensorState = {
  sensors: [],
};

export const sensors = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
