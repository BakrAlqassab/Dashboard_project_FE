import { SensorState } from "~/store/modules/types";

import { RootState } from "../modules/state";
import { GetterTree } from "vuex";

export const getters: GetterTree<SensorState, RootState> = {
  getSensors(state) {
    return state.sensors;
  },
};
