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
      <v-data-table :headers="headers" :items="Categories" :search="search">
        <template v-slot:item.sale="{ item }">
          <v-checkbox v-model="item.sale"></v-checkbox>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            depressed
            small
            router
            :to="{
              name: 'AddCategory',
              query: {
                code: item.code,
                groups: item.groups,
                orders: item.orders,
                depth: item.depth,
              },
            }"
            >추가</v-btn
          >
          <v-btn
            depressed
            small
            router
            :to="{
              name: 'EditCategory',
              query: {
                item: item,
              },
            }"
            >수정</v-btn
          >
        </template>
      </v-data-table>
    </v-card>
    <br />
    <v-col align="right">
      <v-btn depressed router :to="{ name: 'AddCategory' }">
        <font-awesome-icon icon="plus-square"
      /></v-btn>
    </v-col>
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
          text: "분류코드",
          value: "code",
          width: "25%",
        },
        { text: "분류명", value: "name", width: "25%" },
        { text: "상품수", value: "stock", width: "20%" },
        { text: "판매가능", value: "sale", width: "10%" },
        {
          text: "",
          value: "action",
          sortable: false,
          align: "right",
          width: "10%",
        },
      ],
    };
  },
  computed: {
    ...mapState(["Categories"]),
  },
  created() {
    this.$store.dispatch("Get_Categories");
  },
};
</script>