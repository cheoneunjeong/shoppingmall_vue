<template>
  <v-row align="center">
    <v-col cols="12" md="5">
      <v-text-field
        outlined
        dense
        v-model="option"
        label="option"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["index"],
  data() {
    return {};
  },
  computed: {
    option: {
      get() {
        return this.$store.state.product.options[this.index].option;
      },
      set(value) {
        let data = { value: value, index: this.index };
        this.$store.commit("update_option", data);
      },
    },
  },
};
</script>