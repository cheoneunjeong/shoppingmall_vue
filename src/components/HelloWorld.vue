<template>
  <v-card class="mx-auto" width="600" height="600">
    <v-card-text>
      <p class="text-h5 text--primary">쇼핑몰 통합관리 솔루션</p>
      <p>1인 프로젝트</p>

      <div class="text-h6 text--primary">
        <v-list shaped>
          <v-card-title class="text-h6 text--primary"> Skill.</v-card-title>
          <v-list-item>
            <v-list-item-icon> Front-End </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Vue.js , Vuetifyjs</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>Back-End </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Java, Spring-boot, Rest-API</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>Database </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>MariaDB</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>Deploy </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>AWS (EC2)</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <br /><br />
      <p>관리자 아이디로 로그인시 관리자 페이지 접근가능</p>
      <p>Id : aa</p>
      <p>Password : aa</p>
    </v-card-text>
  </v-card>
</template>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
<script>
export default {};
</script>