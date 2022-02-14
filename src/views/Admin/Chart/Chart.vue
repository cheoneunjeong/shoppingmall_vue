<template>
  <div style="width: 100%">
    <v-card>
      <v-card-title><h4>통계</h4> </v-card-title>
      <v-divider></v-divider>
      <div class="mx-auto" style="width: 80%">
        <v-card-title><h4>월별 매출</h4> </v-card-title>
        <v-row>
          <v-col cols="5">
            <v-text-field
              v-model="input"
              outlined
              label="년도를 입력해주세요. ex)2022"
            ></v-text-field>
          </v-col>
          <v-col><v-btn @click="totalSales">검색</v-btn></v-col>
        </v-row>
        <canvas ref="barChart" :height="'400px'" :width="'700px'" />
        <br />
      </div>
    </v-card>
    <br />
    <v-card>
      <br />
      <div class="mx-auto" style="width: 80%">
        <v-card-title><h4>인기상품</h4> </v-card-title>
        <v-row>
          <v-col cols="5">
            <v-select
              v-model="type"
              :items="itmes"
              label="TYPE"
              required
              outlined
            ></v-select>
          </v-col>
          <v-col><v-btn @click="getList">검색</v-btn></v-col>
        </v-row>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-data-table :headers="headers" :items="ProductList" :search="search">
        </v-data-table>
        <br />
      </div>
    </v-card>
  </div>
</template>
<script>
import { Chart, registerables } from "chart.js";
import { mapState } from "vuex";
Chart.register(...registerables);
let chart;
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "상품코드", value: "code" },
        { text: "상품명", value: "name" },
        { text: "카테고리", value: "category" },
        { text: "주문횟수", value: "count" },
        { text: "후기", value: "rating" },
      ],
      input: null,
      itmes: ["주문순"],
      type: "주문순",
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
  async mounted() {
    this.$nextTick(function () {
      this.createChart();
    });
  },
  computed: {
    ...mapState(["TotalSales", "ProductList"]),
  },
  methods: {
    createChart() {
      if (chart !== undefined) {
        chart.destroy();
      }
      chart = new Chart(this.$refs.barChart, {
        type: "line",
        data: {
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
          datasets: [
            {
              label: "월총 매출",
              data: this.TotalSales,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: this.options,
      });
    },
    totalSales() {
      this.$store.dispatch("Total_Sales", this.input);
    },
    getList() {
      this.$store.dispatch("Get_Ranking_List", this.type);
    },
  },
  created() {
    this.$store.dispatch("Total_Sales", "2022");
    this.$store.dispatch("Get_Ranking_List", this.type);
  },
};
</script>