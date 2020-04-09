import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";
import auth from "./modules/auth";
import picker from "./modules/picker";
import listApartments from "./modules/listapartments";

Vue.use(moment);

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    auth,
    picker,
    listApartments,
  },
});
export default store;
