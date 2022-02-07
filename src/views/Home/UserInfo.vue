<template>
  <div style="width: 90%" class="mx-auto">
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content><h3>내정보 수정</h3> </v-list-item-content>
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

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-action style="width: 150px"> 권한 </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ UserInfo.AUTH }}
              <v-btn v-if="isAdmin === true" depressed @click="deleteRoleAdmin"
                >권한취소</v-btn
              >
              <v-btn v-else depressed @click="addRoleAdmin">권한주기</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="this.UserInfo.oauth === 'kakao'">
          <v-divider></v-divider>
          <v-list-item-action style="width: 150px">
            카카오계정
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn depressed @click="kakaoUnlink">연동해지</v-btn>
            </v-list-item-title>
            <v-list-item-subtitle
              ><br />
              * 카카오 연동해지시 자동 탈퇴처리됩니다.</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <br />
    <v-col style="text-align: right">
      <v-btn dark color="#448AFF" @click="UpdateUserInfo">수정</v-btn>
    </v-col>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
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
    isAdmin() {
      if (this.UserInfo.auth.indexOf("ROLE_ADMIN") === -1) {
        return false;
      } else return true;
    },
  },
  methods: {
    ...mapActions([
      "Add_Role",
      "Delete_Role",
      "KakaoUnlink",
      "Update_UserInfo",
    ]),
    //카카오연동해지
    kakaoUnlink() {
      this.KakaoUnlink();
    },
    //관리자권한부여
    addRoleAdmin() {
      let User = {
        username: this.UserInfo.id,
        name: this.UserInfo.name,
      };
      this.Add_Role(User);
    },
    //권한삭제
    deleteRoleAdmin() {
      this.Delete_Role(this.UserInfo.id);
    },

    //주소찾기API
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                this.extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
    },
    UpdateUserInfo() {
      let userInfo = {
        username: this.UserInfo.id,
        phone: "",
        address:
          this.address + " " + this.detailAddress + " " + this.extraAddress,
        postcode: this.postcode,
      };
      if (!!this.name) {
        userInfo.name = this.name;
      } else {
        userInfo.name = this.UserInfo.name;
      }
      if (!!this.phone) {
        userInfo.phone = this.phone;
      } else {
        userInfo.phone = this.UserInfo.phone;
      }
      if (!this.postcode || this.address === "") {
        alert("주소를 입력해주세요.");
      } else {
        this.Update_UserInfo(userInfo);
      }
    },
  },
};
</script>