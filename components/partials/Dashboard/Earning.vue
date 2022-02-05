<template>
  <div class="rounded bg-white rounded-xl duration-300 hover:shadow-xl p-4">
    <div class="mb-4 flex justify-between">
      <div class="flex items-center space-x-2 mb-3">
        <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
          <img src="/icon/earning-large.png" alt="">
        </div>
        <h2 class="font-bold text-lg">Earning</h2>
        <div>
          <img src="/icon/warning.png" alt="">
        </div>
      </div>
      <div class="flex space-x-4">
        <div>Today</div>
        <div>Week</div>
        <div>Month</div>
      </div>
    </div>
    <div class="mb-4 flex space-x-4 items-end justify-between" style="height: 208px">
      <canvas class="w-full" style="height: 208px" id="myChartEarning"></canvas>
    </div>
    <div class="mb-2 grid grid-cols-2 gap-4">
      <div class="flex justify-between">
        <h4 class="font-bold">Today</h4>
        <div>
          <div>{{ data.daily_earnings }} (<span class="text-green-400">+23</span>)</div>
          <span>{{ getCurrentPriceRate * data.daily_earnings }}$</span>
        </div>
      </div>
      <div class="flex justify-between">
        <h4 class="font-bold">Average</h4>
        <div>
          <div>{{ data.average_earnings }} (<span class="text-green-400">+23</span>)</div>
          <span>{{ data.average_earnings * getCurrentPriceRate }}$</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);
const schemas = require("/plugins/schemas");

export default {
  name: "Earning",
  data() {
    return {
      chart: null,
    }
  },
  methods: {
    draw() {
      let now = new Date();
      now = new Date(now.setDate(now.getDate() + 1));
      const ctx = document.getElementById('myChartEarning').getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }
      let arrElo = {};
      let arrEarn = {};
      for (let i = 0; i < 14; i++) {
        const d = new Date(now.setDate(now.getDate() - 1));
        arrEarn[d.toISOString().split("T")[0]] = 0;
        arrElo[d.toISOString().split("T")[0]] = 0;
      }
      this.data.report.earning.data.forEach(item => {
        const key = item.date.split("T")[0];
        arrEarn[key] = Number(item.value);
      })
      this.data.report.elo.data.forEach(item => {
        const key = item.date.split("T")[0];
        arrElo[key] = Number(item.value);
      })
      this.chart = new Chart(ctx, {
        type: 'bar',
        interaction: {
          intersect: false,
        },
        data: {
          labels: Object.keys(arrEarn).map((x, i) => {
            const arr = x.split("-");
            arr.shift();
            if (i % 2) {
              return ''
            } else {
              return arr.join("-")
            }
          }).reverse(),
          datasets: [{
            barPercentage: 0.6,
            label: '# of Votes',
            data: Object.values(arrEarn).reverse(),
            backgroundColor: ['#DDDDDD'],
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            order: 2
          }, {
            barPercentage: 0.6,
            data: Object.values(arrElo).reverse(),
            backgroundColor: ['#FFA800'],
            borderColor: '#FFA800',
            type: 'line',
            order: 1,
            lineTension: 0.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
                drawBorder: false,
                drawOnChartArea: false,
                drawTicks: false,
              }
            },
            y: {
              ticks: {
                display: false
              },
              beginAtZero: true,
              grid: {
                display: false,
                drawBorder: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            }
          },
        }
      });
    }
  },
  computed: {
    data() {
      return this.$store.state.config.wallet || schemas.WALLET
    },
    ...mapGetters("config", ["getCurrentPriceRate"]),
  },
  mounted() {
    this.draw();
  },
  watch: {
    data() {
      this.draw();
    }
  }
}
</script>

<style scoped>

</style>
