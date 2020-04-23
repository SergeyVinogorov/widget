<template>
  <div class="container-cart">
    <span class="mdi mdi-chevron-up apartment__close"></span>
    <div class="form-wrapper">
      <CarouselCart />
      <div class="description--wrapper">
        <AgreementCart />
        <DescriptionCart />
      </div>
    </div>
    <span class="mdi mdi-chevron-up apartment__open"></span>
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
    DescriptionCart,
  },
};
</script>

<style lang="scss" scoped>
.description--wrapper {
  display: flex;
  justify-content: space-around;
  padding: 90px 0px;
}
.container-cart {
  padding-top: 50px;
}
@media (max-width: 1055px) {
  .form-wrapper {
    padding: 8px 8px 12px;
  }
  .description--wrapper {
    padding-top: 30px;
  }
}
</style>
