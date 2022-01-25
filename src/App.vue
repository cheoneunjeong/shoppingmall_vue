<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item router :to="{ name: 'Login' }">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <font-awesome-icon icon="star" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>My Page</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-card-text-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Board</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <font-awesome-icon icon="user-friends" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Members</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>shoppingmall</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed @click="logout()"> logOut</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer color="primary" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      drawer: null,
    };
  },

  computed: {
    ...mapState([]),
  },
  methods: {
    logout() {
      this.$store.dispatch("kakaoLogout");
    },
  },
  // created() {
  //   if(this.Userinfo.User_token === null && localStorage.getItem("token") !== null) {
  //     this.$store.commit("INSERT_TOKEN"),
  //     this.$store.dispatch('UnpackToken')
  //     console.log("tttttt"+localStorage.getItem("token"))
  //   }
  // }
};
</script>