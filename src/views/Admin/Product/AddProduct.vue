<template>
  <div style="width: 100%" class="mx-auto">
    <br />
    <p class="text-md-center">상품입력</p>
    <br />
    <SetCategory :category="this.category" />
    <br />
    <SetInfo />
    <br />
    <SetSummary />
    <br />
    <SetPrice />
    <br />
    <SetShippingfee />
    <br />
    <SetImage />
    <v-col align="right">
      <v-btn depressed @click="create">등록</v-btn>
      <v-btn depressed router :to="{ name: 'Product' }">취소</v-btn>
    </v-col>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import SetCategory from "@/views/Admin/Product/SetCategory";
import SetInfo from "@/views/Admin/Product/SetInfo";
import SetSummary from "@/views/Admin/Product/SetSummary";
import SetPrice from "@/views/Admin/Product/SetPrice";
import SetShippingfee from "@/views/Admin/Product/SetShippingfee";
import SetImage from "@/views/Admin/Product/SetImage";

export default {
  data() {
    return {
      category: [],
    };
  },
  components: {
    SetCategory,
    SetInfo,
    SetSummary,
    SetPrice,
    SetShippingfee,
    SetImage,
  },
  computed: {
    ...mapState(["product", "Categories"]),
  },
  methods: {
    ...mapActions(["CreateProduct_files", "CreateProduct"]),
    create() {
      this.CreateProduct(this.product);

      if (this.product.files.length !== 0) {
        let formData = new FormData();
        for (let i = 0; i < this.product.files.length; i++) {
          formData.append("file", this.product.files[i]);
        }
        formData.append("code", this.product.code);
        this.CreateProduct_files(formData);
      }
    },
  },
  created() {
    for (let i = 0; i < this.Categories.length; i++) {
      this.category.push(this.Categories[i].name);
    }
  },
};
</script>