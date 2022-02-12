<template>
  <div>
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>장바구니</h4> </v-card-title>
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
              <br />
              <v-row align="center">
                <v-col cols="3"
                  ><v-checkbox
                    v-model="checked"
                    :value="item.code"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6">{{ item.name }}</v-col>
                <!-- <v-col cols="6"
                  ><v-btn x-small depressed @click="deleteWishItem(item.code)"
                    >x</v-btn
                  ></v-col> -->
              </v-row>
            </v-col>
          </v-row>
        </v-item-group>
      </v-container>
      <v-row style="text-align: right">
        <v-col cols="11">
          <v-btn @click="orderWishList" dark color="hsl(231, 30%, 54%)"
            >주문하기</v-btn
          > </v-col
        ><v-col cols="1">
          <v-btn dark color="hsl(231, 30%, 54%)">삭제</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import Route from "@/router/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      selected: [],
      checked: [],
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
      } else {
        let i = this.UserInfo.heartList.indexOf(code);
        this.UserInfo.heartList.splice(i, 1);
      }
    },
    deleteWishItem(code) {
      this.$store.dispatch("Delete_WishItem", code);
    },
    orderWishList() {},
  },
  created() {
    this.$store.dispatch("Get_WishList", this.UserInfo.wishList);
  },
};
</script>