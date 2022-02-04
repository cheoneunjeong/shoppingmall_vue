<template>
  <div style="width: 90%" class="mx-auto">
    <v-col align="right">
      <v-btn color="#E0F2F1" depressed router :to="{ name: 'AddProduct' }"
        >상품등록</v-btn
      >
    </v-col>
    <br />
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
      <v-data-table :headers="headers" :items="ProductList" :search="search">
        <template v-slot:item.sale="{ item }">
          <v-checkbox v-model="item.sale"></v-checkbox>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn depressed small>수정</v-btn>
          <v-btn depressed small>보기</v-btn>
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
        {
          text: "상품코드",
          value: "code",
          width: "100px",
        },
        { text: "분류", value: "category_s" },
        { text: "이미지", value: "filesname" },
        { text: "상품명", value: "name" },
        { text: "판매가격", value: "price", width: "10%" },
        { text: "포인트", value: "point", width: "15%" },
        { text: "재고", value: "stock", width: "5%" },
        { text: "판매", value: "sale", width: "50px" },
        {
          text: "",
          value: "action",
          sortable: false,
          align: "right",
          width: "70px",
        },
      ],
    };
  },
  computed: {
    ...mapState(["ProductList"]),
  },
  created() {
    this.$store.dispatch("Get_ProductList");
    this.$store.dispatch("Get_Categories");
  },
};
</script>