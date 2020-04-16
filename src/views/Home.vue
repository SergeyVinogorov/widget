<template>
  <div class="home">
    <FilterPicker />
    <ul class="apart__card">
      <li class="apart__list-item" v-for="apart in allApartments" :key="apart.id">
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
      mode: "range",
      range: {},

      selectedDate: new Date(2018, 0, 10)
    };
  },
  components: {
    ApartamentItem,
    FilterPicker
  },
  computed: {
    ...mapGetters(["allApartments"]),
    layout() {
      return this.$screens({
        // Default layout for mobile
        default: {
          columns: 1,
          rows: 1,
          isExpanded: true
        },
        // Override for large screens
        lg: {
          columns: this.$screens({ default: 1, laptop: 2 }),
          rows: 1,
          isExpanded: false
        }
      });
    },
    selectDragAttribute() {
      return {
        popover: {
          visibility: "hover",
          isInteractive: false // Defaults to true when using slot
        }
      };
    },
    selectAttribute() {
      return {
        highlight: {
          backgroundColor: "#6aae46",
          animated: false,
          height: "2.9rem"
        },
        highlightCaps: {
          animated: false,
          height: "2.9rem",
          borderWidth: "2px",
          backgroundColor: "#fff",
          borderColor: "#6aae46",
          borderStyle: "solid",
          opacity: 0.5
        }
      };
    },
    inputState() {
      if (!this.selectedValue) {
        return {
          type: "is-danger",
          message: "Date required."
        };
      }
      return {
        type: "is-primary",
        message: ""
      };
    }
  },
  // this.$moment(this.range.start).format("DD-MM-YYYY")
  methods: {
    ...mapActions(["login", "getAvailible", "getReservationToken"])
  },
  async mounted() {
    let params = {
      email: "admin@admin.com",
      password: "password"
    };
    await this.login(params);
    await this.getReservationToken();
  }
};
</script>
<style lang="scss" scoped>
.home {
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 1600px;
}
.apart__card {
  display: flex;
  flex-direction: column;
}
.apart__list-item {
  display: flex;
  justify-content: center;
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
@media (max-width: 1055px) {
  .apart__card {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .apart__list-item {
    width: 50%;
  }
}
@media (max-width: 767px) {
  .apart__list-item {
    width: 100%;
  }
}
@media (min-width: 744px) {
  .home {
    padding-left: 40px;
    padding-right: 40px;
  }
}
</style>
