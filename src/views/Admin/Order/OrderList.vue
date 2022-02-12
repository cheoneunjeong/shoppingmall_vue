<template>
  <div style="width: 100%">
    <v-card>
      <v-card-title><h4>주문내역관리</h4> </v-card-title>
      <v-divider></v-divider>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="orderList" :search="search">
        <template v-slot:item.address="{ item }">
          <v-btn small @click="addressDetails(item)">배송정보</v-btn>
        </template>
        <template v-slot:item.product="{ item }">
          <v-btn small @click="orderDetails(item)">주문상품</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Route from "@/router/index";
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "주문번호", value: "orderCode" },
        { text: "주문상태", value: "state" },
        { text: "결제수단", value: "payway" },
        { text: "사용포인트", value: "point" },
        { text: "결제금액", value: "total" },
        { text: "", value: "address" },
        { text: "", value: "product" },
      ],
    };
  },
  computed: {
    ...mapState(["orderList"]),
  },
  methods: {
    addressDetails(item) {
      this.$store.commit("SET_ORDER_ADDRESS", item);
      Route.push("/admin/order-address");
    },
    orderDetails(item) {
      Route.push({ name: "OrderDetails_Admin", query: item.products });
    },
  },
  created() {
    this.$store.dispatch("Get_All_OrderList");
  },
};
</script>