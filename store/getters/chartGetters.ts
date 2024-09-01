import { GetterTree } from "vuex";
import { Chart } from "../modules/types";
import { RootState, ChartsState } from "../modules/state";

export const getters: GetterTree<ChartsState, RootState> = {
  filteredCharts: (state) => (startDate: Date, endDate: Date) => {
    return state.charts.filter((chart: Chart) => {
      const chartDate = new Date(chart.date);
      return chartDate >= startDate && chartDate <= endDate;
    });
  },
  getAllCharts: (state) => {
    return state.charts;
  },
  getChartsByDateRange: (state) => (startDate: Date, endDate: Date) => {
    if (!state.charts.length) {
      return [];
    }

    return state.charts.filter((chart: Chart) => {
      if (!chart || !chart.createdAt) {
        console.log("Chart or createdAt is undefined");
        return false;
      }

      const date = chart.createdAt;
      const chartDate = new Date(date);

      return chartDate >= startDate && chartDate <= endDate;
    });
  },
};
