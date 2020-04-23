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
            const notification = {
              type: "error",
              message: "Что то пошло не так: " + resp.data.message,
            };
            dispatch("add", notification, { root: true });
          }
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message:
              "При получении данных с сервера возникла следующая ошибка: " +
              error.message,
          };
          dispatch("add", notification, { root: true });
          commit("AUTH_ERROR");
          localStorage.removeItem("token");
        });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
};
