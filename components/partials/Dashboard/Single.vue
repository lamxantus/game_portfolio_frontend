<template>
  <div class="my-4">
    <div v-if="!user" class="w-full mb-6 md:inline-flex items-center space-y-2 md:space-y-0">
      <span class="text-lg font-bold mr-4">Tracker for </span>
      <label class="mr-4">
        <input v-model="search" class="p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
               placeholder="Wallet Address">
      </label>
      <button
        class="p-1.5 px-4 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] text-white rounded-xl"
        @click="trackWallet()"
      >Search
      </button>
      <div
        class="text-sm inline-flex items-center space-x-2 cursor-pointer ml-auto"
        @click="random"
      >
        <span>View random wallet</span>
        <icon name="chv-right"></icon>
      </div>
    </div>
    <div class="flex md:flex-row flex-col md:space-x-4">
      <div class="mb-6 flex-1 rounded-xl">
        <div class="md:mb-6 mb-4">
          <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div class="md:w-2/3 flex flex-col">
              <div class="flex items-center space-x-2 mb-3">
                <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
                  <img src="/icon/earning.png" alt="">
                </div>
                <h2 class="font-bold text-lg">Total Earning</h2>
              </div>
              <div class="hover:shadow-xl duration-300 bg-white p-3 rounded-2xl flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="">
                  <h4 class="text-[#0F43F9]">Unclaimed</h4>
                  <div v-if="data.unclaimed" class="font-bold text-4xl">{{ Number(data.unclaimed).toLocaleString() }}</div>
                  <div>SLP</div>
                  <span v-if="data.unclaimed" class="text-gray-500">{{ (getCurrentPriceRate * data.unclaimed).toLocaleString() }}$</span>
                </div>
                <div class="">
                  <h4 class="text-[#10CE00]">Claimed</h4>
                  <div class="font-bold text-4xl">{{ (data.claimed_token || 0).toLocaleString() }}</div>
                  <div>SLP</div>
                  <span class="text-gray-500">{{ (getCurrentPriceRate * data.claimed_token).toLocaleString() }}$</span>
                </div>
                <div class="">
                  <h4 class="text-[#FFA800]">Total Earning</h4>
                  <div v-if="data.totalEarning" class="font-bold text-4xl">{{ Number(data.totalEarning).toLocaleString() }}</div>
                  <div>SLP</div>
                  <span v-if="data.totalEarning" class="text-gray-500">{{ (getCurrentPriceRate * data.totalEarning).toLocaleString() }}$</span>
                </div>
                <div class="">
                  <h4 class="text-[#00A3FF]">Next Claim</h4>
                  <div class="font-bold text-3xl">{{ (new Date(data.lastClaimedDate * 1000)).toLocaleDateString() }}
                  </div>
                  <div>{{ (new Date(data.lastClaimedDate * 1000)).toLocaleTimeString() }}</div>
                </div>
              </div>
            </div>
            <div class="flex-1 flex flex-col">
              <div class="flex items-center space-x-2 mb-3">
                <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
                  <img src="/icon/wallet.png" alt="">
                </div>
                <h2 class="font-bold text-lg">Wallet Sumary</h2>
              </div>
              <div v-if="data.premium" class="hover:shadow-xl duration-300 bg-white p-3 rounded-2xl">
                <div class="flex justify-between items-center mb-1">
                  <h4>Investment</h4>
                  <div class="font-bold">{{data.premium.lifetime_invest.toLocaleString()}}$</div>
                </div>
                <div class="flex justify-between items-center">
                  <h4>Expenses</h4>
                  <div class="font-bold">{{data.premium.lifetime_revenue.toLocaleString()}}$</div>
                </div>
                <hr class="my-2 border-gray-100">
                <div class="flex justify-between items-center mb-1">
                  <h4>Return</h4>
                  <div class="font-bold">{{data.premium.lifetime_profit.toLocaleString()}}$</div>
                </div>
                <div class="flex justify-between items-center">
                  <h4>ROI</h4>
                  <div class="font-bold">{{data.premium.roi}}$</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md:mb-6 mb-4">
          <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div class="md:w-2/3">
              <earning/>
            </div>
            <div class="flex-1">
              <statistic/>
            </div>
          </div>
        </div>
        <div class="md:mb-6 mb-4">
          <battle-log/>
        </div>
        <div class="md:mb-12 mb-6">
          <div class="flex justify-between mb-4">
            <h2 class="font-bold">NFTs</h2>
            <div class="flex space-x-6">
              <span>Quantity:</span>
              <span class="font-bold">{{ data.totalNFT }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div v-for="(item, i) in data.featured_nft" :key="i"
                 class="bg-white rounded-lg duration-300 hover:shadow-xl p-3">
              <img :src="item.media_url" alt="">
              <h3 class="text-lg font-bold">{{ item.name }}</h3>
              <div class="flex justify-between" v-if="item.price">
                <span>Last Price</span>
                <span>{{ item.price.toFixed(3) }}</span>
              </div>
              <hr class="my-2 border-gray-100">
              <div class="text-xs flex space-x-2 items-center">
                View on marketplace
                <icon name="chv-right" class="sm"></icon>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!user" class="mb-12 text-center">
          <h2 class="text-2xl">View full dashboard and track more game</h2>
          <div>
            <nuxt-link
              class="m-3 p-1.5 px-2 inline-flex space-x-2 items-center cursor-pointer bg-[#0F43F9] rounded text-white"
              to="/dashboard">
              <icon class="md" name="user" fill="#d6d3d1"/>
              <span>Connect Wallet</span>
            </nuxt-link>
          </div>
          <div class="flex items-center justify-center space-x-4 flex-wrap">
            <div class="flex space-x-2">
              <icon name="check" fill="#0F43F9"/>
              <span>Full Access</span>
            </div>
            <div class="flex space-x-2">
              <icon name="check" fill="#0F43F9"/>
              <span>Report Export</span>
            </div>
            <div class="flex space-x-2">
              <icon name="check" fill="#0F43F9"/>
              <span>Secured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Earning from "./Earning";
import Ranking from "./Ranking";
import {mapActions, mapGetters} from "vuex";
import Statistic from "./Statistic";
import BattleLog from "./BattleLog";

const schemas = require("/plugins/schemas");
export default {
  name: "DashboardSingle",
  components: {BattleLog, Statistic, Ranking, Earning},
  data() {
    return {
      search: null
    }
  },
  computed: {
    data() {
      return this.$store.state.config.wallet || schemas.WALLET
    },
    ...mapGetters("config", ["getCurrentPriceRate"]),
  },
  methods: {
    ...mapActions('config', [
      'fetchData'
    ]),
    random() {
      if (this.$route.params.wallet !== "random") {
        this.$route.params.wallet = "random"
      }
      this.fetchData("random", 1);
    },
    trackWallet() {
      if (this.search) {
        const x = this.search.replace("ronin:", "0x")
        this.$router.push(`/dashboard/${x}?game=1`);
      }
    }
  }
}
</script>

<style scoped>
.wallet-select {
  @apply rounded bg-gray-100 p-4 mb-4 cursor-pointer;
}

.wallet-select.active {
  @apply md:-ml-4 md:pl-8 bg-blue-50 rounded-tl-none rounded-bl-none;
}
</style>
