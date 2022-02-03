<template>
  <div>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content> 이미지 </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>이미지 첨부</p>
            </v-list-item-action>
            <v-list-item-content
              ><v-col cols="12" md="5">
                <v-file-input
                  v-model="file"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="image"
                  @change="onImageChange"
                ></v-file-input>
              </v-col>
              <div>
                upload :
                <v-btn
                  @click="cancel(item)"
                  depressed
                  small
                  v-for="(item, index) in this.files"
                  :key="index"
                  >{{ item.name }} X</v-btn
                >
              </div>
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
      file: null,
    };
  },
  computed: {
    files: {
      get() {
        return this.$store.state.product.files;
      },
      set(value) {
        this.$store.commit("update_files", value);
      },
    },
  },
  methods: {
    onImageChange() {
      if (!!this.file) {
        this.files.push(this.file);
        this.file = null;
      }
    },
    cancel(item) {
      const p = this.files.indexOf(item);
      this.files.splice(p, 1);
    },
  },
};
</script>