import { SensorState } from '../modules/state';
import { MutationTree } from 'vuex';
export const mutations: MutationTree<SensorState> = {
    SET_SENSORS(state, sensors) {
        state.sensors = sensors;
      },
};
