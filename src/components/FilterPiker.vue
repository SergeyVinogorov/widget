<template>
  <div class="picker">
    <v-date-picker
      mode="range"
      v-model="range"
      :attributes="attributes"
      :select-attribute="selectTrigger"
      :drag-attribute="dragTrigger"
      :popover="{ placement: 'bottom', visibility: 'click' }"
    >
      <div class="datepicker--wrapper">
        <div class="datepicker__date-in">
          <div class="icon-wrapper">
            <img src="@/assets/Shapeapart.svg" alt="Icon datepicker" class="datepicker__icon" />
            <div class="datepicker__input">{{ displayDateIn }}</div>
          </div>
          <span class="mdi mdi-chevron-down"></span>
        </div>

        <div class="datepicker__date-out">
          <div class="datepicker__input">{{ displayDateOut }}</div>
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
            @click="this.DECREMENT"
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
            @click="this.INCREMENT"
            :disabled="getGuests === 17 ? true : false"
          >+</button>
        </div>
      </div>
      <BaseButton type="button" class="reservation-button" @click="check()">Найти апартаменты</BaseButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import BaseButton from "./BaseButton";

import "v-calendar/lib/v-calendar.min.css";
import { getExampleMonthComps } from "../../node_modules/v-calendar/src/utils/helpers";
/***
   :theme-styles="themeStyles"
      show-caps
  masks="{ title: 'MMM YYYY' }"
      :popover="{ placement: 'bottom', visibility: 'click' }"
      class="main-datepicker"
			:theme-styles="themeStyles"
 */
export default {
  name: "Filter-picker",
  data() {
    const {
      thisMonth,
      thisMonthYear,
      nextMonth,
      nextMonthYear
    } = getExampleMonthComps();
    return {
      range: {
        start: this.getDateIn,
        end: this.getDateOut
      },
      // selectAttribute: {
      //   highlight: {
      //     backgroundColor: "#E5E5E5" // Red
      //   },
      //   contentStyle: {
      //     color: "#000000"
      //   }
      // },
      attributes: [
        {
          highlight: {
            backgroundColor: "#000"
          },
          contentStyle: {
            color: "white"
          },
          dates: []
        }
      ],
      start: this.$moment(this.getDateIn).format("DD-MM-YYYY"),
      themeStyles: {
        wrapper: {
          border: "2px solid #747474",
          padding: "33px 68px"
        },
        header: {
          // color: "#000",
          fontWeight: "bold",
          fontSize: "16px",
          backgroundColor: "#fff"
          // border: "2px solid #747474",
          // borderBottom: "none",
        },
        headerVerticalDivider: {
          borderLeft: "1px solid #404c59"
        },

        weekdays: {
          color: "#1d1c1c",
          backgroundColor: "#fff"
          // borderLeft: "2px solid #747474",
          // borderRight: "2px solid #747474"
        },
        weekdaysVerticalDivider: {
          borderLeft: "1px solid #404c59"
        },
        weeks: {
          // border: "2px solid #000"
        }
        // dayCell: {
        //   backgroundColor: "#000"
        // },
        // dayContent: {
        //   backgroundColor: "#fff",
        //   border: "1px solid #dadada"
        // },

        // dayCell: {
        //   backgroundColor: "#fff"
        // }
        // highlightCaps: {
        //   backgroundColor: "#000"
        // }
      }
    };
  },
  components: {
    BaseButton
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
    dragTrigger() {
      let sample = {
        highlight: {
          backgroundColor: "#E5E5E5" // Red
        },
        contentStyle: {
          color: "#000000"
        }
      };
      return {
        highlight: {
          backgroundColor: "#E5E5E5" // Red
        },
        contentStyle: {
          color: "#000000"
        }
      };
    },
    selectTrigger() {
      let sample = {
        highlight: {
          backgroundColor: "#E5E5E5" // Red
        },
        contentStyle: {
          color: "#000000"
        }
      };
      if (this.range.start == undefined) {
        sample.highlight.backgroundColor = "transparent";
      }
      return sample;
    },
    displayDateIn() {
      return this.start == this.$moment(this.range.start).format("DD-MM-YYYY")
        ? "Заезд"
        : this.$moment(this.range.start).format("DD-MM-YYYY");
    },
    displayDateOut() {
      return this.start == this.$moment(this.range.start).format("DD-MM-YYYY")
        ? "Выезд"
        : this.$moment(this.range.end).format("DD-MM-YYYY");
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
  methods: {
    ...mapMutations([
      "INSERT_DATE_IN",
      "INSERT_DATE_OUT",
      "INSERT_GUESTS",
      "INCREMENT",
      "DECREMENT"
    ]),
    ...mapActions(["getAvailible"]),
    async check() {
      await this.getAvailible(this.range);
    }
  },
  watch: {
    range: function() {
      this.attributes[0].dates.push(this.range.start);
      this.attributes[0].dates.push(this.range.end);
    }
  }
};
</script>
<style lang="scss">
.picker {
  display: flex;
  align-items: center;
  padding: 8px 8px 12px;
  flex-wrap: wrap;
  justify-content: center;
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
.main-datepicker {
  .vc-popover-caret {
    display: none;
  }
  .vc-popover-content {
    border: 2px solid #747474;
    border-radius: 0px;
    padding: 23px 50px 30px;
  }
}
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
@media (max-width: 1229px) {
  .picker--right {
    width: 547px;
  }
  .add-guest {
    margin: 16px 10px 0px 0px;
    flex-grow: 1;
  }
  .reservation-button {
    margin: 16px 0px 0px 10px;
    flex-grow: 1;
  }
  .datepicker__date-out {
    margin-left: 0px;
  }
}
@media (max-width: 547px) {
  .main-datepicker {
    width: 100%;
  }
  .datepicker--wrapper {
    width: 100%;
  }
  .add-guest {
    width: auto;
  }
  .reservation-button {
    width: auto;
  }
}
@media (max-width: 430px) {
  .picker--right {
    width: 100%;
    flex-direction: column;
  }
  .add-guest {
    margin: 16px 0px;
  }
  .reservation-button {
    margin: 16px 0px;
    width: 100% !important;
  }
  .datepicker--wrapper {
    flex-direction: column;
    height: auto;
    border: none;
  }

  .datepicker__date-in {
    width: 100%;
    border: 2px solid #747474;
    margin: 16px 0px;
    height: 54px;
  }
  .datepicker__date-out {
    width: 100%;
    border: 2px solid #747474;
    margin: 16px 0px;
    height: 54px;
  }
}
</style>
