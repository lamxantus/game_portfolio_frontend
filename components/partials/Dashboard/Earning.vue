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
    <div class="mb-4 flex space-x-4 items-end justify-between h-52">
      <div
        v-for="i in 14" :key="i"
        class="bg-gray-300 chart-elm w-6" :style="{height: `${RD(20, 100)}%`}">
        <span>{{ RD(20, 100) }}</span>
      </div>
    </div>
    <div class="mb-2 grid grid-cols-2 gap-4">
      <div class="flex justify-between">
        <h4 class="font-bold">Today</h4>
        <div>
          <div>{{ data.daily_earnings }} (<span class="text-green-400">+23</span>)</div>
          <span>{{getCurrentPriceRate * data.daily_earnings}}$</span>
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

const schemas = require("/plugins/schemas");

export default {
  name: "Earning",
  methods: {
    RD(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  },
  computed: {
    data() {
      return this.$store.state.config.wallet || schemas.WALLET
    },
    ...mapGetters("config", ["getCurrentPriceRate"]),
  }
}
</script>

<style scoped>

</style>
