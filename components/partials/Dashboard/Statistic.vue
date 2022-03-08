<template>
  <div class="bg-white rounded-2xl duration-300 hover:shadow-xl p-4 h-full">
    <div class="mb-4 flex justify-between">
      <div class="flex items-center space-x-2 mb-3">
        <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
          <img src="/icon/statistic.png" alt="">
        </div>
        <h2 class="font-bold text-lg">Today Statistic</h2>
      </div>
    </div>
    <div class="">
      <div class="flex justify-between">
        <h4 class="font-bold">ELO</h4>
        <span class="font-bold">{{ Number(data.elo || "0").toLocaleString() }}</span>
      </div>
      <div class="flex justify-between">
        <h4 class="font-bold">Rank</h4>
        <span class="font-bold">{{ Number(data.rank || "0").toLocaleString() }}</span>
      </div>
      <hr v-if="false" class="my-4 border-gray-100"/>
      <div v-if="false">
        <div class="flex justify-between mb-2">
          <h4 class="font-bold">Energy</h4>
          <span class="font-bold">13/20</span>
        </div>
        <div class="w-full bg-gray-50 h-3 rounded-xl">
          <div class="bg-[#FFA800] h-3 rounded-xl" style="width: 20%"></div>
        </div>
      </div>
      <hr class="my-4 border-gray-100"/>
      <div class="flex justify-between mb-2">
        <h4 class="font-bold">Win rate</h4>
        <div class="flex space-x-2 font-bold text-gray-400">
          <div
            class="cursor-pointer"
            :class="{'text-black': filter.game_mode === null}"
            @click="filter.game_mode = null">All
          </div>
          <div
            class="cursor-pointer"
            :class="{'text-black': filter.game_mode === 'pvp'}"
            @click="filter.game_mode = 'pvp'">PVP
          </div>
          <div
            class="cursor-pointer"
            :class="{'text-black': filter.game_mode === 'pve'}"
            @click="filter.game_mode = 'pve'">PVE
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-16">
        <div v-if="data.win_rate" class="flex-1">
          <div class="flex justify-between">
            <span>Win</span>
            <span>{{ data.win_rate.win.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span>Lose</span>
            <span>{{ (data.win_rate.lose).toLocaleString() }}</span>
          </div>
        </div>
        <div class="w-1/3">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import {mapActions} from "vuex";

const schemas = require("/plugins/schemas");

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

let chart;

export default {
  name: "Statistic",
  data() {
    return {
      filter: {
        game_mode: null,
      }
    }
  },
  computed: {
    data() {
      return this.$store.state.config.wallet || schemas.WALLET
    },
    win() {
      if (this.data.battle_logs) {
        return this.data.battle_logs.filter(x => x.is_winner).length
      }
      return 0
    }
  },
  methods: {
    draw() {
      if (chart) chart.destroy();
      if (this.data.win_rate) {
        const data = {
          labels: [
            'Lose',
            'Win',
          ],
          datasets: [{
            data: [this.data.win_rate.lose, this.data.win_rate.win],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
          }]
        };
        chart = new Chart(
          document.getElementById('myChart'),
          {
            type: 'doughnut',
            data: data,
            options: {
              plugins: {
                legend: {
                  display: false
                },
              }
            }
          }
        );
      }
    },
    ...mapActions('config', ['fetchGameRS']),
  },
  watch: {
    "data.win_rate"() {
      this.draw()
    },
    filter: {
      deep: true,
      handler: function () {
        this.fetchGameRS({
          mode: this.filter.game_mode,
          wallet: this.data.wallet,
          game: this.$route.query.game
        })
      }
    }
  },
  mounted() {
    this.draw()
  }
}
</script>

<style scoped>

</style>
