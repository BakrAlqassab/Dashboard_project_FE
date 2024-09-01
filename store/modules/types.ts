import {ChartsState, RootState} from "./state"
import { ActionContext } from 'vuex';

export enum AuthTypes {
  SET_TOKEN = 'SET_TOKEN',
  SET_USER = 'SET_USER',
  LOGOUT = 'LOGOUT',
}

export interface Chart {
  id: string;
  sensor: string;
  type: string;
  color: string;
  data: number[];
  date: string;
  createdAt: string;
}

type ChartId = Chart['id'];

export type Mutations<S = ChartsState> = {
  SET_CHARTS(state: S, charts: Chart[]): void;
  ADD_CHART(state: S, chart: Chart): void;
  // REMOVE_CHART: (state: S, id: string) => void;
  REMOVE_CHART: (state: S, id: ChartId) => void; 
};

import { CommitOptions, DispatchOptions, Store as VuexStore } from "vuex";

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<VuexStore<ChartsState>, "commit">;



export type ChartAugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ChartsState, RootState>, 'commit'>;


