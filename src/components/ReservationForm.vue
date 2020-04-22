<template>
  <div class="createForm">
    <form @submit.prevent="submit()">
      <header class="reservation__header">
        <p class="modal-card-title">Апартамент: {{ title }}</p>
      </header>
      <BaseInput
        label="Введите имя"
        v-model="name"
        type="text"
        classInput="reservation__field"
        classLabel="reservation__label"
        :class="{ error: $v.event.name.$error }"
        @blur="v.event.name.touch()"
      />
      <template v-if="$v.event.name.$error">
        <p v-if="!$v.event.name.required" class="errorMessage">
          Поле "Ваше имя" обязательно для заполнения
        </p>
      </template>

      <BaseInput
        label="Введите email"
        v-model="email"
        type="text"
        classInput="reservation__field"
        classLabel="reservation__label"
      />
      <BaseInput
        label="Введите телефон"
        v-model="phone"
        type="text"
        classInput="reservation__field"
        classLabel="reservation__label"
      />

      <div class="control">
        <BaseButton type="submit">Забронировать</BaseButton>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BaseButton from "./BaseButton";
import BaseInput from "./BaseInput";
import { required, email } from "vuelidate/lib/validators";
// <button class="button is-success" type="submit">Забронировать</button>

export default {
  name: "ReservetionForm",
  props: {
    post: {
      type: Object,
    },
    apartId: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      labelPosition: "on board",
    };
  },
  components: {
    BaseButton,
    BaseInput,
  },
  // computed: {
  //   ...mapGetters(["getUsrId", "getSuccess", "getCurrentPage"]),
  // },
  validations: {
    event: {
      name: { required },
      email: { required, email },
      phone: { required },
    },
  },
  methods: {
    ...mapActions(["createPost", "updatePost"]),
    async submit() {
      await this.createReservation({
        name: this.name,
        email: this.email,
        apartment_id: this.apartId,
        phone: this.phone,
        createdAt: Date(),
        updateAt: Date(),
        userId: this.userId,
      });
      this.name = this.email = this.phone = "";
    },
    validName() {
      if (this.name == "") {
        return "Это поля обязательное для заполнения";
      } else {
        return "Проверьте введенные данные";
      }
    },
  },
  mounted() {
    this.success = this.getSuccess;
  },
  created() {
    this.userId = this.getUsrId;
  },
};
</script>
<style lang="scss">
.createForm {
  min-width: 500px;
  border-radius: 4px;
  padding: 0px 40px 40px;
  position: relative;
  background-color: #ffffff;
  color: #363636;
  font-family: Roboto Slab;
}
.reservation__header {
  margin-bottom: 20px;
}
.reservation__field {
  width: 100%;
  height: 36px;
  padding: 5px 10px;
  margin-bottom: 20px;
}
.reservation__label {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 16px;
}
</style>
