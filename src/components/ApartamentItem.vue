<template>
  <div class="apartment--wrapper">
    <transition name="slide-fade" mode="out-in">
      <section v-if="!isActive" class="apartment" @click="this.checkApart">
        <div class="item flex-container">
          <img class="image" src="@/assets/apart-photo.png" />
          <div class="text-block">
            <h2 class="text-block-header">{{ apart.name }}</h2>
            <p class="after-header-description">
              Москва | {{ apart.rooms }} {{ flatText }} | {{ apart.guests }}
              {{ guestsText }}
            </p>
            <div class="flex-container">
              <p class="price">
                ₽ {{ apart.price }}| сутки
                <span class="no-comission">без комиссии</span>
              </p>
            </div>
            <p class="apart-info">{{ apart.description }}</p>
          </div>
          <div>
            <img class="hover-arrow" src="@/assets/hover-right-arrow.png" />
          </div>
        </div>
      </section>
      <ApartCart v-if="isActive" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ApartCart from "./ApartCart";

export default {
  name: "ApartmentItem",
  components: {
    ApartCart,
  },
  props: {
    apart: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      today: new Date(),
      isActive: false,
    };
  },

  computed: {
    ...mapGetters(["allApartments"]),
    flatText() {
      let flatText = " комнат";
      if (this.apart.rooms >= 1 && this.apart.rooms < 5) {
        if (this.apart.rooms === 1) flatText = " комната";
        if (this.apart.rooms > 1) flatText = " комнаты";
      }
      return flatText;
    },
    guestsText() {
      let guestsText = " гостей";
      if (this.apart.guests >= 1 && this.apart.guests < 5) {
        if (this.apart.guests === 1) guestsText = " гость";
        if (this.apart.guests > 1) guestsText = " гостя";
      }
      return guestsText;
    },
  },
  methods: {
    ...mapActions(["getAvailible", "getApart"]),
    checkApart() {
      this.getApart(this.apart.id);
      this.isActive = true;
    },
  },
};
</script>
<style lang="scss">
.apartment {
  min-width: 285px;
  height: 100%;
  padding: 8px 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.apart_footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.apartment_header {
  margin-bottom: 20px;
}
.price {
  margin-right: 8px;
}
.reservation__button {
  margin-left: 24px;
}
//style new cart
.item {
  max-width: 1134px;
  max-height: 547px;
  border: 2px solid transparent;
  cursor: pointer;
  &:hover {
    border: 2px solid #747474;
    .hover-arrow {
      display: block;
      margin-right: 18px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.flex-container {
  display: flex;
}

.text-block {
  padding: 40px;
}

.text-block-header {
  margin-bottom: 7px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  text-align: left;
}

.after-header-description {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #747474;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 20px;
}

.price {
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 30px;
}

.no-comission {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  color: #747474;
}

.apart-info {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 28px;
  text-align: left;
}

.hover-arrow {
  display: none;
}
/**Transitions */
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
@media (max-width: 1055px) {
  .apartment--wrapper {
    width: 100%;
  }
  .flex-container {
    flex-direction: column;
    max-height: initial;
  }
  .item {
    height: auto;
    border: 2px solid transparent;
    cursor: pointer;
    &:hover {
      border: 2px solid transparent;
      .hover-arrow {
        display: none;
      }
    }
  }
  .price {
    text-align: left;
  }
}
@media (max-width: 768px) {
  .text-block {
    padding: 20px;
  }
}
</style>
