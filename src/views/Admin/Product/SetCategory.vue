<template>
  <div>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>상품분류</v-list-item-title>
            <v-list-item-subtitle>
              <br />
              기본분류는 반드시 선택하셔야 합니다. 하나의 상품에 최대 3개의 다른
              분류를 지정할 수 있습니다.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>기본분류</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                ><v-col class="d-flex" cols="6" sm="3">
                  <v-select
                    label="Outlined style"
                    :items="category"
                    v-model="selected_1"
                    dense
                    outlined
                  ></v-select> </v-col
              ></v-list-item-title>
              <v-list-item-subtitle
                >판매/재고/HTML사용/판매자 E-mail 등을, 선택한 분류의 기본값으로
                설정됩니다. <br />
                또한 기본분류에 적용된 코드 삭제시, 해당 상품은 자동
                삭제됩니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <!-- <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>2차분류</p>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                ><v-col class="d-flex" cols="6" sm="3">
                  <v-select
                    label="Outlined style"
                    :items="category"
                    v-model="selected_2"
                    dense
                    outlined
                  ></v-select> </v-col
              ></v-list-item-title>
              <v-list-item-subtitle
                >2차 분류는 기본 분류의 하위 분류 개념이 아니므로 기본 분류
                선택시 해당 상품이 포함될 최하위 분류만 선택하시면
                됩니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>3차분류</p>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                ><v-col class="d-flex" cols="6" sm="3">
                  <v-select
                    label="Outlined style"
                    :items="category"
                    v-model="selected_3"
                    dense
                    outlined
                  ></v-select> </v-col
              ></v-list-item-title>
              <v-list-item-subtitle
                >3차 분류는 기본 분류의 하위 분류 개념이 아니므로 기본 분류
                선택시 해당 상품이 포함될 최하위 분류만 선택하시면
                됩니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item> -->
      </v-list>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["category"],
  computed: {
    ...mapState(["Categories"]),
    selected_1: {
      get() {
        return this.$store.state.product.category;
      },
      set(value) {
        this.$store.commit("update_category", value);
      },
    },
    // 2차, 3차 분류는 생략
    // selected_2: {
    //   get() {
    //     return this.$store.state.product.category[1];
    //   },
    //   set(value) {
    //     let data = { i: 1, value: value };
    //     this.$store.commit("update_category", data);
    //   },
    // },
    // selected_3: {
    //   get() {
    //     return this.$store.state.product.category[2];
    //   },
    //   set(value) {
    //     let data = { i: 2, value: value };
    //     this.$store.commit("update_category", data);
    //   },
    // },
  },
};
</script>