<template>
  <button
    class="reservation-button"
    :class="buttonClass"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <slot>Найти</slot>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String,
    },
  },
};
</script>

<style scoped>
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
</style>
