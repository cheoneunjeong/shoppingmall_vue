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
              <p>메인이미지 첨부</p>
            </v-list-item-action>
            <v-list-item-content
              ><v-col cols="12" md="5">
                <v-file-input
                  v-model="mainfile"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="image"
                  @change="onMainImageChange"
                ></v-file-input>
              </v-col>
              <div>
                upload :
                <v-btn
                  @click="cancel_main(item)"
                  depressed
                  small
                  v-for="(item, index) in this.mainfiles"
                  :key="index"
                  >{{ item.name }} X</v-btn
                >
              </div>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>
                상세페이지<br />
                이미지 첨부
              </p>
            </v-list-item-action>
            <v-list-item-content
              ><v-col cols="12" md="5">
                <v-file-input
                  v-model="detailfile"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="image"
                  @change="onDetailImageChange"
                ></v-file-input>
              </v-col>
              <div>
                upload :
                <v-btn
                  @click="cancel_detail(item)"
                  depressed
                  small
                  v-for="(item, index) in this.detailfiles"
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
      mainfile: null,
      detailfile: null,
    };
  },
  computed: {
    mainfiles: {
      get() {
        return this.$store.state.product.mainfiles;
      },
      set(value) {
        this.$store.commit("update_mainfiles", value);
      },
    },
    detailfiles: {
      get() {
        return this.$store.state.product.detailfiles;
      },
      set(value) {
        this.$store.commit("update_detailfiles", value);
      },
    },
  },
  methods: {
    onMainImageChange() {
      if (!!this.mainfile) {
        this.mainfiles.push(this.mainfile);
        this.mainfile = null;
      }
    },
    onDetailImageChange() {
      if (!!this.detailfile) {
        this.detailfiles.push(this.detailfile);
        this.detailfile = null;
      }
    },
    cancel_main(item) {
      const p = this.mainfiles.indexOf(item);
      this.mainfiles.splice(p, 1);
    },
    cancel_detail(item) {
      const p = this.detailfiles.indexOf(item);
      this.detailfiles.splice(p, 1);
    },
  },
};
</script>