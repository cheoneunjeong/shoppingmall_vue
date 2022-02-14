<template>
  <div style="width: 100%" class="mx-auto">
    <v-row>
      <v-col cols="6">
        <v-card width="600px">
          <v-card-title><h4>주문자 정보</h4> </v-card-title>
          <br />
          <v-list>
            <v-list-item>
              <v-list-item-action style="width: 200px">
                아이디
              </v-list-item-action>
              <v-list-item-content>
                {{ orderInfo_address.user.username }}
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-action style="width: 200px">
                이름
              </v-list-item-action>
              <v-list-item-content>
                {{ orderInfo_address.user.name }}
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-action style="width: 200px">
                우편번호
              </v-list-item-action>
              <v-list-item-content>
                {{ this.orderInfo_address.user.postcode }}
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-action style="width: 200px">
                주소
              </v-list-item-action>
              <v-list-item-content>
                {{ this.orderInfo_address.user.address }}
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-action style="width: 200px">
                연락처
              </v-list-item-action>
              <v-list-item-content>
                {{ this.orderInfo_address.user.phone }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-title><h4>수취인 정보</h4> </v-card-title>
          <br />
          <div v-if="this.orderInfo_address.receiver.same !== '주문자와 동일'">
            <v-list>
              <v-list-item>
                <v-list-item-action style="width: 200px">
                  이름
                </v-list-item-action>
                <v-list-item-content>
                  {{ this.orderInfo_address.receiver.receiver_name }}
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-action style="width: 200px">
                  우편번호
                </v-list-item-action>
                <v-list-item-content>
                  {{ this.orderInfo_address.receiver.receiver_postcode }}
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-action style="width: 200px">
                  주소
                </v-list-item-action>
                <v-list-item-content>
                  {{ this.orderInfo_address.receiver.address }}
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-action style="width: 200px">
                  연락처
                </v-list-item-action>
                <v-list-item-content>
                  {{ this.orderInfo_address.receiver.receiver_phone }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <div v-else>
            <v-list>
              <v-list-item> 주문자정보와 동일 </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["orderInfo_address"]),
  },
  created() {},
};
</script>