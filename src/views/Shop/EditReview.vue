<template>
  <div style="width: 100%">
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-card-title><h4>후기 수정</h4> </v-card-title>
      <br />
      <v-container class="pa-1">
        <v-card style="padding: 20px">
          <v-row>
            <v-col cols="1"> 별점: </v-col>
            <v-rating
              v-model="rating"
              background-color="orange lighten-3"
              color="orange"
            ></v-rating>
          </v-row>
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
            color="purple darken-2"
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
      content: "",
      item: this.$route.query.item,
      rating: 5,
    };
  },

  methods: {
    save() {
      let review = {
        title: this.title,
        content: this.content,
        writer: this.$store.state.UserInfo.id,
        rating: this.rating,
        num: this.item.num,
        p_code: this.item.p_code,
      };
      this.$store.dispatch("Edit_Review", review);
    },
  },
};
</script>