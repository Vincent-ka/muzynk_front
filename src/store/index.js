import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import createPersistedState from "vuex-persistedstate";
// import product from "./product";

// READ THE DOC !!!
// https://vuex.vuejs.org/fr/api/
// https://vuex.vuejs.org/fr/api/#modules

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  },
  // In order not to lose the current user's infos when we reload the page
  plugins: [createPersistedState()]
});
