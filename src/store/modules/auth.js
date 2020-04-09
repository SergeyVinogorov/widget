import axios from "axios";
const apiClinet = axios.create({
  baseURL: `http://test.aircheckin.ru`,
  withCredentials: false,
  header: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
  },

  actions: {
    async login({ commit }, params) {
      commit("auth_request");
      let bodyFormData = new FormData();
      bodyFormData.set("email", params.email);
      bodyFormData.set("password", params.password);
      await axios({
        method: "post",
        url: "http://test.aircheckin.ru/api/v1/login",
        data: bodyFormData,
      })
        .then((resp) => {
          if (typeof resp.data == "object" && resp.data.success) {
            const token = resp.data.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            commit("auth_success", token);
          } else {
            commit("auth_error");
          }
        })
        .catch((err) => {
          commit("auth_error");
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
