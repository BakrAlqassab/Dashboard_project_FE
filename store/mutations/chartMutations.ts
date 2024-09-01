
import { Mutations as MutationTypes, Chart } from '../modules/types';
import { ChartsState } from '../modules/state';

export const mutations: MutationTypes = {
  SET_CHARTS(state: ChartsState, charts: Chart[]) {
    state.charts = charts;
  },
  ADD_CHART(state: ChartsState, chart: Chart) {
    state.charts.push(chart);
  },

  REMOVE_CHART(state: ChartsState, id: string) {
    state.charts = state.charts.filter((chart: Chart) => chart.id !== id);
  }
  
};
