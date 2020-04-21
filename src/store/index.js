import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";
import auth from "./modules/auth";
import picker from "./modules/picker";
import listApartments from "./modules/listapartments";
import getapart from "./modules/getapart";
import notification from "./modules/notification";

Vue.use(moment);

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    auth,
    picker,
    listApartments,
    getapart,
    notification,
  },
});
export default store;
