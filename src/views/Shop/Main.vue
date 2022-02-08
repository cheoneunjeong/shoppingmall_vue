<template>
  <div>
    <carousel :autoplay="true" :nav="true" :dots="true" class="marginTop50">
      <v-img :src="require('@/assets/dd.jpg')" height="400px" />
      <img src="@/assets/풍경.jpg" height="400px" />
      <img src="@/assets/풍경사진.jpg" height="400px" />
      <v-img :src="require('@/assets/dd.jpg')" height="400px" />
      <img src="@/assets/풍경.jpg" height="400px" />
      <img src="@/assets/풍경사진.jpg" height="400px" />
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],

      tab: null,
      items: ["Appetizers", "Entrees", "Deserts", "Cocktails"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  components: { carousel },
};
</script>