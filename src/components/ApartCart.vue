<template>
  <div class="container-cart">
    <div class="form-wrapper">
      <CarouselCart />
      <div class="description--wrapper">
        <AgreementCart />
        <DescriptionCart />
      </div>
    </div>
  </div>
</template>

<script>
import CarouselCart from "./CarouselCart";
import AgreementCart from "./AgreementCart";
import DescriptionCart from "./DescriptionCart";

export default {
  name: "ApartCart",
  components: {
    CarouselCart,
    AgreementCart,
    DescriptionCart
  }
};
</script>

<style scoped>
.description--wrapper {
  display: flex;
  justify-content: space-around;
  padding: 90px 0px;
}
</style>