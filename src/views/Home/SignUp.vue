<template>
  <v-container style="max-width: 500px">
    <v-layout>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title> Sign Up </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Id"
                name="UserId"
                prepend-icon="mdi-account"
                v-model="UserId"
                type="text"
              ></v-text-field>

              <v-text-field
                id="UserPassword"
                label="Password"
                name="UserPassword"
                prepend-icon="mdi-lock"
                v-model="UserPassword"
                type="password"
              ></v-text-field>

              <v-text-field
                id="UserName"
                label="Name"
                name="UserName"
                prepend-icon="mdi-card-account-details"
                v-model="UserName"
                type="text"
              ></v-text-field>

              <v-text-field
                id="Phone"
                label="Phone [ '-' 제외,  숫자만 입력해주세요. ]"
                name="Phone"
                prepend-icon="mdi-phone"
                v-model="Phone"
                type="text"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="SignUp">Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      UserId: null,
      UserPassword: null,
      UserName: null,
      Phone: null,
    };
  },
  methods: {
    ...mapActions(["NewUsers"]),
    SignUp() {
      let Users = {
        username: this.UserId,
        password: this.UserPassword,
        name: this.UserName,
        phone: this.Phone,
      };
      this.NewUsers(Users);
    },
  },
};
</script>