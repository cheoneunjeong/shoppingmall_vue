<template></template>
<script>
export default {
  created() {
    let code = new URL(window.location.href).searchParams.get("code");
    this.$store.dispatch("kakaoLogin", code);
  },
};
</script>