<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item @click="home()">
            <v-list-item-action>
              <font-awesome-icon icon="long-arrow-alt-left" />
            </v-list-item-action>
            <v-list-item-content> </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="this.UserInfo.login_success === false"
            router
            :to="{ name: 'Login' }"
          >
            <v-list-item-action>
              <font-awesome-icon icon="sign-in-alt" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <div v-if="this.UserInfo.login_success === true">
            <v-list-item>
              <v-list-item-icon> </v-list-item-icon>
              <v-list-item-title style="text-align: center">
                {{ UserInfo.name }}님 환영합니다.
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon> </v-list-item-icon>
              <v-list-item-title>
                <v-btn
                  color="#536D"
                  dark
                  small
                  router
                  :to="{ name: 'UserInfo' }"
                  >정보수정</v-btn
                ><v-btn small @click="logOut">로그아웃</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item router :to="{ name: 'Mypage' }">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>마이페이지</v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="#6A76AB" dark shrink-on-scroll>
        <template v-slot:img>
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold text-h2 basil--text">BASiL</h1>
          </v-card-title>
        </template>

        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab v-for="(item, index) in Menu" :key="index">
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Footer from "@/views/Footer";
import Login from "@/views/Home/Login";
import Route from "@/router/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      drawer: null,
      tab: null,
      items: ["Appetizers", "Entrees", "Deserts", "Cocktails"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  components: {
    Footer,
    Login,
  },
  computed: {
    ...mapState(["UserInfo", "Menu"]),
  },
  methods: {
    logOut() {
      this.$store.commit("LOGOUT");
    },
    home() {
      Route.push("/");
    },
  },
  created() {
    this.$store.dispatch("Get_Menu");
  },
};
</script>