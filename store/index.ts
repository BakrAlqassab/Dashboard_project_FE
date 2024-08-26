import Vue from 'vue';
import Vuex from 'vuex';
import auth from '~/store/modules/auth';
import charts from '~/store/modules/charts';

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    modules: {
      auth,
      charts,
    },
  });
};



