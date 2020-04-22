<template>
  <section class="apart__information">
    <div class="common__info">
      <h2 class="apart__information_heading">
        Уютная студия в центре Москвы с джакузи и турецкой баней
      </h2>
      <p class="apart__information_description">
        Ходынский бульвар дом 2 | 2 комнаты | 4 гостя
      </p>
      <p class="apart__information_text">
        This Sonder is located in the South Loop in Chicago, a charming and
        desirable neighborhood. The space offers in-suite laundry, a comfortable
        queen-size bed...
      </p>
    </div>

    <div class="apart__information-advantages">
      <h3 class="apart__information_h3">УДОБСТВА</h3>
      <div class="comforts__items">
        <p class="comforts_item">Кухня</p>
        <p class="comforts_item">Ванна</p>
        <p class="comforts_item">Smart TV</p>
        <p class="comforts_item">HDMI кабель</p>
        <p class="comforts_item">Постельное бельё</p>
        <p class="comforts_item">Полотенца</p>
        <p class="comforts_item">Косметичка</p>
        <p class="comforts_item">Высокоскоростной интернет</p>
        <p class="comforts_item">Плита</p>
        <p class="comforts_item">Микроволновка</p>
        <p class="comforts_item">Бутылированая вода</p>
        <p class="comforts_item">Шторы блэкаут</p>
        <p class="comforts_item">Фен</p>
        <p class="comforts_item">Гладильная станция</p>
        <p class="comforts_item">Стиральная машина</p>
        <p class="comforts_item">Кондиционер</p>
        <p class="comforts_item">Self check in</p>
        <p class="comforts_item">Оплата картой</p>
        <p class="comforts_item">Турецкий кофе</p>
      </div>
    </div>

    <div class="apart__information-advantages">
      <h3 class="apart__information_h3">СПАЛЬНЯ</h3>
      <p class="bedding__item">Спальня 1: двухспальная кровать</p>
      <p class="bedding__item">Спальня 2: двухспальная кровать</p>
    </div>

    <div class="apart__information-advantages">
      <h3 class="apart__information_h3">ПАРКОВКА</h3>
      <p class="parking__item">
        This Sonder is located in the South Loop in Chicago, a charming and
        desirable neighborhood. The space offers in-suite laundry, a comfortable
        queen-size bed...
      </p>
    </div>

    <div class="apart__information-advantages">
      <h3 class="apart__information_h3">ДОСТУПНОСТЬ</h3>
      <div class="two__column_item">
        <p class="availability__item">This Sonder is located</p>
        <p class="availability__value">in the South Loop in Chicago</p>
      </div>
      <div class="two__column_item">
        <p class="availability__item">This Sonder is located</p>
        <p class="availability__value">in the South Loop in Chicago</p>
      </div>
      <div class="two__column_item">
        <p class="availability__item">This Sonder is located</p>
        <p class="availability__value">in the South Loop in Chicago</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DescriptionCart",
};
</script>

<style lang="scss">
.apart__information {
  max-width: 547px;
  padding: 0;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
}

.common__info {
  border-bottom: 1px solid #747474;
}

.apart__information_heading {
  font-family: Roboto Slab;
  font-weight: bold;
  font-size: 2em;
  margin: 0;
}

.apart__information_h3 {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 40px;
}

.apart__information_description {
  font-weight: 500;
  font-size: 0.9em;
  line-height: 1.5em;
  margin-top: 1.1em;
  margin-bottom: 35px;
  color: #747474;
}

.apart__information_text {
  font-weight: 300;
  line-height: 28px;
  padding-bottom: 54px;
  font-size: 1em;
}

.comforts__items {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9em;
}

.comforts_item {
  flex: 1 0 50%;
}

.apart__information-advantages {
  border-bottom: 1px solid #747474;
  padding-bottom: 40px;
  font-weight: 300;
}

.availability {
  border: none;
}
@media (max-width: 1055px) {
  .apart__information_heading {
    font-size: 24px;
  }
  .description--wrapper {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  .apart__information {
    margin-top: 30px;
  }
}
@media (max-width: 768px) {
  .two__column_item {
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 490px) {
  .comforts__items {
    flex-direction: column;
  }
}
</style>
