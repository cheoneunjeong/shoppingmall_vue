<template>
  <div style="width: 100%">
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>게시글</h4> </v-card-title>
      <br />
      <v-container class="pa-1">
        <v-card style="padding: 20px">
          <v-list>
            <v-list-item>
              <v-list-item-content
                ><p class="text-md-center">
                  {{ QAPost.title }}
                </p></v-list-item-content
              >
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-action> 작성일시 : </v-list-item-action>
              <v-list-item-content>
                {{ QAPost.datetime }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action> 작성자 : </v-list-item-action>
              <v-list-item-content>
                {{ QAPost.writer }}
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <br />
            <v-list-item>
              {{ QAPost.content }}
            </v-list-item>
          </v-list>
        </v-card>
        <v-col align="right">
          <v-btn depressed @click="WriteAnswer">답글달기 </v-btn>
          <v-btn depressed>삭제 </v-btn>
        </v-col>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import Route from "@/router/index";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["QAPost", "UserInfo"]),
  },
  methods: {
    WriteAnswer() {
      if (
        this.$store.state.UserInfo.login_success === true &&
        this.UserInfo.auth.indexOf("ROLE_ADMIN") !== -1
      ) {
        if (Route.currentRoute.matched[0].name === "Shop") {
          Route.push({ name: "WriteAnswer", query: this.QAPost });
        } else {
          Route.push({ name: "WriteAnswer_admin", query: this.QAPost });
        }
      } else {
        alert("관리자 기능입니다.");
      }
    },
  },
};
</script>