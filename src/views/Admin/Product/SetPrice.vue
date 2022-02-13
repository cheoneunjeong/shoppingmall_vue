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
                >포인트 유형을 설정할 수 있습니다. 기본설정비율은 판매가기준 3%
                입니다.</v-list-item-subtitle
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
              <v-list-item-subtitle>
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
                <v-container fluid>
                  <AddOption
                    v-for="(item, index) in options"
                    :key="index"
                    :index="index"
                  />
                  <v-col>
                    <v-btn rounded text @click="addOption">
                      <font-awesome-icon icon="plus-circle" />
                      옵션 추가
                    </v-btn>
                  </v-col>
                </v-container> </v-list-item-title
              ><v-list-item-subtitle
                >옵션을 작성하지 않을 경우 "옵션없음" 으로
                등록됩니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import AddOption from "@/views/Admin/Product/AddOption";
export default {
  data() {
    return {
      pointType: ["판매가기준 설정비율"],
    };
  },
  components: { AddOption },
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
    options: {
      get() {
        return this.$store.state.product.options;
      },
      set(value) {
        this.$store.commit("update_options", value);
      },
    },
  },
  methods: {
    addOption() {
      this.$store.state.product.options.push({ option: {} });
    },
    consol() {
      console.log(this.$store.state.product);
    },
  },

  created() {
    if (this.$store.state.product.edit === false) {
      this.$store.state.product.options.push({ option: {} });
    }
  },
};
</script>