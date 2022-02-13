<template>
  <div style="width: 60%" class="mx-auto">
    <br />
    <v-alert prominent type="success">
      <v-row align="center">
        <v-col class="grow"> 주문에 성공하였습니다. </v-col>
        <v-col class="shrink">
          <v-btn router :to="{ name: 'shopMypage' }">주문내역확인</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>
<script>
export default {
  created() {
    //사용자 포인트차감 & 상품재고차감
    this.$store.dispatch("After_Success_Order", this.$store.state.UserInfo.id);
  },
};
</script>