export interface Chart {
  id: string;
  sensor: string;
  type: string;
  color: string;
  data: number[];
  date: string;
}

export interface ChartsState {
  charts: Chart[];
}

export type Mutations<S = ChartsState> = {
  SET_CHARTS(state: S, charts: Chart[]): void;
  ADD_CHART(state: S, chart: Chart): void;
};

export interface SensorState {
  sensors: Array<{ name: string; readings: number[] }>;
}

import { CommitOptions, DispatchOptions, Store as VuexStore } from "vuex";

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<VuexStore<ChartsState>, "commit">;
