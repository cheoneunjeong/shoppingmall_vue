<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app>
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
        <v-list-item v-else router :to="{ name: 'Mypage' }">
          <v-list-item-action>
            <font-awesome-icon icon="star" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>My Page</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router :to="{ path: '/shop' }">
          <v-list-item-action>
            <font-awesome-icon icon="store" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Store</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="
            this.UserInfo.login_success === true &&
            UserInfo.auth.indexOf('ROLE_ADMIN') !== -1
          "
          router
          :to="{ name: 'Admin' }"
        >
          <v-list-item-action>
            <font-awesome-icon icon="wrench" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Admin Page</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title app>
          <v-btn depressed @click="Home()"> project </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn depressed color="primary" dark router :to="{ path: '/shop' }">
          <v-icon>mdi-shopping</v-icon>store
        </v-btn>
        <v-btn
          v-if="this.UserInfo.login_success === true"
          depressed
          @click="logOut()"
        >
          logOut
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container class="fill-height" fluid>
          <router-view />
        </v-container>
      </v-main>

      <Footer />
    </v-app>
  </div>
</template>

<script>
import Footer from "@/views/Footer";
import Route from "@/router/index";
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      drawer: null,
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
  components: { Footer },
  computed: {
    ...mapState(["UserInfo"]),
  },
  methods: {
    Home() {
      Route.push("/");
    },
    logOut() {
      this.$store.commit("LOGOUT");
    },
  },
};
</script>
