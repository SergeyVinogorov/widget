import axios from "axios";
import moment from "moment";
export default {
  state: {
    allApartments: [],
  },
  mutations: {
    insertApartments(state, apart) {
      state.allApartments = apart;
    },
  },
  actions: {
    async getAvailible({ commit, rootState }, filter) {
      let date_from = filter ? filter.start : rootState.picker.dateIn;
      let date_to = filter ? filter.end : rootState.picker.dateOut;

      const params = {
        date_from: moment(date_from).format("YYYY-MM-DD hh:mm:ss"),
        date_to: moment(date_to).format("YYYY-MM-DD hh:mm:ss"),
        guests: rootState.picker.guests,
      };
      const passToken = window.localStorage.getItem("token");

      const apiClinet = axios.create({
        baseURL: `https://test.aircheckin.ru`,
        header: {
          Accept: "application/json",
          // Authorization: Bearer + passToken,
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
        .then((resp) => {
          if (Array.isArray(resp.data.data) && resp.data.success) {
            const apart = resp.data.data;
            commit("insertApartments", apart);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    allApartments(state) {
      return state.allApartments;
    },
  },
};
