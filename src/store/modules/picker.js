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
    insertDateIn(state, value) {
      state.dateIn = value;
    },
    insertDateOut(state, value) {
      state.dateOut = value;
    },
    insertGuests(state, value) {
      state.dateOut = value;
    },
    increment(state) {
      state.guests++;
    },
    decrement(state) {
      state.guests--;
    },
  },
  actions: {
    increment({ commit }) {
      commit("increment");
    },
    decrement({ commit }) {
      commit("decrement");
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
