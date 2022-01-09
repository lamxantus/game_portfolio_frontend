<template>
  <div class="rounded border bg-blue-50 p-4">
    <div class="mb-4 flex justify-between">
      <h4 class="font-bold">Earning</h4>
      <div class="flex space-x-4">
        <div>Today</div>
        <div>Week</div>
        <div>Month</div>
      </div>
    </div>
    <div class="mb-4 flex space-x-2 items-end h-48">
      <div class="flex-1 bg-gray-300 rounded-full" v-for="i in 14" :key="i" :style="{height: `${RD(0, 100)}%`}"></div>
    </div>
    <div class="mb-2 flex justify-between">
      <h4 class="font-bold">Today</h4>
      <span class="font-bold">0$</span>
    </div>
    <div class="mb-2 flex justify-between">
      <h4 class="font-bold">Week</h4>
      <span class="font-bold">0$</span>
    </div>
    <div class="mb-2 flex justify-between">
      <h4 class="font-bold">Month</h4>
      <span class="font-bold">0$</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Earning",
  methods: {
    RD(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}
</script>

<style scoped>

</style>
