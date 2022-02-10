<template>
  <div style="width: 90%" class="mx-auto">
    <br />
    <v-card elevation="0">
      <v-card-title><h4>주문서 작성</h4> </v-card-title>
    </v-card>
    <br />
    <v-divider></v-divider>
    <br />
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content><h3>주문하시는 분</h3> </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-action style="width: 150px"> 이름 </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <v-text-field
                style="width: 150px"
                v-model="name"
                :placeholder="UserInfo.name"
              >
              </v-text-field>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item style="height: 200px">
          <v-list-item-action style="width: 150px"> 주소 </v-list-item-action>
          <v-list-item-content>
            <v-row>
              <v-col cols="4">
                <input type="text" v-model="postcode" placeholder="우편번호" />
              </v-col>
              <v-col>
                <v-btn small @click="execDaumPostcode()">우편번호 찾기</v-btn>
              </v-col>
            </v-row>
            <br />
            <input type="text" v-model="address" placeholder="주소" />
            <br />
            <input
              type="text"
              v-model="detailAddress"
              placeholder="상세주소"
            /><br />
            <br />
            <input type="text" v-model="extraAddress" placeholder="참고항목" />
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-action style="width: 150px"> 연락처 </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <v-text-field
                style="width: 150px"
                v-model="phone"
                :placeholder="UserInfo.phone"
              >
              </v-text-field>
            </v-list-item-title>
            <v-list-item-subtitle> "-" 표시는 생략</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <br />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      name: null,
      phone: null,
      postcode: null,
      address: "",
      detailAddress: "",
      extraAddress: "",
    };
  },
  computed: {
    ...mapState(["UserInfo"]),
  },
};
</script>