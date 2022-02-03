<template>
  <div>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content> 배송비 </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>배송비 유형</p>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                ><v-col class="d-flex" cols="6" sm="3">
                  <v-select
                    label="shipping fee"
                    :items="items"
                    v-model="shipping"
                    dense
                    outlined
                  ></v-select> </v-col
              ></v-list-item-title>
              <v-list-item-subtitle
                >배송비 유형을 선택하면 자동으로 항목이
                변환됩니다.</v-list-item-subtitle
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
      items: ["쇼핑몰 기본설정 사용", "무료배송"],
      selected: "",
    };
  },
  computed: {
    shipping: {
      get() {
        return this.$store.state.product.shipping;
      },
      set(value) {
        this.$store.commit("update_shipping", value);
      },
    },
  },
};
</script>