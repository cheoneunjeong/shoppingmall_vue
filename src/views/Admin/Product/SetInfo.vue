<template>
  <div>
    <v-card>
      <v-list>
        <v-list-item> 기본정보 </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>상품코드</p>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                <v-col cols="12" md="4">
                  <v-text-field v-model="code" label="code"></v-text-field>
                </v-col>
              </v-list-item-title>
              <v-list-item-subtitle>
                상품코드는 영문자, 숫자, - 만 입력
                가능합니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>상품명</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <v-col cols="12" md="4">
                  <v-text-field v-model="name" label="name"></v-text-field>
                </v-col>
              </v-list-item-title>
              <v-list-item-subtitle
                >HTML 입력이 불가합니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>기본설명</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="desc"
                    label="description"
                  ></v-text-field>
                </v-col>
              </v-list-item-title>
              <v-list-item-subtitle>
                상품명 하단에 상품에 대한 추가적인 설명이 필요한 경우에
                입력합니다. HTML 입력도 가능합니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>상품유형</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <v-card flat>
                  <v-card-text>
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12" sm="4" md="4">
                          <v-checkbox
                            v-model="type"
                            label="hit"
                            color="red"
                            value="hit"
                            hide-details
                          ></v-checkbox>
                          <v-checkbox
                            v-model="type"
                            label="recommend"
                            color="red darken-3"
                            value="recom"
                            hide-details
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                          <v-checkbox
                            v-model="type"
                            label="new"
                            color="indigo"
                            value="new"
                            hide-details
                          ></v-checkbox>
                          <v-checkbox
                            v-model="type"
                            label="best"
                            color="indigo darken-3"
                            value="best"
                            hide-details
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                          <v-checkbox
                            v-model="type"
                            label="discount"
                            color="orange"
                            value="disc"
                            hide-details
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-list-item-title>
              <v-list-item-subtitle>
                메인화면에 유형별로 출력할때 사용합니다. <br />이곳에
                체크하게되면 상품리스트에서 유형별로 정렬할때 체크된 상품이 가장
                먼저 출력됩니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>판매가능</p>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                <v-col cols="12" md="4">
                  <v-checkbox v-model="isSale" label="yes"></v-checkbox>
                </v-col>
              </v-list-item-title>
              <v-list-item-subtitle
                >잠시 판매를 중단하거나 재고가 없을 경우에 체크를 해제해 놓으면
                출력되지 않으며, 주문도 받지 않습니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>상품설명</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-container
                ><v-row>
                  <v-col>
                    <v-textarea v-model="detail_desc" outlined></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
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
    return {};
  },
  computed: {
    code: {
      get() {
        return this.$store.state.product.code;
      },
      set(value) {
        this.$store.commit("update_code", value);
      },
    },
    name: {
      get() {
        return this.$store.state.product.name;
      },
      set(value) {
        this.$store.commit("update_name", value);
      },
    },
    desc: {
      get() {
        return this.$store.state.product.desc;
      },
      set(value) {
        this.$store.commit("update_desc", value);
      },
    },
    type: {
      get() {
        return this.$store.state.product.type;
      },
      set(value) {
        this.$store.commit("update_type", value);
      },
    },
    isSale: {
      get() {
        return this.$store.state.product.sale;
      },
      set(value) {
        this.$store.commit("update_isSale", value);
      },
    },
    detail_desc: {
      get() {
        return this.$store.state.product.detail_desc;
      },
      set(value) {
        this.$store.commit("update_detail_desc", value);
      },
    },
  },
  methods: {},
};
</script>