<template>
  <div>
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>찜목록</h4> </v-card-title>
      <br />
      <v-container class="pa-1">
        <v-item-group v-model="selected" multiple>
          <v-row>
            <v-col
              v-for="item in productList_shop"
              :key="item.code"
              cols="12"
              md="3"
            >
              <v-item :value="item.code">
                <v-img
                  :src="require('@/assets/' + item.mainPhoto)"
                  height="250"
                  class="text-right pa-2"
                  @click="detailPage(item.code)"
                >
                  <v-btn icon v-on:click.stop @click="addHeartList(item.code)">
                    <v-icon>
                      {{
                        UserInfo.heartList.indexOf(item.code) !== -1
                          ? "mdi-heart"
                          : "mdi-heart-outline"
                      }}
                    </v-icon>
                  </v-btn>
                </v-img>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import Route from "@/router/index";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    ...mapState(["UserInfo", "productList_shop"]),
  },
  methods: {
    detailPage(code) {
      Route.push({ name: "ProductDetail", query: code });
    },
    addHeartList(code) {
      if (this.UserInfo.heartList.indexOf(code) === -1) {
        this.UserInfo.heartList.push(code);
        this.$store.dispatch("Get_heartList", this.UserInfo.heartList);
      } else {
        let i = this.UserInfo.heartList.indexOf(code);
        this.UserInfo.heartList.splice(i, 1);
        this.$store.dispatch("Get_heartList", this.UserInfo.heartList);
      }
    },
  },

  created() {
    this.$store.dispatch("Get_heartList", this.UserInfo.heartList);
  },
};
</script>