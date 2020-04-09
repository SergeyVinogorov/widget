<template>
  <div class="home">
    <FilterPicker />
    <ul class="apart__card">
      <li
        class="apart__list-item"
        v-for="apart in allApartments"
        :key="apart.id"
      >
        <ApartamentItem :apart="apart" />
      </li>
    </ul>
  </div>
</template>
<script>
// @ is an alias to /src
import ApartamentItem from "@/components/ApartamentItem";
import FilterPicker from "@/components/FilterPiker";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      today: new Date(),
    };
  },
  components: {
    ApartamentItem,
    FilterPicker,
  },
  computed: {
    ...mapGetters(["allApartments"]),
  },
  methods: {
    ...mapActions(["login", "getAvailible"]),
  },
  async mounted() {
    let params = {
      email: "admin@admin.com",
      password: "password",
    };
    await this.login(params);
    await this.getAvailible();
  },
};
</script>
<style lang="scss">
.home {
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 1600px;
}
.apart__card {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.apart__list-item {
  padding: 8px 8px 12px;
  text-align: left;
  width: 32%;
}
@media (min-width: 1128px) {
  .home {
    position: relative;
    max-width: 1760px;
    padding-right: 80px;
    padding-left: 80px;
    margin: 0px auto;
  }
}
@media (min-width: 744px) {
  .home {
    padding-left: 40px;
    padding-right: 40px;
  }
}
</style>
