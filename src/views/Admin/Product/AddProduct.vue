<template>
  <div style="width: 90%" class="mx-auto">
    <br />
    <p class="text-md-center">상품입력</p>
    <br />
    <SetCategory />
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
      <v-btn depressed @click="submit">등록</v-btn>
      <v-btn depressed router :to="{ name: 'Product' }">취소</v-btn>
    </v-col>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SetCategory from "@/views/Admin/Product/SetCategory";
import SetInfo from "@/views/Admin/Product/SetInfo";
import SetSummary from "@/views/Admin/Product/SetSummary";
import SetPrice from "@/views/Admin/Product/SetPrice";
import SetShippingfee from "@/views/Admin/Product/SetShippingfee";
import SetImage from "@/views/Admin/Product/SetImage";

export default {
  data() {
    return {
      file: null,
      files: [],
      code: "",
      name: "",
      desc: "",
      type: "",
      sale: "",
      detail_desc: "",
      summary: [],
      price: "",
      point_type: "",
      stock: "",
      options: [],
      delivery_fee: "",
      hit: "",
      recom: "",
      new_: "",
      best: "",
      disc: "",
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
  methods: {
    submit() {
      console.log();
    },
  },
};
</script>