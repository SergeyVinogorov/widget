<template>
  <div class="container">
    <b-carousel-list
      v-model="test"
      :data="items"
      :items-to-show="2"
      :arrow-hover="false"
      :indicator-inside="false"
    >
      <template slot="item" slot-scope="props">
        <div class="card">
          <div class="card-image">
            <figure class="image is-5by4">
              <a @click="info(props.index)">
                <img :src="props.list.image" />
              </a>
            </figure>
          </div>
        </div>
      </template>
    </b-carousel-list>
  </div>
</template>

<script>
export default {
  name: "CarouselCart",
  data() {
    return {
      test: 0,
      items: [
        {
          title: "Slide 1",
          image: "https://buefy.org/static/img/placeholder-1280x960.png",
          rating: 4.4
        },
        {
          title: "Slide 2",
          image: "https://buefy.org/static/img/placeholder-1280x960.png",
          rating: 3.5
        },
        {
          title: "Slide 3",
          image: "https://buefy.org/static/img/placeholder-1280x960.png",
          rating: 5
        },
        {
          title: "Slide 4",
          image: "https://buefy.org/static/img/placeholder-1280x960.png"
        },
        {
          title: "Slide 5",
          image: "https://buefy.org/static/img/placeholder-1280x960.png",
          rating: 5
        },
        {
          title: "Slide 6",
          image: "https://buefy.org/static/img/placeholder-1280x960.png",
          rating: 4
        },
        {
          title: "Slide 7",
          image: "https://buefy.org/static/img/placeholder-1280x960.png",
          rating: 2.7
        },
        {
          title: "Slide 8",
          image: "https://buefy.org/static/img/placeholder-1280x960.png",
          rating: 1.5
        }
      ]
    };
  },
  methods: {
    info(value) {
      this.test = value;
    }
  }
};
</script>
<style lang="scss" scoped>
$carousel-arrow-color: black;
.carousel-arrow .icon.has-icons-left {
  left: -30px;
}
.carousel-arrow .icon.has-icons-left {
  box-shadow: none;
}
// $carousel-indicator-border: white;
</style>