<template>
  <div>
    <div class="reservation_form" v-if="!activeForm">
      <h2 class="reserve_form_heading">
        Апартаменты | 2 комнаты | 2 кровати kingsize
      </h2>
      <p class="address">Москва, Ходынский бульвар, дом 2</p>

      <div class="dates">
        <v-date-picker :select-attribute="setattribute"
        :columns="layout.columns" :rows="layout.rows"
        :is-expanded="layout.isExpanded" mode="range" v-model="range"
        locale="ru" :masks="{ title: 'MMM YYYY' }" show-caps :popover="{
        placement: 'bottom', visibility: 'click' }" color: gray
        class="detail__date-picker" />
      </div>

      <div class="price__description">
        <div class="two__column_item deleted_text">
          <p class="price__description-text">1,430₽ x 17ночей</p>
          <p class="price__description-text">24,310₽</p>
        </div>
        <div class="two__column_item discount">
          <p class="price__description-text">Со скидкой (1,200₽ х 17 ночей)</p>
          <p class="price__description-text">21,110₽</p>
        </div>
        <div class="two__column_item discount">
          <p class="price__description-text">-10% скидка за что то</p>
          <p class="price__description-text">-493₽</p>
        </div>
        <div class="two__column_item">
          <p class="price__description-text">Сборы</p>
          <p class="price__description-text">549₽</p>
        </div>
        <div class="two__column_item">
          <p class="price__description-text">Трансфер</p>
          <p class="price__description-text">1320₽</p>
        </div>

        <div class="price__total two__column_item">
          <p class="price__description-text">ИТОГО</p>
          <div class="total__price">
            <p class="price__description-text red__deleted__text">37,720₽</p>
            <p class="price__description-text">29,720₽</p>
          </div>
        </div>
      </div>

      <BaseButton class="reservation_form_button" @click="this.triggerForm"
        >Забронировать</BaseButton
      >
    </div>
    <transition name="fade" mode="out-in">
      <ReservationForm v-if="activeForm" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import BaseButton from "./BaseButton";
import ReservationForm from "./ReservationForm";

export default {
  name: "AgreementCart",
  components: {
    BaseButton,
    ReservationForm,
  },
  data() {
    return {
      range: {
        start: this.getDateIn,
        end: this.getDateOut,
      },
      start: this.$moment(this.getDateIn).format("DD-MM-YYYY"),
      setattribute: {
        highlight: {
          backgroundColor: "red",
          borderRadius: "0",
          color: "black",
          fillMode: "gray",
        },
        contentStyle: {
          borderRadius: "0",
          color: "#ffffff",
          backgroundColor: "transparent",
        },
      },
      activeForm: false,
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
          isExpanded: true,
        },
        // Override for large screens
        lg: {
          columns: this.$screens({ default: 1, laptop: 2 }),
          rows: 1,
          isExpanded: false,
        },
      });
    },
  },
  methods: {
    triggerForm() {
      this.activeForm = !this.activeForm;
    },
  },
};
</script>

<style lang="scss">
/**datePicker */
.detail__date-picker {
  input {
    height: 100%;
  }
  .vc-popover-caret {
    display: none;
  }
  .vc-popover-content {
    border: 2px solid #747474;
    border-radius: 0px;
    padding: 23px 50px 30px;
  }
}
/**agreement form */
.reservation_form {
  max-width: 440px;
  border: 1px solid gray;
  padding: 60px 40px;
  font-family: Roboto;
  margin-right: 20px;
  font-size: 16px;
}

.reserve_form_heading {
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  margin: 0;
}
.address {
  line-height: 19px;
  color: #747474;
  margin-top: 10px;
}

.dates {
  max-width: 100%;
  height: 54px;
  border: 1px solid gray;
  box-sizing: border-box;
  margin-top: 40px;
  margin-bottom: 40px;
}

.price__description {
  display: flex;
  flex-direction: column;
}

.two__column_item {
  display: flex;
  justify-content: space-between;
}

.price__description-text,
.availability__item,
.availability__value,
.bedding__item,
.parking__item,
.comforts_item {
  margin: 0px 0px 10px 0px;
}
.red__deleted__text {
  color: #f84339;
  text-decoration: line-through;
  text-align: left;
  margin: 0px 20px 0px 0px;
}

.price__total {
  border-top: 1px solid #747474;
  padding-top: 20px;
  margin-top: 10px;
}

.total__price {
  display: flex;
}

.deleted_text {
  text-decoration: line-through;
}
.discount {
  color: #008937;
}
.reservation_form_button {
  height: 54px;
  width: 100% !important;
  background: #000000;
  border: none;
  text-align: center;
  color: white;
  font-size: 16px;
  margin-top: 43px;
}
/**Transitions */
.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 1055px) {
  .reservation_form {
    margin-right: 0px;
  }
}
</style>
