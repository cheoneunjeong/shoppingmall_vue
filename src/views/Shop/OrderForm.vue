<template>
  <div style="width: 90%" class="mx-auto">
    <br />
    <v-card elevation="0">
      <v-card-title><h4>주문서 작성</h4> </v-card-title>
    </v-card>
    <br />
    <v-divider></v-divider>
    <br />

    <v-card style="padding: 50px" class="mx-auto">
      <v-row v-for="(item, index) in orderRequest" :key="index">
        <v-col cols="2">
          <v-img
            class="mx-auto"
            :src="require('@/assets/' + item.product.mainPhoto)"
            width="100"
            height="100"
          ></v-img>
        </v-col>
        <v-col>
          <v-container>{{ item.product.name }}</v-container>
        </v-col>
        <v-col>
          <v-card-text>옵션 : {{ item.option }} </v-card-text>
        </v-col>
        <v-col>
          <v-card-text>수량 : {{ item.count }} </v-card-text>
        </v-col>
        <v-col>
          <v-card-text
            >판매가 : {{ item.product.price * item.count }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
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
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content><h3>받으시는 분</h3> </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-checkbox v-model="check"></v-checkbox>주문자와 동일
          </v-list-item-content>
        </v-list-item>
        <div v-if="this.check === false">
          <ReceiverInfo />
        </div>
      </v-list>
    </v-card>
    <br />
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content><h3>포인트사용</h3> </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-action style="width: 100px">
                사용포인트
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-row align="center">
                    <v-col cols="12" md="9">
                      <v-text-field
                        v-model="point"
                        @change="checkPoint"
                      ></v-text-field>
                    </v-col>
                    점
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action style="width: 100px">
                보유 포인트
              </v-list-item-action>
              <v-list-item-content>
                {{ this.UserInfo.point }}점
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-action style="width: 100px">
                결제금액
              </v-list-item-action>
              <v-list-item-content>
                <v-card-text>상품 : {{ this.price }}</v-card-text>
                <v-card-text
                  >배송비 :
                  {{ this.shipping === 0 ? "무료배송" : 2500 }}
                </v-card-text>
                <v-card-text>총계 :{{ this.total }} </v-card-text>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-action style="width: 150px">
                결제하기
              </v-list-item-action>
              <v-list-item-content>
                <a @click="kakaopay()">
                  <img
                    style="padding-top: 10px"
                    height="40px"
                    src="@/assets/payment_icon_yellow_medium.png"
                  />
                </a>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <br />
  </div>
</template>
<script>
import { mapState } from "vuex";
import ReceiverInfo from "@/views/Shop/ReceiverInfo";
export default {
  data() {
    return {
      check: false,
      name: null,
      phone: null,
      postcode: null,
      address: "",
      detailAddress: "",
      extraAddress: "",
      price_: 0,
      point: 0,
    };
  },
  computed: {
    ...mapState(["UserInfo", "orderRequest"]),
    price: {
      get() {
        for (let i = 0; i < this.orderRequest.length; i++) {
          let item =
            this.orderRequest[i].product.price * this.orderRequest[i].count;
          this.price_ = +item;
        }
        return this.price_;
      },
    },
    shipping: {
      get() {
        let ship = false;
        for (let i = 0; i < this.orderRequest.length; i++) {
          this.orderRequest[i].product.shipping === "쇼핑몰 기본설정 사용"
            ? (ship = true)
            : "";
        }
        if (ship === true) {
          return 2500;
        } else {
          return 0;
        }
      },
    },
    total: {
      get() {
        return this.price + this.shipping - this.point;
      },
    },
  },
  components: {
    ReceiverInfo,
  },
  methods: {
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            this.address = data.roadAddress;
          } else {
            this.address = data.jibunAddress;
          }
          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                this.extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          this.postcode = data.zonecode;
        },
      }).open();
    },
    checkPoint() {
      if (this.point > this.UserInfo.point) {
        alert("보유포인트가 부족합니다.");
        this.point = 0;
      }
      if (this.point > this.price + this.shipping) {
        this.point = this.price + this.shipping;
      }
    },
    kakaopay() {
      let info = {
        products: this.orderRequest,
        userInfo: {
          username: this.UserInfo.id,
          name: this.name,
          phone: this.phone,
          address:
            this.address + " " + this.detailAddress + " " + this.extraAddress,
          postcode: this.postcode,
        },
        payway: "카카오페이",
        point: this.point,
        total: this.total,
        check: this.check,
      };
      console.log(info);
      this.$store.dispatch("Buy_items", info);
    },
  },
  created() {
    this.$store.dispatch("Get_OrderList", this.$route.query);
    this.price_ = 0;
  },
};
</script>