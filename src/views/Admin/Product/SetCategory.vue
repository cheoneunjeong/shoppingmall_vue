<template>
  <div>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>상품분류</v-list-item-title>
            <v-list-item-subtitle>
              <br />
              기본분류는 반드시 선택하셔야 합니다.
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
                >기본분류에 적용된 코드 삭제시, 해당 상품은 모두 자동
                삭제됩니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
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
  },
};
</script>