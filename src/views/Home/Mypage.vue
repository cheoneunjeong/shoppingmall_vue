<template>
  <div>
    <v-flex xs12 style="text-align: conter">
      <p>{{ UserInfo.name }}님 환영합니다. {{ UserInfo.auth }}</p>
      <v-btn v-if="isAdmin === true" depressed @click="deleteRoleAdmin"
        >권한취소</v-btn
      >
      <v-btn v-else depressed @click="addRoleAdmin">권한주기</v-btn>
    </v-flex>
    <br />
    <v-btn depressed v-if="this.UserInfo.oauth === 'kakao'" @click="kakaoUnlink"
      >카카오계정 연동해지</v-btn
    >
  </div>
</template>
<script>
import Route from "@/router/index";
import { mapActions, mapState } from "vuex";
export default {
  name: "MyPage",
  computed: {
    ...mapState(["UserInfo"]),
    isAdmin() {
      if (this.UserInfo.auth.indexOf("ROLE_ADMIN") === -1) {
        return false;
      } else return true;
    },
  },
  methods: {
    ...mapActions(["Add_Role", "Delete_Role"]),
    kakaoUnlink() {
      this.$store.dispatch("KakaoUnlink");
    },
    addRoleAdmin() {
      let User = {
        username: this.UserInfo.id,
        name: this.UserInfo.name,
      };
      this.Add_Role(User);
    },
    deleteRoleAdmin() {
      this.Delete_Role(this.UserInfo.id);
    },
  },
};
</script>