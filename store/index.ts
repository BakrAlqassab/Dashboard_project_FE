import Vue from 'vue';
import Vuex from 'vuex';
import auth from '~/store/modules/auth';

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    modules: {
      auth,
    },
  });
};



