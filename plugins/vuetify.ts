import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

const opts = {
  customVariables: ["~/assets/variables.scss"],

  treeShake: false,
  optionsPath: "./vuetify.options.js", 
  theme: {
    themes: {
      light: {
        primary: "#19485f", 
        secondary: "#f5f5f5",

      },
      // dark: {
      //   primary: "#2196F3",
      //   secondary: "#424242",
      // },
    },
  },
};

export default new Vuetify(opts);
