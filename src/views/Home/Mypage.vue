<template>
  <div style="width: 100%" class="mx-auto">
    <v-row dense>
      <v-col cols="3">
        <v-card width="300px" style="padding: 10px">
          <v-list style="text-align: center">
            <v-list-item>
              <v-list-item-title>
                {{ UserInfo.name }}님 환영합니다.
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn
                  v-if="$route.name !== 'shopMypage'"
                  color="hsl(231, 30%, 54%)"
                  dark
                  small
                  router
                  :to="{ name: 'UserInfo' }"
                  >정보수정</v-btn
                >
                <v-btn
                  v-else
                  color="hsl(231, 30%, 54%)"
                  dark
                  small
                  router
                  :to="{ name: 'shopUserInfo' }"
                  >정보수정</v-btn
                >
                <v-btn small @click="logOut">로그아웃</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-row>
                  <v-col> <font-awesome-icon icon="coins" />포인트 </v-col>
                </v-row>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title style="text-align: right">
                  {{ UserInfo.point }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <br />
            <div style="text-align: left">
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title><h4>내정보</h4></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> <p>연락처</p></v-list-item-title>
                  <v-list-item-subtitle>
                    {{ UserInfo.phone }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> <p>아이디</p></v-list-item-title>
                  <v-list-item-subtitle>
                    {{ UserInfo.id }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> <p>주소</p></v-list-item-title>
                  {{ UserInfo.address }}
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item @click="unlink(UserInfo.name)">
                <v-list-item-subtitle>
                  <br />
                  회원탈퇴
                </v-list-item-subtitle>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title><h4>주문내역조회</h4> </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            @click:row="orderDetails"
            :headers="headers"
            :items="orderList"
            :search="search"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Route from "@/router/index";
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "주문번호", value: "orderCode" },
        { text: "주문일시", value: "datetime" },
        { text: "진행상황", value: "state" },
        //{text:"주문상품", value:"datetime"},
        { text: "사용포인트", value: "point" },
        { text: "결제금액", value: "total" },
      ],
    };
  },
  computed: {
    ...mapState(["UserInfo", "orderList"]),
  },
  methods: {
    ...mapActions(["Delete_User"]),
    unlink(username) {
      if (this.UserInfo.oauth === "kakao") {
        alert(
          "카카오 연동이 되어있습니다. 정보수정에서 연동해지시 자동탈퇴처리됩니다."
        );
      } else {
        this.Delete_User(username);
      }
    },

    logOut() {
      this.$store.commit("LOGOUT");
    },
    orderDetails(row) {
      Route.push({ name: "OrderDetails", query: row.products });
    },
  },
  created() {
    this.$store.dispatch("Get_OrderSuccess_List");
  },
};
</script>