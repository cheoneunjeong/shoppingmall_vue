<template>
  <div style="width: 80%" class="mx-auto">
    <br />
    <v-card elevation="0">
      <v-card-title><h4>주문상품</h4> </v-card-title>
    </v-card>
    <v-card style="padding: 50px" class="mx-auto">
      <v-row v-for="(item, index) in item" :key="index">
        <v-col cols="2">
          <v-img
            class="mx-auto"
            :src="require('@/assets/' + item.product.mainPhoto)"
            width="100"
            height="100"
          ></v-img>
        </v-col>
        <v-col>
          <v-container>{{ item.product.name }}</v-container>
        </v-col>
        <v-col>
          <v-card-text>옵션 : {{ item.option }} </v-card-text>
        </v-col>
        <v-col>
          <v-card-text>수량 : {{ item.count }} </v-card-text>
        </v-col>
        <v-col>
          <v-card-text
            >판매가 : {{ item.product.price * item.count }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: this.$route.query,
    };
  },
};
</script>