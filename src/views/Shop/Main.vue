<template>
  <div style="padding-left: 55px">
    <infinite-slide-bar :barStyle="{ background: '#42b883', padding: '5px 0' }">
      <v-img :src="require('@/assets/dd.jpg')" width="100px" height="100px" />
    </infinite-slide-bar>
  </div>
</template>

<script>
import InfiniteSlideBar from "vue-infinite-slide-bar";
export default {
  data() {
    return {};
  },
  components: {
    InfiniteSlideBar,
  },
};
</script>