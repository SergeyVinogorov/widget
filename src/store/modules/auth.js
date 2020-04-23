import axios from "axios";

export default {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
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
            const notification = {
              type: "success",
              message: "Вы зарегистрированы!",
            };
            dispatch("add", notification, { root: true });
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
          commit("AUTH_ERROR");
          localStorage.removeItem("token");
          const notification = {
            type: "error",
            message:
              "При получении данных возникла следующая проблема: " +
              error.message,
          };
          dispatch("add", notification, { root: true });
        });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
};
