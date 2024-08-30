import { SensorState } from '~/store/modules/types';
import { MutationTree } from 'vuex';
export const mutations: MutationTree<SensorState> = {
    SET_SENSORS(state, sensors) {
        state.sensors = sensors;
      },
};
