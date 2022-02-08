<template>
  <div>{{ this.$route.query.name }}</div>
</template>
<script>
export default {
  created() {
    console.log(this.$route.query);
    this.$store.dispatch("Get_ProductList", this.$route.query.code);
  },
};
</script>