import axios from "axios";

export default {
  state: {
    status: "",
    module: localStorage.getItem("module") || "",
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = "loading";
    },
    AUTH_SUCCESS(state, token) {
      state.status = "success";
      state.token = token;
    },
    AUTH_ERROR(state) {
      state.status = "error";
    },
  },

  actions: {
    async login({ commit, dispatch }, params) {
      commit("AUTH_REQUEST");
      let bodyFormData = new FormData();
      bodyFormData.set("email", params.email);
      bodyFormData.set("password", params.password);
      await axios({
        method: "post",
        url: "https://test.aircheckin.ru/api/v1/login",
        data: bodyFormData,
      })
        .then((resp) => {
          if (typeof resp.data == "object" && resp.data.success) {
            const token = resp.data.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            commit("AUTH_SUCCESS", token);
          } else {
            commit("AUTH_ERROR");
          }
        })
        .catch((err) => {
          const notification = {
            type: "error",
            message: "There was a problem fetching events: " + error.message,
          };
          dispatch("add", notification, { root: true });
          commit("AUTH_ERROR");
          localStorage.removeItem("token");
          console.log(err);
        });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
};
