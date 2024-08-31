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
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
      // dark: {
      //   primary: "#2196F3",
      //   secondary: "#424242",
      //   accent: "#FF4081",
      //   error: "#FF5252",
      //   info: "#2196F3",
      //   success: "#4CAF50",
      //   warning: "#FFC107",
      // },
    },
  },
};

export default new Vuetify(opts);
