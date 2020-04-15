import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import moment from "moment";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VCalendar from "v-calendar";

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  // ...some defaults
  screens: {
    tablet: "576px",
    laptop: "992px",
    desktop: "1200px"
  }
});

// import vueCustomElement from "vue-custom-element";
// Vue.use(vueCustomElement);

Vue.use(Buefy);
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
