import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";
import "./axios.config";

Vue.config.productionTip = false;

Vue.prototype.moment = moment;

Vue.prototype.$ebus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
