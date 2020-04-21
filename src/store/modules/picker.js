import moment from "moment";

export default {
  state: {
    dateIn: new Date(),
    dateOut: moment(new Date())
      .add(1, "days")
      .toDate(),
    guests: 2,
    minDate: moment(new Date())
      .subtract(1, "days")
      .toDate(),
  },
  mutations: {
    INSERT_DATE_IN(state, value) {
      state.dateIn = value;
    },
    INSERT_DATE_OUT(state, value) {
      state.dateOut = value;
    },
    INSERT_GUESTS(state, value) {
      state.dateOut = value;
    },
    INCREMENT(state) {
      state.guests++;
    },
    DECREMENT(state) {
      state.guests--;
    },
  },
  actions: {
    increment({ commit }) {
      commit("INCREMENT");
    },
    decrement({ commit }) {
      commit("DECREMENT");
    },
  },
  getters: {
    getGuests(state) {
      return state.guests;
    },
    getDateIn(state) {
      return state.dateIn;
    },
    getDateOut(state) {
      return state.dateOut;
    },
    getMinDate(state) {
      return state.minDate;
    },
  },
};
