<template>
  <div class="rounded-2xl bg-white duration-300 hover:shadow-xl p-4">
    <div class="mb-4 flex justify-between">
      <div class="flex items-center space-x-2 mb-3">
        <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
          <img src="/icon/earning-large.png" alt="">
        </div>
        <h2 class="font-bold text-lg">Daily earning</h2>
        <div v-if="false">
          <img src="/icon/warning.png" alt="">
        </div>
      </div>
      <div class="flex space-x-4 text-gray-300 font-bold">
        <div
          v-for="item in date_units" :key="item.value"
          class="cursor-pointer"
          :class="{'text-black': filter.date_unit === item.value}"
          @click="filter.date_unit = item.value"
        >{{ item.title }}
        </div>
      </div>
    </div>
    <div class="mb-4 flex space-x-4 items-end justify-between" style="height: 208px">
      <canvas class="w-full" style="height: 208px" id="myChartEarning"></canvas>
    </div>
    <div class="mb-2 flex justify-between gap-4 md:gap-8">
      <div class="flex space-x-2">
        <h4 class="font-bold">Today:</h4>
        <div>
          <div>{{ data.todayEarning.toLocaleString() }} (<span class="text-green-400">{{ data.todayEarning - data.yesterdayEarning }}</span>)</div>
          <span> {{ (getCurrentPriceRate * data.todayEarning).toLocaleString() }}$</span>
        </div>
      </div>
      <div class="flex space-x-2">
        <h4 class="font-bold">Average:</h4>
        <div>
          <div>{{ data.avg.toLocaleString() }}</div>
          <span>{{ (data.avg * getCurrentPriceRate).toLocaleString() }}$</span>
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
      date_units: [{
        title: "Today",
        value: "d"
      }, {
        title: "Week",
        value: "w"
      }, {
        title: "Month",
        value: "m"
      }],
      filter: {
        date_unit: 'd'
      }
    }
  },
  methods: {
    async loadData() {
      if (this.data.wallet) {
        return await this.$axios.$get('/report', {
          params: {
            ...this.filter,
            wallet: this.data.wallet,
            game: this.data.game_id
          }
        }).catch(() => ({}))
      }
      return {}
    },
    async draw() {
      let now = new Date();
      now = new Date(now.setDate(now.getDate() + 1));
      const ctx = document.getElementById('myChartEarning').getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }
      const res = await this.loadData();
      // START CALCULATE

      // END CALCULATE
      this.chart = new Chart(ctx, {
        type: 'bar',
        interaction: {
          intersect: false,
        },
        data: {
          labels: Object.keys(res).map((x, i) => {
            const arr = x.split("-");
            arr.shift();
            if (i % 2) {
              return ''
            } else {
              return arr.join("-")
            }
          }),
          datasets: [{
            barPercentage: 0.6,
            label: 'SLPs',
            data: Object.values(res).map(x => {
              return x.token
            }),
            backgroundColor: ['#DDDDDD'],
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            order: 2
          }, {
            barPercentage: 0.6,
            label: 'ELOs',
            data: Object.values(res).map(x => {
              return x.exp
            }),
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
              beginAtZero: false,
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
    },
    filter: {
      deep: true,
      handler: function () {
        this.draw();
      }
    }
  },
}
</script>

<style scoped>

</style>
