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
        <template v-slot:item.reject="{ item }">
          <v-checkbox color="red" v-model="!item.reject"></v-checkbox>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            depressed
            v-if="item.reject"
            small
            @click="block(item.username)"
            >제한</v-btn
          >

          <v-btn depressed v-else small @click="unblock(item.username)"
            >해제</v-btn
          >
        </template>
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
        {
          text: "REJECT",
          value: "reject",
          sortable: false,
        },
        {
          text: "",
          value: "action",
          sortable: false,
          width: "10px",
        },
      ],
    };
  },
  computed: {
    ...mapState(["UserList"]),
  },
  methods: {
    block(username) {
      let user = { username: username };
      this.$store.dispatch("Block_user", user);
    },
    unblock(username) {
      let user = { username: username };
      this.$store.dispatch("Unblock_user", user);
    },
  },
  created() {
    this.$store.dispatch("Get_UserList");
  },
};
</script>