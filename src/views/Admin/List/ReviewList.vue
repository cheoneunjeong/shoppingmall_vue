<template>
  <div style="width: 100%">
    <v-card>
      <v-card-title><h4>후기관리</h4> </v-card-title>
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
      <v-data-table
        v-model="selected"
        item-key="num"
        :single-select="singleSelect"
        show-select
        @click:row="reviewDetails"
        :headers="headers"
        :items="ReviewList"
        :search="search"
      >
      </v-data-table>
      <v-col align="right">
        <v-btn depressed @click="DeleteSelectedReviews">선택삭제</v-btn>
      </v-col>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Route from "@/router/index";
export default {
  data() {
    return {
      singleSelect: false,
      selected: [],
      search: "",
      headers: [
        { text: "제목", value: "title" },
        { text: "작성자", value: "writer" },
        { text: "작성일시", value: "datetime" },
        { text: "별점", value: "rating" },
        { text: "주문번호", value: "order_num" },
        { text: "상품코드", value: "p_code" },
      ],
    };
  },
  computed: {
    ...mapState(["ReviewList"]),
  },
  methods: {
    addressDetails(item) {
      this.$store.commit("SET_ORDER_ADDRESS", item);
      Route.push("/admin/order-address");
    },
    orderDetails(item) {
      Route.push({ name: "OrderProduct", query: item.products });
    },
    reviewDetails(row) {
      Route.push({ name: "ReviewDetails_admin", query: { item: row } });
    },
    DeleteSelectedReviews() {
      this.$store.dispatch("DeleteReviews", this.selected);
    },
  },
  created() {
    this.$store.dispatch("Get_ReviewList");
  },
};
</script>