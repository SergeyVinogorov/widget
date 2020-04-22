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
        class="reservation__field"
        classLabel="reservation__label"
        :class="{ error: $v.name.$error }"
        @blur="$v.name.$touch()"
      />
      <template v-if="$v.name.$error">
        <p v-if="!$v.name.required" class="errorMessage">
          Поле обязательно для заполнения
        </p>
      </template>

      <BaseInput
        label="Введите email"
        v-model="email"
        type="text"
        class="reservation__field"
        classLabel="reservation__label"
        @blur="$v.email.$touch()"
      />
      <template v-if="$v.email.$error">
        <p v-if="!$v.email.email" class="errorMessage">
          Введите корректный email
        </p>
        <p v-if="!$v.email.required" class="errorMessage">
          Поле обязательно для заполнения
        </p>
      </template>
      <BaseInput
        label="Введите телефон"
        v-model="phone"
        type="text"
        class="reservation__field"
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
import formMixin from "../mixins/form";
// <button class="button is-success" type="submit">Забронировать</button>

export default {
  name: "ReservetionForm",
  mixins: [formMixin],
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
  validations: {
    name: { required },
    email: { required, email },
    phone: { required },
  },
  components: {
    BaseButton,
    BaseInput,
  },
  // computed: {
  //   ...mapGetters(["getUsrId", "getSuccess", "getCurrentPage"]),
  // },

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
  input {
    width: 100%;
    height: 36px;
    padding: 5px 10px;
    margin-bottom: 10px;
  }
}
.reservation__label {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 16px;
}
.error {
  input {
    border-color: red;
    background: #fdd;
  }
}
.errorMessage {
  color: red;
  margin-bottom: 16px;
}
</style>
