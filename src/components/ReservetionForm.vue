<template>
  <div class="createForm">
    <form @submit.prevent="submit()">
      <header class="modal-card-head">
        <p class="modal-card-title">Апартамент: {{ title }}</p>
      </header>
      <b-field
        for="nameReserv"
        label="Введите Имя"
        :label-position="labelPosition"
      >
        <b-input
          id="nameReserv"
          type="text"
          v-model="name"
          required
          autofocus
          :validation-message="this.validName()"
          minlength="3"
        ></b-input>
      </b-field>
      <b-field
        for="emailReserv"
        label="Введите email"
        :label-position="labelPosition"
      >
        <b-input
          placeholder="Email"
          id="emailReserv"
          v-model="email"
          type="email"
          icon="email"
          validation-message="Не корректно введены данные"
          required
          maxlength="30"
        ></b-input>
      </b-field>
      <b-field
        for="phoneReserv"
        label="Введите телефон"
        :label-position="labelPosition"
      >
        <b-input
          id="phoneReserv"
          v-model="phone"
          required
          type="text"
          validation-message="Не корректно введены данные"
        ></b-input>
      </b-field>
      <div class="control">
        <button class="button is-success" type="submit">Забронировать</button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

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
  computed: {
    ...mapGetters(["getUsrId", "getSuccess", "getCurrentPage"]),
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
  width: 80%;
  min-width: 500px;
  border-radius: 4px;
  padding: 40px;
  position: relative;
  background-color: #ffffff;
  color: #363636;
}
</style>
