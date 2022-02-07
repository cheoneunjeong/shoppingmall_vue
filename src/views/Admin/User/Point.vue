<template>
  <div style="width: 90%" class="mx-auto">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        item-key="datetime"
        :headers="headers"
        :items="PointList"
        :search="search"
      >
      </v-data-table>
    </v-card>
    <br />
    <v-card width="45%">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <p>개별회원 포인트 증감 설정</p>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 100px">
              <p>회원아이디</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-col>
                <v-text-field
                  outlined
                  dense
                  v-model="id"
                  style="width: 150px"
                ></v-text-field>
              </v-col>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <template>
            <v-list-item-action style="width: 100px">
              <p>포인트내용</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-col>
                <v-text-field
                  outlined
                  dense
                  v-model="contents"
                  style="width: 350px"
                ></v-text-field>
              </v-col>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <template>
            <v-list-item-action style="width: 100px">
              <p>포인트</p>
            </v-list-item-action>
            <v-list-item-content>
              <v-col>
                <v-text-field
                  outlined
                  dense
                  v-model="point"
                  style="width: 150px"
                ></v-text-field>
              </v-col>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-col align="right">
        <v-btn depressed @click="givePoint">확인</v-btn>
      </v-col>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      id: "",
      contents: "",
      point: "",
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "CONTENTS", value: "contents" },
        { text: "POINT", value: "point" },
        { text: "DATETIME", value: "datetime" },
        { text: "TOTAL", value: "total" },
      ],
    };
  },
  computed: {
    ...mapState(["PointList"]),
  },
  methods: {
    givePoint() {
      let payload = {
        id: this.id,
        contents: this.contents,
        point: this.point,
      };
      this.$store.dispatch("Give_Point", payload);
    },
  },
  created() {
    this.$store.dispatch("Get_PointList");
  },
};
</script>