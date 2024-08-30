
import { Mutations as MutationTypes, ChartsState, Chart } from '../modules/types';

export const mutations: MutationTypes = {
  SET_CHARTS(state: ChartsState, charts: Chart[]) {
    state.charts = charts;
  },
  ADD_CHART(state: ChartsState, chart: Chart) {
    state.charts.push(chart);
  },
};
