<template>
  <div>
    <div class="flex space-x-6">
      <div class="w-1/4">
        <div class="grid grid-cols-1 gap-4">
          <div class="border-b border-stone-800 pb-2 flex space-x-2 items-center">
            <div>
              <icon fill="#d6d3d1" class="lg" name="plus"></icon>
            </div>
            <div class="flex-1">
              <h4 class="label">Unclaimed SLP</h4>
              <div class="value">123</div>
            </div>
          </div>
          <div class="border-b border-stone-800 pb-2 flex space-x-2 items-center">
            <div>
              <icon fill="#d6d3d1" class="lg" name="plus"></icon>
            </div>
            <div class="flex-1">
              <h4 class="label">Average SLP</h4>
              <div class="value">123</div>
            </div>
          </div>
          <div class="border-b border-stone-800 pb-2 flex space-x-2 items-center">
            <div>
              <icon fill="#d6d3d1" class="lg" name="plus"></icon>
            </div>
            <div class="flex-1">
              <h4 class="label">Total</h4>
              <div class="value">123</div>
            </div>
          </div>
          <div class="border-b border-stone-800 pb-2 flex space-x-2 items-center">
            <div>
              <icon fill="#d6d3d1" class="lg" name="plus"></icon>
            </div>
            <div class="flex-1">
              <h4 class="label">Ranking</h4>
              <div class="value">123</div>
            </div>
          </div>
          <div class="border-b border-stone-800 pb-2 flex space-x-2 items-center">
            <div>
              <icon fill="#d6d3d1" class="lg" name="plus"></icon>
            </div>
            <div class="flex-1">
              <h4 class="label">Unclaimed SLPWin Rate (PVP)</h4>
              <div class="value">123</div>
            </div>
          </div>
          <div class="flex space-x-2 items-center">
            <div>
              <icon fill="#d6d3d1" class="lg" name="plus"></icon>
            </div>
            <div class="flex-1">
              <h4 class="label">Elo</h4>
              <div class="value">123</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <canvas class="w-full h-full" id="myChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

export default {
  name: "ReportBoard",
  data() {
    return {
      response: {
        results: []
      }
    }
  },
  mounted() {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      interaction: {
        intersect: false,
      },
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
</script>

<style scoped>
.label {
  @apply text-xs text-stone-500;
}

.value {
  @apply font-bold text-xl text-white;
}
</style>
