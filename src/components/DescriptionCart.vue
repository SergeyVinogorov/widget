<template>
  <section class="apart__information">
    <!-- Общая информация -->
    <div class="common__info">
      <h1
        class="apart__information_heading"
      >Уютная студия в центре Москвы с джакузи и турецкой баней</h1>
      <p class="apart__information_description">Ходынский бульвар дом 2 | 2 комнаты | 4 гостя</p>
      <p
        class="apart__information_text"
      >This Sonder is located in the South Loop in Chicago, a charming and desirable neighborhood. The space offers in-suite laundry, a comfortable queen-size bed...</p>
    </div>

    <!-- Удобства -->
    <div class="comforts">
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

    <!-- Спальня -->
    <div class="bedding">
      <h3 class="apart__information_h3">СПАЛЬНЯ</h3>
      <p class="bedding__item">Спальня 1: двухспальная кровать</p>
      <p class="bedding__item">Спальня 2: двухспальная кровать</p>
    </div>

    <!-- Парковка -->
    <div class="parking">
      <h3 class="apart__information_h3">ПАРКОВКА</h3>
      <p
        class="parking__item"
      >This Sonder is located in the South Loop in Chicago, a charming and desirable neighborhood. The space offers in-suite laundry, a comfortable queen-size bed...</p>
    </div>

    <!-- Доступность -->
    <div class="availability">
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
  name: "DescriptionCart"
};
</script>

<style scoped>
.apart__information {
  max-width: 547px;
  padding: 0;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
}

.common__info {
  border-bottom: 1px solid #747474;
}

.apart__information_heading {
  font-family: Roboto Slab;
  font-weight: bold;
  font-size: 2vw;
  line-height: 40px;
  margin: 0;
}

.apart__information_description {
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #747474;
}

.apart__information_h3 {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 40px;
}

.apart__information_description {
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  margin-top: 20px;
  margin-bottom: 35px;
}

.apart__information_text {
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
  padding-bottom: 54px;
}

.comforts__items {
  display: flex;
  flex-wrap: wrap;
}

.comforts__items,
.comforts_item {
  flex: 1 0 50%;
  box-sizing: border-box;
}

.comforts,
.bedding,
.parking,
.availability {
  border-bottom: 1px solid #747474;
  padding-bottom: 40px;
  font-weight: 300;
  font-size: 16px;
}

.availability {
  border: none;
}
</style>