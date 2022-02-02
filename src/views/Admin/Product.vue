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
      <v-data-table :headers="headers" :items="items" :search="search">
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
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "상품코드",
          value: "p_code",
          width: "10%",
        },
        { text: "분류", value: "category" },
        { text: "이미지", value: "image" },
        { text: "상품명", value: "name" },
        { text: "판매가격", value: "price", width: "10%" },
        { text: "포인트", value: "point", width: "5%" },
        { text: "재고", value: "stock", width: "5%" },
        { text: "판매", value: "sale", width: "5%" },
        { text: "조회", value: "hit", width: "5%" },
        {
          text: "",
          value: "action",
          sortable: false,
          align: "right",
          width: "10%",
        },
      ],
      items: [
        {
          p_code: "1",
          category: "test",
          image: "image",
          name: "name",
          price: "100",
          point: "1",
          stock: "0",
          isSale: false,
          hit: "0",
        },
      ],
    };
  },
};
</script>