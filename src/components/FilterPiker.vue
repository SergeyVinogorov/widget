<template>
  <div class="picker">
    <b-field class="date__in">
      <b-datepicker
        :date-formatter="
          (date) =>
            this.$moment(date)
              .locale(this.lang)
              .format('DD-MM-YYYY')
        "
        :month-names="this.localMonth"
        :min-date="this.getMinDate"
        :day-names="this.localDay"
        placeholder="Заезд"
        icon="calendar-arrow-left"
        v-model="dateIn"
      />
    </b-field>
    <b-field class="date__out">
      <b-datepicker
        :date-formatter="
          (date) =>
            this.$moment(date)
              .locale(this.lang)
              .format('DD-MM-YYYY')
        "
        :month-names="this.localMonth"
        :min-date="this.getDateIn"
        :day-names="this.localDay"
        placeholder="Выезд"
        icon="calendar-arrow-right"
        v-model="dateOut"
        ref="out"
      />
    </b-field>

    <div class="add-guest">
      <div class="add-guest__descript">
        <b-icon
          icon="account-multiple"
          size="is-small"
          class="add-guest__descript--image"
        />
        <span class="add-guest__descript--text">Гости</span>
      </div>

      <div class="add-guest__buttons">
        <button
          type="button"
          :class="
            getGuests === 0
              ? 'add-guest__button--disabled'
              : 'add-guest__button'
          "
          @click="this.decrement"
          :disabled="getGuests === 0 ? true : false"
        >
          -
        </button>
        <span class="add-guest__guest">{{ getGuests }}</span>
        <button
          type="button"
          :class="
            getGuests === 17
              ? 'add-guest__button--disabled'
              : 'add-guest__button'
          "
          @click="this.increment"
          :disabled="getGuests === 17 ? true : false"
        >
          +
        </button>
      </div>
    </div>

    <b-button type="is-dark" class="reservation-button" @click="check()"
      >Найти апартаменты</b-button
    >
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Filter-picker",
  data() {
    return {
      lang: "ru",
      localMonth: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      localDay: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      checkIn: "Заезд",
      checkOut: "Выезд",
      minDate: new Date(),
    };
  },
  computed: {
    ...mapGetters(["getGuests", "getDateIn", "getDateOut", "getMinDate"]),
    dateIn: {
      get() {
        return this.getDateIn;
      },
      set(value) {
        this.$store.commit("insertDateIn", value);
      },
    },
    dateOut: {
      get() {
        return this.getDateOut;
      },
      set(value) {
        this.$store.commit("insertDateOut", value);
      },
    },
    guests: {
      get() {
        return this.getGuests;
      },
      set(value) {
        this.$store.commit("insertGuests", value);
      },
    },
  },
  watch: {
    getDateIn(newValue, oldValue) {
      let dateOutModel = this.getDateIn;
      dateOutModel = this.$moment(dateOutModel)
        .add(1, "days")
        .toDate();
      this.$store.commit("insertDateOut", dateOutModel);
    },
  },
  methods: {
    ...mapMutations([
      "insertDateIn",
      "insertDateOut",
      "insertGuests",
      "increment",
      "decrement",
    ]),
    ...mapActions(["getAvailible"]),
    async check() {
      console.log("yes");
      await this.getAvailible();
    },
  },
};
</script>
<style lang="scss">
.picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 12px;
  flex-wrap: wrap;
}
.date__in {
  max-width: 270px;
  margin-bottom: 0px !important;
  margin-top: 16px;
}
.date__out {
  max-width: 270px;
  margin-bottom: 0px !important;
  margin-top: 16px;
}
.add-guest {
  background-color: white;
  border-color: #dbdbdb;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  color: #363636;
  padding: 5px 9px;
  display: flex;
  justify-content: space-between;
  max-width: 250px;
  height: 36px;
  margin-top: 16px;

  &:hover {
    border-color: #b5b5b5;
  }
}

.add-guest__descript--image {
  margin-right: 9px;
  color: #dbdbdb;
}
.add-guest__button {
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
}
.add-guest__button--disabled {
  border: none;
  background: transparent;
  outline: none;
  cursor: not-allowed;
}
.add-guest__buttons {
  display: flex;
  flex-wrap: wrap;
}
.add-guest__descript {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.add-guest__guest {
  padding: 0 9px;
}
.add-guest__descript--text {
  margin-right: 9px;
}
.reservation-button {
  margin-top: 16px;
}
</style>
