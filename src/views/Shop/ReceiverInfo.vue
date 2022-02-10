<template>
  <div>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-action style="width: 150px"> 이름 </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <v-text-field
            style="width: 150px"
            v-model="receiver_name"
            placeholder="받으시는 분 성함"
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
            <input
              type="text"
              v-model="receiver_postcode"
              placeholder="우편번호"
            />
          </v-col>
          <v-col>
            <v-btn small @click="execDaumPostcode()">우편번호 찾기</v-btn>
          </v-col>
        </v-row>
        <br />
        <input type="text" v-model="receiver_address" placeholder="주소" />
        <br />
        <input
          type="text"
          v-model="receiver_detailAddress"
          placeholder="상세주소"
        /><br />
        <br />
        <input
          type="text"
          v-model="receiver_extraAddress"
          placeholder="참고항목"
        />
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item>
      <v-list-item-action style="width: 150px"> 연락처 </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <v-text-field
            style="width: 150px"
            v-model="receiver_phone"
            placeholder="받으시는 분 연락처"
          >
          </v-text-field>
        </v-list-item-title>
        <v-list-item-subtitle> "-" 표시는 생략</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      receiver_address: "",
      receiver_detailAddress: "",
      receiver_extraAddress: "",
    };
  },
  computed: {
    receiver_name: {
      get() {
        return this.$store.state.orderInfo.receiverInfo.receiver_name;
      },
      set(value) {
        this.$store.commit("update_receiver_name", value);
      },
    },
    receiver_phone: {
      get() {
        return this.$store.state.orderInfo.receiverInfo.receiver_phone;
      },
      set(value) {
        this.$store.commit("update_receiver_phone", value);
      },
    },
    receiver_postcode: {
      get() {
        return this.$store.state.orderInfo.receiverInfo.receiver_postcode;
      },
      set(value) {
        this.$store.commit("update_receiver_postcode", value);
      },
    },
    address: {
      get() {
        return this.$store.state.orderInfo.receiverInfo.address;
      },
      set(value) {
        this.$store.commit("update_final_address", value);
      },
    },
  },
  methods: {
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.receiver_extraAddress !== "") {
            this.receiver_extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            this.receiver_address = data.roadAddress;
          } else {
            this.receiver_address = data.jibunAddress;
          }
          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.receiver_extraAddress += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.receiver_extraAddress +=
                this.receiver_extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            if (this.receiver_extraAddress !== "") {
              this.receiver_extraAddress = `(${this.receiver_extraAddress})`;
            }
          } else {
            this.receiver_extraAddress = "";
          }
          this.receiver_postcode = data.zonecode;
          this.address =
            this.receiver_address +
            " " +
            this.receiver_detailAddress +
            " " +
            this.receiver_extraAddress;
        },
      }).open();
    },
  },
  created() {
    this.$store.state.orderInfo.receiverInfo = {
      receiver_name: null,
      receiver_phone: null,
      receiver_postcode: null,
      address: null,
    };
  },
};
</script>