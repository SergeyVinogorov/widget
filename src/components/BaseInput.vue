<template>
  <div>
    <label v-if="label">{{label}}</label>
    <input :value="value" @input="updateValue" v-bind="$attrs" :class="classInput" />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ""
    },
    value: [String, Number],
    classInput: {
      type: String
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style scoped>
</style>