import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

interface Chart {
  id: number;
  type: string;
  color: string;
  date: string;
  sensor: string;
}

@Module({ namespaced: true, stateFactory: true })
export default class Charts extends VuexModule {
  private charts: Chart[] = [];

  @Mutation
  ADD_CHART(chart: Chart) {
    this.charts.push(chart);
  }

  @Action
  addChart(chart: Chart) {
    this.context.commit('ADD_CHART', { ...chart, id: this.charts.length + 1 });
  }

  get getAllCharts() {
    console.log("getAllCharts")
    console.log(this.charts)
    return this.charts;
  }
}
