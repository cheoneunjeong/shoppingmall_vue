<template>
  <div style="width: 60%" class="mx-auto">
    <br />
    <v-alert prominent type="error">
      <v-row align="center">
        <v-col class="grow">
          결제에 실패하였습니다. 주문서를 다시 작성해주십시오.
        </v-col>
        <v-col class="shrink">
          <v-btn router :to="{ name: 'Main' }">돌아가기</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("Delete_FailOrderInfo");
  },
};
</script>