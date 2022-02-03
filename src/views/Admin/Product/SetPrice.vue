<template>
  <div>
    <v-card>
      <v-list>
        <v-list-item> 가격 및 재고 </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 160px">
              <p>판매가격</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-row align="center">
                <v-col cols="5" md="3">
                  <v-text-field v-model="price" label="price"></v-text-field>
                </v-col>
                원
              </v-row>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>포인트 유형</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                ><v-col class="d-flex" cols="6" sm="3">
                  <v-select
                    label="설정금액"
                    dense
                    outlined
                    v-model="point"
                    :items="pointType"
                  ></v-select> </v-col
              ></v-list-item-title>
              <v-list-item-subtitle
                >포인트 유형을 설정할 수 있습니다. 비율로 설정했을 경우 설정
                기준금액의 %비율로 포인트가 지급됩니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>재고수량</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <v-row align="center">
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="stock"
                      label="stock"
                    ></v-text-field> </v-col
                  >개
                </v-row></v-list-item-title
              >
              <v-list-item-subtitle
                >주문관리에서 상품별 상태 변경에 따라 자동으로 재고를
                가감합니다. <br />
                재고는 규격/색상별이 아닌, 상품별로만 관리됩니다. 재고수량을
                0으로 설정하시면 품절상품으로 표시됩니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>상품선택옵션</p>
            </v-list-item-action>
            <v-list-item-content
              ><v-list-item-title>
                <v-row align="center">
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="option1"
                      label="option1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="option1_details"
                      label="option1 details"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="option2"
                      label="option2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="option2_details"
                      label="option2 details"
                    ></v-text-field>
                  </v-col>
                </v-row> </v-list-item-title
              ><v-list-item-subtitle
                >옵션항목은 콤마(,) 로 구분하여 여러개를 입력할 수 있습니다.<br />
                스마트폰을 예로 들어 [추가1 : 추가구성상품 , 추가1 항목 :
                액정보호필름,케이스,충전기] 옵션명과 옵션항목에 <br />
                따옴표(', ")는 입력할 수 없습니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pointType: ["판매가기준 설정비율", "구매가기준 설정비율"],
    };
  },
  computed: {
    price: {
      get() {
        return this.$store.state.product.price;
      },
      set(value) {
        this.$store.commit("update_price", value);
      },
    },
    point: {
      get() {
        return this.$store.state.product.point;
      },
      set(value) {
        this.$store.commit("update_point", value);
      },
    },
    stock: {
      get() {
        return this.$store.state.product.stock;
      },
      set(value) {
        this.$store.commit("update_stock", value);
      },
    },
    option1: {
      get() {
        return this.$store.state.product.options[0].option;
      },
      set(value) {
        let data = { i: 0, value: value };
        this.$store.commit("update_option1", data);
      },
    },
    option1_details: {
      get() {
        return this.$store.state.product.options[0].op_detail;
      },
      set(value) {
        let data = { i: 0, value: value };
        this.$store.commit("update_option2", data);
      },
    },
    option2: {
      get() {
        return this.$store.state.product.options[1].option;
      },
      set(value) {
        let data = { i: 1, value: value };
        this.$store.commit("update_option1", data);
      },
    },
    option2_details: {
      get() {
        return this.$store.state.product.options[1].op_detail;
      },
      set(value) {
        let data = { i: 1, value: value };
        this.$store.commit("update_option2", data);
      },
    },
  },
};
</script>