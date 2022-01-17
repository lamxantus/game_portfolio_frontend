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
    <div class="mb-4 flex flex-col h-48">
      <div v-for="i in 8" :key="i" class="flex-1 h-8 bg-[#0F43F9]"
           :style="{width: `${(10 - i) * 10}%`, opacity: `${(10 - i) * 10}%`}"></div>
    </div>
    <div class="flex justify-between">
      <h4 class="font-bold">Ranking</h4>
      <span class="font-bold">{{ data.rank }}</span>
    </div>
    <div class="flex justify-between">
      <h4 class="font-bold">Elo</h4>
      <span class="font-bold">{{ data.elo }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ranking",
  methods: {
    RD(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  },
  computed: {
    data() {
      return this.$store.state.config.wallet || schemas.WALLET
    }
  },
}
</script>

<style scoped>

</style>
