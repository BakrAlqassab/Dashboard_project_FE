import { RootState,SensorState } from "../modules/state";
import { GetterTree } from "vuex";

export const getters: GetterTree<SensorState, RootState> = {
  getSensors(state) {
    return state.sensors;
  },
};
