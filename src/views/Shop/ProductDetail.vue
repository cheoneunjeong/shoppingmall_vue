<template>
  <div>
    <v-card elevation="0" style="padding: 50px" class="mx-auto">
      <v-row>
        <v-col cols="6">
          <v-img
            class="mx-auto"
            :src="require('@/assets/' + productDetails_shop.mainPhoto)"
            width="400"
            height="400"
          ></v-img>
        </v-col>
        <v-col>
          <v-card elevation="0" class="mx-auto">
            <v-card-title>{{ productDetails_shop.name }}</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ms-4">4.5 (413)</div>
              </v-row>
              <br />
              <div class="my-4 text-subtitle-1">
                $ • {{ productDetails_shop.price }}
              </div>
              <div>
                <v-row>
                  <v-col cols="2">배송비</v-col>
                  <v-col cols="5">
                    {{ productDetails_shop.shipping }}
                  </v-col>
                </v-row>
              </div>

              <br />
              <div>{{ productDetails_shop.descr }}</div>

              <br />
            </v-card-text>
            <v-container fluid>
              <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="productDetails_shop.options_s"
                    label="Solo field"
                    dense
                    solo
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text> 바로구매 </v-btn>
              <v-btn color="deep-purple lighten-2" text> 장바구니 </v-btn>
              <v-btn color="deep-purple lighten-2" text @click="wishList()">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <br /><br />
      <v-divider class="mx-4"></v-divider>

      <v-card-title>상품요약정보</v-card-title>

      <v-card-text>
        <div>
          <v-row>
            <v-col cols="3">제품소재</v-col>
            <v-col cols="5">
              {{ productDetails_shop.material }}
            </v-col>
          </v-row>
        </div>
        <br />
        <div>
          <v-row>
            <v-col cols="3">치수</v-col>
            <v-col cols="5">
              {{ productDetails_shop.size }}
            </v-col>
          </v-row>
        </div>
        <br />
        <div>
          <v-row>
            <v-col cols="3">제조사</v-col>
            <v-col cols="5">
              {{ productDetails_shop.manufacturer }}
            </v-col>
          </v-row>
        </div>
        <br />
        <div>
          <v-row>
            <v-col cols="3">세탁방법 및 취습시 주의사항</v-col>
            <v-col cols="5">
              {{ productDetails_shop.caution }}
            </v-col>
          </v-row>
        </div>

        <br /><br />
        {{ productDetails_shop.detail_desc }}
        <br /><br />
        <v-col
          v-for="(item, index) in productDetails_shop.file_list"
          :key="index"
          style="padding: 100px"
        >
          <v-img :src="require('@/assets/' + item)"> </v-img>
        </v-col>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      code: this.$route.query,
    };
  },
  methods: {
    wishList() {
      if (this.UserInfo.login_success === true) {
        if (this.UserInfo.wishList.indexOf(this.code) === -1) {
          this.UserInfo.wishList.push(this.code);
          let user = {
            username: this.UserInfo.id,
            wishList: this.UserInfo.wishList,
          };
          this.$store.dispatch("Insert_WishList", user);
        }
      } else {
        alert("로그인이 필요합니다.");
      }
    },
  },
  computed: {
    ...mapState(["productDetails_shop", "UserInfo"]),
  },
  created() {
    this.$store.dispatch("Get_ProductDetails_shop", this.code);
  },
};
</script>