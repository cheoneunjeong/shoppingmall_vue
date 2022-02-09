<template>
  <div>
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-row>
        <v-col cols="6">
          <v-img
            class="mx-auto"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            width="400"
            height="400"
          ></v-img>
        </v-col>
        <v-col>
          <v-card elevation="0" class="mx-auto">
            <v-card-title>상품명</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ms-4">4.5 (413)</div>
              </v-row>
              <br />
              <div class="my-4 text-subtitle-1">$ • 가격</div>
              <div>배송비</div>

              <br />
              <div>상품설명</div>

              <br />
            </v-card-text>
            <v-container fluid>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="items"
                    label="Solo field"
                    dense
                    solo
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text> 바로구매 </v-btn>
              <v-btn color="deep-purple lighten-2" text> 장바구니 </v-btn>
              <v-btn color="deep-purple lighten-2" text>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <br /><br />
      <v-divider class="mx-4"></v-divider>

      <v-card-title>상품요약정보</v-card-title>

      <v-card-text>
        제품소재
        <br />
        치수
        <br />
        제조사
        <br />
        세탁방법 및 취습시 주의사항
        <br /><br />
        상세설명
        <br /><br />
        이미지
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: this.$route.query,
    };
  },
  methods: {},
  created() {
    this.$store.dispatch("Get_ProductDetails_shop", this.code);
  },
};
</script>