<template>
  <div style="width: 90%" class="mx-auto">
    <v-col align="right">
      <v-btn @click="movePage" color="#E0F2F1" depressed>상품등록</v-btn>
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
      <v-data-table
        :headers="headers"
        :items="ProductList"
        :search="search"
        v-model="selected"
        item-key="code"
        :single-select="singleSelect"
        show-select
      >
        <template v-slot:top>
          <v-switch
            v-model="singleSelect"
            label="Single select"
            class="pa-3"
          ></v-switch>
        </template>
        <template v-slot:header.category
          ><tr>
            <td style="padding-left: 120px">분류</td>
          </tr>
          <tr>
            <td style="padding-left: 40px">이미지</td>
            <td style="padding-left: 40px">분류명</td>
          </tr></template
        >
        <template v-slot:item.category="{ item }">
          <tr style="height: 50px">
            <td colspan="2" style="text-align: center">
              {{ item.category }}
            </td>
          </tr>
          <tr>
            <td style="padding-left: 20px">
              <v-img
                v-if="!!item.mainPhoto"
                :src="require('@/assets/' + item.mainPhoto)"
                width="60px"
                height="60px"
              />
            </td>
            <td style="padding-left: 150px">{{ item.name }}</td>
          </tr>
        </template>
        <template v-slot:item.sale="{ item }">
          <v-checkbox v-model="item.sale"></v-checkbox>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn depressed small @click="getDetails(item)">수정</v-btn>
          <v-btn depressed small>보기</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-col align="right">
      <v-btn depressed @click="deleteProduct">삭제</v-btn>
    </v-col>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      singleSelect: false,
      selected: [],
      selected_code: [],
      search: "",
      headers: [
        {
          text: "상품코드",
          value: "code",
          width: "10%",
          align: "center",
        },
        { text: "분류", value: "category" },
        { text: "판매가격", value: "price", width: "10%" },
        { text: "포인트", value: "point", width: "15%" },
        { text: "재고", value: "stock", width: "10%" },
        { text: "판매", value: "sale", width: "5%" },
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
  methods: {
    ...mapActions(["Delete_SelectedProduct"]),

    deleteProduct() {
      for (let i = 0; i < this.selected.length; i++) {
        this.selected_code.push(this.selected[i].code);
      }
      this.Delete_SelectedProduct(this.selected_code);
    },
    getDetails(item) {
      this.$store.dispatch("Get_ProductDetails", item.code);
    },
    movePage() {
      this.$store.commit("SET_EDIT");
    },
  },
  created() {
    this.$store.dispatch("Get_ProductList");
    this.$store.dispatch("Get_Categories");
  },
};
</script>