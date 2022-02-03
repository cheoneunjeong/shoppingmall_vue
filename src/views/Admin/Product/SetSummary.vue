<template>
  <div>
    <v-card>
      <v-list>
        <v-list-item> 상품요약정보 </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 160px">
              <p>제품소재</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <v-col cols="12" md="3">
                  <v-text-field
                    label="material"
                    v-model="material"
                  ></v-text-field>
                </v-col>
              </v-list-item-title>
              <v-list-item-subtitle
                >섬유의 조성 또는 혼용률을 백분율로 표시, 기능성인 경우 성적서
                또는 허가서</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>치수</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-col cols="12" md="3">
                <v-text-field v-model="size" label="size"></v-text-field>
              </v-col>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>제조사</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="manufacturer"
                    label="manufacturer"
                  ></v-text-field>
                </v-col>
              </v-list-item-title>
              <v-list-item-subtitle
                >수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입
                여부로 대체 가능)</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>세탁방법 및 취급시 주의사항</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-col cols="12" md="3">
                <v-text-field label="caution" v-model="caution"></v-text-field>
              </v-col>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  computed: {
    material: {
      get() {
        return this.$store.state.product.material;
      },
      set(value) {
        this.$store.commit("update_material", value);
      },
    },
    size: {
      get() {
        return this.$store.state.product.size;
      },
      set(value) {
        this.$store.commit("update_size", value);
      },
    },
    manufacturer: {
      get() {
        return this.$store.state.product.manufacturer;
      },
      set(value) {
        this.$store.commit("update_manufacturer", value);
      },
    },
    caution: {
      get() {
        return this.$store.state.product.caution;
      },
      set(value) {
        this.$store.commit("update_caution", value);
      },
    },
  },
};
</script>