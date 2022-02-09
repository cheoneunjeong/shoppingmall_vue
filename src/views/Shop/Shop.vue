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
            :to="{ name: 'shopLogin' }"
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
                  color="hsl(231, 30%, 54%)"
                  dark
                  small
                  router
                  :to="{ name: 'shopUserInfo' }"
                  >정보수정</v-btn
                ><v-btn small @click="logOut">로그아웃</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item router :to="{ name: 'shopMypage' }">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>마이페이지</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-cart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>장바구니</v-list-item-title>
            </v-list-item>
            <v-list-item router :to="{ name: 'WishList' }">
              <v-list-item-icon>
                <v-icon>mdi-heart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>위시리스트</v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="#EDE7F6" dark>
        <v-app-bar-nav-icon
          style="color: hsl(235, 8%, 72%)"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-col cols="12" align="center">
          <v-btn depressed color="#EDE7F6" @click="main()">
            <h1 class="font-weight-bold basil--text">BASiL</h1>
          </v-btn>
        </v-col>

        <v-spacer></v-spacer>

        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="hsl(231, 30%, 54%)"
            grow
          >
            <v-tab
              v-for="(item, index) in Menu"
              :key="index"
              @click="productlist(item)"
            >
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
<style>
/* Helper classes */
.basil--text {
  color: hsl(235, 8%, 72%) !important;
}
</style>
<script>
import Footer from "@/views/Footer";
import Login from "@/views/Home/Login";
import Route from "@/router/index";
import ProductList from "@/views/Shop/ProductList";
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
    ProductList,
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
    main() {
      Route.push("/shop");
    },
    productlist(item) {
      this.$store.dispatch("Get_ProductList_shop", item.code);
      Route.push({ name: "ProductList", query: item });
    },
  },
  created() {
    this.$store.dispatch("Get_Menu");
  },
};
</script>