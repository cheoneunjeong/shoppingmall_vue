<template>
  <div>
    <p>{{ UserInfo.name }}님 환영합니다.</p>
    <v-btn v-if="this.UserInfo.oauth === 'kakao'" @click="kakaoUnlink"
      >카카오계정 연동해지</v-btn
    >
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "MyPage",
  computed: {
    ...mapState(["UserInfo"]),
  },
  methods: {
    kakaoUnlink() {
      this.$store.dispatch("KakaoUnlink");
    },
  },
};
</script>