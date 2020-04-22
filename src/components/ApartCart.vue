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
@media (max-width: 1055px) {
  .form-wrapper {
    padding: 8px 8px 12px;
  }
  .description--wrapper {
    padding-top: 30px;
  }
}
</style>
