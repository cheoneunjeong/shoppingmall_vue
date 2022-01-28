<template>
  <v-app id="inspire">
    <router-view />
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapState(["UserInfo"]),
  },
  methods: {},
  created() {
    if (
      this.UserInfo.token === null &&
      localStorage.getItem("token") !== null
    ) {
      this.$store.dispatch("UnpackToken");
    }
  },
};
</script>