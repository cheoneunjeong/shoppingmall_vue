<template>
  <div style="width: 100%">
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>답글 작성</h4> </v-card-title>
      <br />
      <v-container class="pa-1">
        <v-card style="padding: 20px">
          <v-row>
            <v-col cols="12" sm="5">
              <v-text-field
                color="purple darken-2"
                label="제목"
                required
                v-model="title"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-textarea
            rows="10"
            row-height="15"
            outlined
            label="답글내용을 입력해주세요."
            v-model="content"
          ></v-textarea>
          <v-col align="right">
            <v-btn depressed @click="save">저장 </v-btn>
          </v-col>
        </v-card>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      titleType: "",
      content: "",
      itmes: ["배송문의", "상품문의", "기타사항"],
      item: this.$route.query,
    };
  },

  methods: {
    save() {
      let post = {
        title: this.title,
        type: this.$route.query.type,
        content: this.content,
        writer: this.$store.state.UserInfo.id,
        groups: this.$route.query.groups,
        orders: this.$route.query.orders,
        depth: this.$route.query.depth,
        num: this.$route.query.num,
      };
      this.$store.dispatch("Save_AnswerPost", post);
    },
  },
};
</script>