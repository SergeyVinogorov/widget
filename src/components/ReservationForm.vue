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
        :class="{ error: $v.email.$error }"
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
        :class="{ error: $v.phone.$error }"
        placeholder="+7 (555) 555-5555"
        autocomplete="tel"
        maxlength="14"
        @blur="$v.phone.$touch()"
      />
      <template v-if="$v.phone.$error">
        <p v-if="!$v.phone.alpha" class="errorMessage">
          Введите корректный номер телефона
        </p>
        <p v-if="!$v.phone.required" class="errorMessage">
          Поле обязательно для заполнения
        </p>
      </template>

      <div class="control">
        <BaseButton
          type="submit"
          :disabled="$v.$anyError"
          buttonClass="form__button"
          >Забронировать</BaseButton
        >
        <p v-if="$v.$anyError" class="errorMessage">
          Пожалуйста заполните обязательные поля
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BaseButton from "./BaseButton";
import BaseInput from "./BaseInput";
import { required, email, helpers } from "vuelidate/lib/validators";
import formMixin from "../mixins/form";
const alpha = helpers.regex(
  "alpha",
  /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/
);

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
    phone: { required, alpha },
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
  margin-top: 20px;
  margin-bottom: 5px;
  input {
    width: 100%;
    height: 36px;
    padding: 5px 10px;
  }
}
.reservation__label {
  font-weight: 700;
  font-size: 16px;
}
.form__button {
  margin-bottom: 5px;
}
.error {
  label {
    color: #f57f6c;
  }
  input {
    animation-name: shakeError;
    animation-fill-mode: forwards;
    animation-duration: 0.6s;
    animation-timing-function: ease-in-out;
    border-color: #f57f6c;
    background: #fdd;
  }
}
.errorMessage {
  color: #f57f6c;
  margin-bottom: 16px;
  font-size: 12px;
  line-height: 1;
  margin-left: 10px;
}
@keyframes shakeError {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
