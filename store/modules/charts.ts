import axios from "axios";
import { ActionTree, ActionContext } from "vuex";
import { Module } from "vuex";
import { mutations } from "../mutations/chartMutations";
import { actions } from "../actions/chartActions";
import { getters } from "../getters/chartGetters";
import { RootState, ChartsState } from "./state";

const state: ChartsState = {
  charts: [],
};

const charts: Module<ChartsState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default charts;