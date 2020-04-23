import axios from "axios";
import moment from "moment";
export default {
  state: {
    allApartments: [],
  },
  mutations: {
    INSERT_APARTMENTS(state, apart) {
      state.allApartments = apart;
    },
  },
  actions: {
    async getAvailible({ commit, rootState, dispatch }, filter) {
      let date_from = filter ? filter.start : rootState.picker.dateIn;
      let date_to = filter ? filter.end : rootState.picker.dateOut;
      const params = {
        date_from: moment(date_from).format("YYYY-MM-DD hh:mm:ss"),
        date_to: moment(date_to).format("YYYY-MM-DD hh:mm:ss"),
        guests: rootState.picker.guests,
      };
      const passTokenModule = window.localStorage.getItem("tokenModule");
      const AuthStr = "Bearer ".concat(passTokenModule);
      const apiClinet = axios.create({
        baseURL: `https://test.aircheckin.ru`,
        header: {
          Accept: "application/json",
          Authorization: AuthStr,
        },
      });
      // await axios({
      //   method: "get",
      //   url: "http://test.aircheckin.ru/api/v1/apartments/get-available",
      //   header: {
      //     Accept: "application/json",
      //   },
      //   data: params,
      // })
      apiClinet
        .get("/api/v1/apartments/get-available", { params })
        .then(async (resp) => {
          commit("MODULE_REQUEST", {
            root: true,
          });
          if (Array.isArray(resp.data.data) && resp.data.success) {
            const apart = resp.data.data;
            await commit("INSERT_APARTMENTS", apart);
            commit("LOAD_SUCCESS", {
              root: true,
            });
          } else {
            commit("MODULE_ERROR", {
              root: true,
            });
            const notification = {
              type: "error",
              message:
                "При получении списка апартаментов возникла следующая ошибка: " +
                resp.data.message,
            };
            dispatch("add", notification, { root: true });
          }
        })
        .catch((error) => {
          commit("MODULE_ERROR", {
            root: true,
          });
          const notification = {
            type: "error",
            message: "Что то пошло не так: " + error.message,
          };
          dispatch("add", notification, { root: true });
        });
    },
  },
  getters: {
    allApartments(state) {
      return state.allApartments;
    },
  },
};
