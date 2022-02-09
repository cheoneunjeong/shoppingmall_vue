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
      item: false,
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
    ...mapActions(["CreateProduct_files", "CreateProduct", "EditProduct"]),
    // 새로운 상품등록
    create() {
      if (this.item === false) {
        this.CreateProduct(this.product);
        if (this.product.files.length !== 0) {
          let formData = new FormData();
          for (let i = 0; i < this.product.files.length; i++) {
            formData.append("file", this.product.files[i]);
          }
          formData.append("code", this.product.code);
          this.CreateProduct_files(formData);
        }
      } else {
        //기존 상품 수정
        this.EditProduct(this.product);
        if (this.product.files.length !== 0) {
          let formData = new FormData();
          for (let i = 0; i < this.product.files.length; i++) {
            formData.append("file", this.product.files[i]);
          }
          formData.append("code", this.product.code);
          this.CreateProduct_files(formData);
        }
      }
    },
  },
  created() {
    //불러온 category list를 drop에 추가
    for (let i = 0; i < this.Categories.length; i++) {
      this.category.push(
        this.Categories[i].name + "(" + this.Categories[i].code + ")"
      );
    }
    //상품수정이 아니라면 저장돼있던 state 정리
    if (this.$store.state.product.edit === false) {
      this.$store.state.product = {
        edit: false,
        category: [],
        code: "",
        name: "",
        descr: "",
        type: ["hit", "new", "disc", "recom", "best"],
        sale: false,
        detail_desc: "",
        material: "상세페이지 참고",
        size: "상세페이지 참고",
        manufacturer: "상세페이지 참고",
        caution: "상세페이지 참고",
        price: "",
        point: "",
        stock: "",
        shipping: "",
        files: [],
        options: [],
      };
    } else {
      //수정페이지라면 create메서드 실행시 구별할수있도록 표시
      this.item = true;
    }
  },
};
</script>