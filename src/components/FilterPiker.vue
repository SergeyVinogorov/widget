<template>
  <div class="picker">
    <v-date-picker
      :columns="layout.columns"
      :rows="layout.rows"
      :is-expanded="layout.isExpanded"
      mode="range"
      v-model="range"
      locale="ru"
      :masks="{ title: 'MMM YYYY' }"
      tint-color="#000"
      show-caps
      :popover="{ placement: 'bottom', visibility: 'click' }"
    >
      <div class="datepicker--wrapper">
        <div class="datepicker__date-in">
          <div class="icon-wrapper">
            <img src="@/assets/Shapeapart.svg" alt="Icon datepicker" class="datepicker__icon" />
            <div class="datepicker__input">Заезд</div>
          </div>

          <span class="mdi mdi-chevron-down"></span>
        </div>

        <div class="datepicker__date-out">
          <div class="datepicker__input">Выезд</div>
          <span class="mdi mdi-chevron-down"></span>
        </div>
      </div>
    </v-date-picker>
    <div class="picker--right">
      <div class="add-guest">
        <div class="add-guest__descript">
          <b-icon icon="account-multiple" size="is-small" class="add-guest__descript--image" />
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
          >-</button>
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
          >+</button>
        </div>
      </div>

      <button type="button" class="reservation-button" @click="check()">Найти апартаменты</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Filter-picker",
  data() {
    return {
      lang: "ru",
      range: {
        start: this.dateIn,
        end: this.dateOut
      },
      localDay: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      checkIn: "Заезд",
      checkOut: "Выезд",
      minDate: new Date()
    };
  },
  computed: {
    ...mapGetters(["getGuests", "getDateIn", "getDateOut", "getMinDate"]),
    layout() {
      return this.$screens({
        // Default layout for mobile
        default: {
          columns: 1,
          rows: 1,
          isExpanded: true
        },
        // Override for large screens
        lg: {
          columns: this.$screens({ default: 1, laptop: 2 }),
          rows: 1,
          isExpanded: false
        }
      });
    },
    dateIn: {
      get() {
        return this.getDateIn;
      },
      set(value) {
        this.$store.commit("insertDateIn", value);
      }
    },
    dateOut: {
      get() {
        return this.getDateOut;
      },
      set(value) {
        this.$store.commit("insertDateOut", value);
      }
    },
    guests: {
      get() {
        return this.getGuests;
      },
      set(value) {
        this.$store.commit("insertGuests", value);
      }
    }
  },
  // watch: {
  //   getDateIn(newValue, oldValue) {
  //     let dateOutModel = this.getDateIn;
  //     dateOutModel = this.$moment(dateOutModel)
  //       .add(1, "days")
  //       .toDate();
  //     this.$store.commit("insertDateOut", dateOutModel);
  //   }
  // },
  methods: {
    ...mapMutations([
      "insertDateIn",
      "insertDateOut",
      "insertGuests",
      "increment",
      "decrement"
    ]),
    ...mapActions(["getAvailible"]),
    async check() {
      console.log("yes");
      await this.getAvailible(this.range);
    }
  }
};
</script>
<style lang="scss" scoped>
.picker {
  display: flex;
  align-items: center;
  padding: 8px 8px 12px;
  flex-wrap: wrap;
}
.picker--right {
  display: flex;
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
  border: 2px solid #747474;
  color: #363636;
  padding: 5px 9px;
  display: flex;
  justify-content: space-between;
  width: 254px;
  height: 54px;
  margin-top: 16px;
  margin-right: 40px;
  margin-left: 40px;
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
  font-size: 18px;
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
  align-self: center;
}
.add-guest__descript--text {
  margin-right: 9px;
}

//button find available
.reservation-button {
  margin-top: 16px;
  width: 253px;
  height: 54px;
  border: none;
  background: #000000;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}
//date picker
.icon-wrapper {
  display: flex;
  align-self: center;
  align-items: center;
}
.datepicker__date-in {
  width: 50%;
  padding: 15px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.datepicker__date-out {
  border-left: 2px solid #747474;
  padding: 15px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin-left: 15px;
}
.datepicker__input {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #747474;
  border: none;
  margin-bottom: 5px;
  &:focus {
    outline: none;
  }
}

.datepicker__icon {
  margin: 0 19px 5px 0;
  width: 12px;
  height: 12px;
}
.datepicker--wrapper {
  width: 547px;
  height: 54px;
  border: 2px solid #747474;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 16px;
}
</style>
