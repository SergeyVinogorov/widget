import axios from "axios";
const apiClinet = axios.create({
  baseURL: `https://test.aircheckin.ru`,
  header: {
    Accept: "application/json",
  },
});
export default {
  state: {
    apart: [],
    statusModule: "",
    isActiveShow: false,
    tokenModule: localStorage.getItem("tokenModule") || "",
  },
  mutations: {
    INSERT_APART(state, apart) {
      state.apart.push(apart);
    },
    REMOVE_APART(state, apartRemove) {
      state.apart = state.apart.filter((apart) => apart.id !== apartRemove.id);
    },
    TOGGLE_SHOW(state) {
      state.isActiveShow = !state.isActiveShow;
    },
    MODULE_REQUEST(state) {
      state.statusModule = "loading";
    },
    MODULE_SUCCESS(state, token) {
      state.statusModule = "success";
      state.tokenModule = token;
    },
    LOAD_SUCCESS(state) {
      state.statusModule = "success";
    },
    MODULE_ERROR(state) {
      state.statusModule = "error";
    },
  },

  actions: {
    async getReservationToken({ commit, dispatch }) {
      commit("MODULE_REQUEST");
      let bodyFormData = new FormData();
      await axios({
        method: "get",
        url: "https://test.aircheckin.ru/api/v1/create-bookings-token",
        data: bodyFormData,
      })
        .then((resp) => {
          if (typeof resp.data == "object" && resp.data.success) {
            const tokenModule = resp.data.data.token;
            localStorage.setItem("tokenModule", tokenModule);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${tokenModule}`;
            commit("MODULE_SUCCESS", tokenModule);
          } else {
            commit("MODULE_ERROR");
            const notification = {
              type: "error",
              message: "Что то пошло не так: " + resp.data.message,
            };
            dispatch("add", notification, { root: true });
          }
        })
        .catch((error) => {
          commit("MODULE_ERROR");
          const notification = {
            type: "error",
            message:
              "There was a problem fetching reservation token" + error.message,
          };
          dispatch("add", notification, { root: true });
          localStorage.removeItem("tokenModule");
        });
    },
    async getApart({ commit, dispatch }, paramsId) {
      commit("MODULE_REQUEST");
      // await dispatch("getReservationToken");
      const passTokenModule = window.localStorage.getItem("tokenModule");
      const AuthStr = "Bearer ".concat(passTokenModule);
      apiClinet
        .get("/api/v1/apartments/get/" + paramsId, {
          headers: { Authorization: AuthStr },
        })
        .then(async (resp) => {
          if (typeof resp.data == "object" && resp.data.success) {
            const apart = resp.data.data;
            await commit("INSERT_APART", apart);
            await commit("LOAD_SUCCESS");
          } else {
            const notification = {
              type: "error",
              message: "Что то пошло не так: " + resp.data.message,
            };
            dispatch("add", notification, { root: true });
          }
        })
        .catch((error) => {
          commit("MODULE_ERROR");
          const notification = {
            type: "error",
            message: "Что то пошло не так: " + error.message,
          };
          dispatch("add", notification, { root: true });
        });
    },
  },
  getters: {
    takeApart(state) {
      return state.apart;
    },
    takeStatus(state) {
      return state.statusModule;
    },
    takeShow(state) {
      return state.isActiveShow;
    },
  },
};
