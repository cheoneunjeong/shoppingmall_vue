<template>
  <div>
    <v-card>
      <v-list>
        <v-list-item> 가격 및 재고 </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 160px">
              <p>판매가격</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-col cols="12" md="3">
                <v-row align="center">
                  <v-text-field label="price"></v-text-field>
                  원</v-row
                >
              </v-col>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>포인트 유형</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                ><v-col class="d-flex" cols="6" sm="3">
                  <v-select label="설정금액" dense outlined></v-select> </v-col
              ></v-list-item-title>
              <v-list-item-subtitle
                >포인트 유형을 설정할 수 있습니다. 비율로 설정했을 경우 설정
                기준금액의 %비율로 포인트가 지급됩니다.</v-list-item-subtitle
              >
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
                <v-col cols="12" md="3">
                  <v-row align="center">
                    <v-text-field label="stock"></v-text-field>
                    개</v-row
                  >
                </v-col></v-list-item-title
              >
              <v-list-item-subtitle
                >주문관리에서 상품별 상태 변경에 따라 자동으로 재고를
                가감합니다. <br />
                재고는 규격/색상별이 아닌, 상품별로만 관리됩니다. 재고수량을
                0으로 설정하시면 품절상품으로 표시됩니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 150px">
              <p>상품선택옵션</p>
            </v-list-item-action>
            <v-list-item-content
              ><v-list-item-title>
                <v-row>
                  <v-col sm="3">
                    <v-select label="옵션1" dense outlined></v-select>
                  </v-col>
                  <v-col sm="5">
                    <v-select label="옵션1 항목" dense outlined></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="3">
                    <v-select label="옵션2" dense outlined></v-select>
                  </v-col>
                  <v-col sm="5">
                    <v-select label="옵션2 항목" dense outlined></v-select>
                  </v-col>
                </v-row> </v-list-item-title
              ><v-list-item-subtitle
                >옵션항목은 콤마(,) 로 구분하여 여러개를 입력할 수 있습니다.<br />
                스마트폰을 예로 들어 [추가1 : 추가구성상품 , 추가1 항목 :
                액정보호필름,케이스,충전기] 옵션명과 옵션항목에 따옴표(', ")는
                입력할 수 없습니다.</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {};
</script>