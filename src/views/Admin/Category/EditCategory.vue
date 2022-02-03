<template>
  <div style="width: 90%" class="mx-auto">
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content
            ><p class="text-md-center">
              {{ this.item.name }} 수정
            </p></v-list-item-content
          >
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>분류코드</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                ><p>{{ this.item.code }}</p></v-list-item-title
              >
              <v-list-item-subtitle
                ><v-btn small>미리보기</v-btn><v-btn small>하위분류추가</v-btn
                ><v-btn small>상품리스트</v-btn></v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>분류명</p>
            </v-list-item-action>

            <v-list-item-content>
              <v-col cols="12" md="4">
                <v-text-field v-model="name" label="name"></v-text-field>
              </v-col>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>재고수량</p>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                <v-col cols="12" md="4">
                  <v-text-field v-model="stock" label="stock"></v-text-field>
                </v-col>
              </v-list-item-title>
              <v-list-item-subtitle
                >상품의 기본재고 수량을 설정합니다. 재고를 사용하지 않는다면
                숫자를 크게 입력하여 주십시오. 예) 999999</v-list-item-subtitle
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
                  <v-checkbox v-model="checked" label="yes"></v-checkbox>
                </v-col>
              </v-list-item-title>
              <v-list-item-subtitle
                >재고가 없거나 일시적으로 판매를 중단하시려면 체크 해제하십시오.
                <br />
                체크 해제하시면 상품 출력을 하지 않으며, 주문도 받지
                않습니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
      <br />
      <br />
      <v-col align="right">
        <v-btn depressed @click="submit">등록</v-btn>
        <v-btn depressed router :to="{ name: 'Category' }">취소</v-btn>
      </v-col>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      item: this.$route.query.item,
      name: this.$route.query.item.name,
      stock: this.$route.query.item.stock,
      checked: this.$route.query.item.sale,
    };
  },
  methods: {
    submit() {
      let category = {
        code: this.item.code,
        name: this.name,
        stock: this.stock,
        sale: this.checked,
      };
      this.$store.dispatch("Edit_Category", category);
    },
  },
  computed: {},
};
</script>
