<template>
  <div>
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>장바구니</h4> </v-card-title>
      <br />
      <v-card style="padding: 50px" class="mx-auto">
        <v-row
          v-for="(item, index) in this.$store.state.UserInfo.wishList"
          :key="index"
        >
          <v-checkbox v-model="checked" :value="item"></v-checkbox>
          <v-col cols="2">
            <v-img
              class="mx-auto"
              :src="require('@/assets/' + item.product.mainPhoto)"
              width="100"
              height="100"
              @click="detailPage(item.code)"
            ></v-img>
          </v-col>
          <v-col>
            <v-container>{{ item.product.name }}</v-container>
          </v-col>
          <v-col>
            <v-card-text>옵션 : {{ item.option }} </v-card-text>
          </v-col>
          <v-col>
            <v-card-text>수량 : {{ item.count }} </v-card-text>
          </v-col>
          <v-col>
            <v-card-text
              >판매가 : {{ item.product.price * item.count }}
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
      <br />
      <v-row style="text-align: right">
        <v-col cols="11">
          <v-btn @click="order" dark color="hsl(231, 30%, 54%)"
            >주문하기</v-btn
          > </v-col
        ><v-col cols="1">
          <v-btn @click="deleteWishitems" dark color="hsl(231, 30%, 54%)"
            >삭제</v-btn
          >
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
    ...mapState(["UserInfo"]),
  },
  methods: {
    detailPage(code) {
      Route.push({ name: "ProductDetail", query: code });
    },
    order() {
      Route.push({ name: "OrderForm", query: this.checked });
    },
    deleteWishitems() {
      this.$store.dispatch("deleteWishItems", this.checked);
    },
  },
  created() {
    console.log(this.$store.state.UserInfo);
  },
};
</script>