<template>
  <div class="rounded bg-white rounded-xl duration-300 hover:shadow-xl p-4 h-full">
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
        <span class="font-bold">1929</span>
      </div>
      <div class="flex justify-between">
        <h4 class="font-bold">Rank</h4>
        <span class="font-bold">342</span>
      </div>
      <hr class="my-4 border-gray-100"/>
      <div>
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
        <div class="flex space-x-2">
          <span class="font-bold">All</span>
          <span class="font-bold">PVE</span>
          <span class="font-bold">PVP</span>
        </div>
      </div>
      <div class="flex items-center space-x-16">
        <div class="flex-1">
          <div class="flex justify-between">
            <span>Win</span>
            <span>293</span>
          </div>
          <div class="flex justify-between">
            <span>Lose</span>
            <span>293</span>
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

export default {
  name: "Statistic",
  mounted() {
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    new Chart(
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
}
</script>

<style scoped>

</style>
