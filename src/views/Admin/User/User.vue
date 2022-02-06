<template>
  <div style="width: 90%" class="mx-auto">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="UserList" :search="search">
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "ID", value: "username" },
        { text: "NAME", value: "name" },
        { text: "AUTH", value: "auth" },
        { text: "PHONE", value: "phone" },
        { text: "MEMBER SINCE", value: "datetime" },
        { text: "POINT", value: "point" },
      ],
    };
  },
  computed: {
    ...mapState(["UserList"]),
  },
  created() {
    this.$store.dispatch("Get_UserList");
  },
};
</script>