<template>
  <div class="my-4">
    <div class="mb-6 flex space-x-4">
      <div class="flex-1">
        <div class="flex items-center space-x-2 mb-3">
          <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
            <img src="/icon/earning-large.png" alt="">
          </div>
          <h2 class="font-bold text-lg">Total</h2>
        </div>
        <div class="bg-[#0F43F9] rounded-xl grid grid-cols-2 text-white">
          <div class="p-4 flex flex-col">
            <div class="flex-1">
              <div class="text-2xl font-bold ">${{ total.toLocaleString() }}</div>
              <span class="text-[#10CE00]">(+23 Today)</span>
            </div>
            <div>
              <div class="flex justify-between">
                <span>Claimed</span>
                <span>{{ claimed.toLocaleString() }}$</span>
              </div>
              <div class="flex justify-between my-2">
                <span>Unclaimed</span>
                <span>{{ unClaimed.toLocaleString() }}$</span>
              </div>
              <div class="flex justify-between">
                <span>Next Claim</span>
                <span>_</span>
              </div>
            </div>
          </div>
          <div class="p-4">
            <div class="flex justify-end text-gray-100 mb-2 space-x-4">
              <div>Today</div>
              <div>Week</div>
              <div>Month</div>
            </div>
            <div class="flex space-x-4 items-end h-40">
              <div
                class="flex-1 bg-white chart-elm bg-opacity-20 hover:bg-opacity-100 hover:text-black duration-200"
                v-for="i in 7" :key="i" :style="{height: `${RD(20, 100)}%`}">
                <span>{{ RD(20, 100) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="flex items-center space-x-2 mb-3">
          <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
            <img src="/icon/bookmark.png" alt="">
          </div>
          <h2 class="font-bold text-lg">Portfolio</h2>
        </div>
        <div class="rounded-xl bg-white hover:shadow-xl duration-300 p-4">
          <div class="flex">
            <div class="flex-1">
              <div class="text-2xl font-bold">25</div>
              <div>NFT</div>
            </div>
            <div class="w-3/5">
              <div class="flex justify-between items-center">
                <span>Total Value</span>
                <span class="font-bold">9$</span>
              </div>
              <div class="flex justify-between items-center my-2">
                <span>Highest Price</span>
                <span class="font-bold">309$</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Lowest Price</span>
                <span class="font-bold">0$</span>
              </div>
            </div>
          </div>
          <hr class="border-gray-100 my-4">
          <div class="flex">
            <div class="flex-1">
              <div class="text-2xl font-bold">25</div>
              <div>NFT</div>
            </div>
            <div class="w-3/5">
              <div class="flex justify-between items-center">
                <span>Best Earning</span>
                <span class="font-bold">0$</span>
              </div>
              <div class="flex justify-between items-center my-2">
                <span>Best ROI</span>
                <span class="font-bold">0$</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Best Earning</span>
                <span class="font-bold">0$</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <game-report v-for="(item, i) in games" :key="i" :value="item"/>
  </div>
</template>

<script>
const schemas = require("/plugins/schemas");
import GameReport from "../Game/Report";

export default {
  name: "DashboardMultiple",
  components: {GameReport},
  data() {
    return {
      total: 0,
      claimed: 0,
      unClaimed: 0
    }
  },
  computed: {
    games() {
      return this.$store.state.config.dashboard || schemas.DASHBOARD
    }
  },
  watch: {
    games: {
      deep: true,
      handler: function () {
        this.compute()
      }
    }
  },
  methods: {
    RD(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    compute() {
      this.total = 0;
      this.claimed = 0;
      this.unClaimed = 0;
      this.games.forEach(game => {
        const rate = this.$store.getters["config/getPriceRate"](game.options["token_in_game"]);
        const rateValue = rate ? rate.price : 0
        game.wallets.forEach(wallet => {
          this.total = this.total + wallet.totalEarning * rateValue;
          this.claimed = this.claimed + wallet.claimed * rateValue;
          this.unClaimed = this.unClaimed + wallet.unclaimed * rateValue;
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
