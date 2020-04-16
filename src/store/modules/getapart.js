import axios from "axios";
const apiClinet = axios.create({
  baseURL: `https://test.aircheckin.ru`,
  header: {
    Accept: "application/json",
  },
});
export default {
  state: {
    apart: {},
    statusModule: "",
    tokenModule: localStorage.getItem("tokenModule") || "",
  },
  mutations: {
    insertApart(state, apart) {
      state.apart = apart;
    },
    module_request(state) {
      state.statusModule = "loading";
    },
    module_success(state, token) {
      state.statusModule = "success";
      state.tokenModule = token;
    },
    module_error(state) {
      state.statusModule = "error";
    },
  },

  actions: {
    async getReservationToken({ commit }) {
      commit("module_request");
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
            commit("module_success", tokenModule);
          } else {
            commit("module_error");
          }
        })
        .catch((err) => {
          commit("module_error");
          localStorage.removeItem("tokenModule");
          console.log(err);
        });
    },
    async getApart({ commit, dispatch }, paramsId) {
      // await dispatch("getReservationToken");
      const passTokenModule = window.localStorage.getItem("tokenModule");
      const AuthStr = "Bearer ".concat(passTokenModule);
      apiClinet
        .get("/api/v1/apartments/get/" + paramsId, {
          headers: { Authorization: AuthStr },
        })
        .then((resp) => {
          console.log(resp.data);

          if (typeof resp.data == "object" && resp.data.success) {
            console.log(resp.data.data);

            const apart = resp.data.data;
            commit("insertApart", apart);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  getters: {
    takeApart(state) {
      return state.apart;
    },
  },
};
