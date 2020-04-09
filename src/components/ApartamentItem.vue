<template>
  <section class="apartment">
    <div class="apartment_header">
      <h3 class="apartament__title">{{apart.name}}</h3>
      <p class="description">
        <span class="has-text-grey-light">Квартира целиком: {{apart.rooms}} {{flatText}}</span>
      </p>
    </div>
    <div class="apart__description">
      <p>{{ apart.description }}</p>
    </div>
    <p class="apart_footer">
      <span>{{ apart.guests }} {{guestsText}}</span>
      <span>
        <span class="price has-text-black has-text-weight-semibold">{{ apart.price }}</span>
        <span>за ночь</span>
      </span>
      <b-button class="reservation__button" type="is-success" @click="isActive = true">Забронировать</b-button>
    </p>
    <b-modal :active.sync="isActive" has-modal-card trap-focus aria-role="dialog" aria-modal>
      <ReservationForm :apartId="apart.id" :title="apart.name" />
    </b-modal>
  </section>
</template>
    
<script>
import { mapGetters, mapActions } from "vuex";
import ReservationForm from "@/components/ReservetionForm.vue";

export default {
  name: "ApartmentItem",
  props: {
    apart: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      today: new Date(),
      isActive: false
    };
  },
  components: {
    ReservationForm
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
    }
  },
  methods: {
    ...mapActions(["getAvailible"])
  }
};
</script>
<style lang="scss">
.apartment {
  min-width: 285px;
  height: 100%;
  padding: 8px 8px 12px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  border-radius: 4px;
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
</style>
