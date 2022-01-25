<template>
  <div class="my-4">
    <div v-if="!user" class="w-full mb-6 md:inline-flex items-center space-y-2 md:space-y-0">
      <span class="text-lg font-bold mr-4">Tracker for </span>
      <label class="mr-4">
        <input v-model="search" class="p-1.5 px-2 border border-gray-200 rounded" type="text" placeholder="Wallet Address">
      </label>
      <button
        class="p-1.5 px-2 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] text-white rounded"
        @click="trackWallet()"
      >Search</button>
      <div
        class="text-sm inline-flex items-center space-x-2 cursor-pointer ml-auto"
        @click="random"
      >
        <span>View random wallet</span>
        <icon name="chv-right"></icon>
      </div>
    </div>
    <div class="flex md:flex-row flex-col md:space-x-4">
      <div class="mb-6 flex-1 p-4 bg-[#F6F8FF] rounded-xl">
        <div class="md:mb-12 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <div class="flex items-center space-x-2 mb-3">
                <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
                  <img src="/icon/earning.png" alt="">
                </div>
                <h2 class="font-bold text-lg">Total Earning</h2>
              </div>
              <div class="flex-1 grid grid-cols-4 gap-3">
                <div class="hover:shadow bg-white p-3 rounded-lg">
                  <h4>Unclaimed</h4>
                  <div class="font-bold text-4xl">413</div>
                  <div>SLP</div>
                  <span class="text-gray-500">22$</span>
                </div>
                <div class="hover:shadow bg-white p-3 rounded-lg">
                  <h4>Claimed</h4>
                  <div class="font-bold text-4xl">22</div>
                  <div>SLP</div>
                  <span class="text-gray-500">22$</span>
                </div>
                <div class="hover:shadow bg-white p-3 rounded-lg">
                  <h4>Total Earning</h4>
                  <div class="font-bold text-4xl">31</div>
                  <div>SLP</div>
                  <span class="text-gray-500">22$</span>
                </div>
                <div class="hover:shadow bg-white p-3 rounded-lg">
                  <h4>Next Claim</h4>
                  <div class="font-bold text-4xl">112</div>
                  <div>SLP</div>
                  <span class="text-gray-500">22$</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center space-x-2 mb-3">
                <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
                  <img src="/icon/wallet.png" alt="">
                </div>
                <h2 class="font-bold text-lg">Lifetime</h2>
              </div>
              <div class="flex-1 grid grid-cols-4 gap-3">
                <div class="hover:shadow bg-white p-3 rounded-lg">
                  <h4>Investment</h4>
                  <div class="font-bold text-4xl">311</div>
                  <div>USDT</div>
                </div>
                <div class="hover:shadow bg-white p-3 rounded-lg">
                  <h4>Revenue</h4>
                  <div class="font-bold text-4xl">315</div>
                  <div>USDT</div>
                </div>
                <div class="hover:shadow bg-white p-3 rounded-lg">
                  <h4>Profit</h4>
                  <div class="font-bold text-4xl">672</div>
                  <div>USDT</div>
                </div>
                <div class="hover:shadow bg-white p-3 rounded-lg">
                  <h4>ROI</h4>
                  <div class="font-bold text-4xl">1666</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md:mb-12 mb-6">
          <div class="flex space-x-4">
            <div class="w-2/3">
              <earning/>
            </div>
            <div class="flex-1">
              <statistic/>
            </div>
          </div>
        </div>
        <div class="md:mb-12 mb-6">
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
            <div v-for="(item, i) in data.featured_nft" :key="i" class="bg-white rounded-lg duration-300 hover:shadow-xl p-3">
              <img :src="item.media_url" alt="">
              <h3 class="text-lg font-bold">Axie #</h3>
              <div class="flex justify-between" v-if="item.price">
                <span>Last Price</span>
                <span>{{ item.price.toFixed(3)}}</span>
              </div>
              <hr class="my-2 border-gray-100">
              <div class="text-xs flex space-x-2 items-center">
                View on marketplace <icon name="chv-right" class="sm"></icon>
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
      <div v-if="user" class="md:w-64">
        <div class="wallet-select">
          <div>
            <span class="bg-[#0F43F9] py-1 p-4 text-white rounded-full">Wallet 1</span>
          </div>
        </div>
        <div class="wallet-select active">
          <div>
            <span class="bg-[#0F43F9] py-1 p-4 text-white rounded-full">Wallet 2</span>
          </div>
          <div class="mt-2">Name: Mai Anh</div>
        </div>
        <div class="wallet-select">
          <div>
            <span class="bg-[#0F43F9] py-1 p-4 text-white rounded-full">Wallet 3</span>
          </div>
        </div>
        <div class="wallet-select">
          <div>
            <span class="bg-[#0F43F9] py-1 p-4 text-white rounded-full">Wallet 4</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!game && $route.path === '/dashboard/random' && !user" class="fixed top-0 left-0 right-0 bottom-0">
      <div class="fixed top-0 left-0 right-0 bottom-0 backdrop-blur bg-white/30"></div>
      <div class="container my-12 relative top-10">
        <div class="mb-10 text-center md:w-3/5 mx-auto bg-white p-4 md:p-8 shadow">
          <h1 class="text-4xl font-bold mb-6">Select Game you want to track</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div class="cursor-pointer" @click="game = true">
              <div class="mb-2">
                <img src="https://market.stephero.io/summon/gunfire_hero_collection.png" alt="">
              </div>
              <h4 class="font-bold text-lg">Gunfire</h4>
            </div>
            <div class="cursor-pointer" @click="game = true">
              <div class="mb-2">
                <img src="https://market.stephero.io/summon/gunfire_hero_collection.png" alt="">
              </div>
              <h4 class="font-bold text-lg">Stephero</h4>
            </div>
          </div>
          <p>View full dashboard and track more game</p>
          <div>
            <div
              class="m-3 p-1.5 px-2 inline-flex space-x-2 items-center cursor-pointer bg-[#0F43F9] rounded text-white">
              <icon class="md" name="user" fill="#d6d3d1"/>
              <span>Connect Wallet</span>
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
import {mapActions} from "vuex";
import Statistic from "./Statistic";
import BattleLog from "./BattleLog";

const schemas = require("/plugins/schemas");
export default {
  name: "DashboardSingle",
  components: {BattleLog, Statistic, Ranking, Earning},
  data() {
    return {
      game: 1,
      search: null
    }
  },
  computed: {
    data() {
      return this.$store.state.config.wallet || schemas.WALLET
    }
  },
  methods: {
    ...mapActions('config', [
      'fetchData'
    ]),
    random() {
      if (this.$route.params.wallet !== "random") {
        this.$route.params.wallet = "random"
      }
      this.fetchData("random");
    },
    trackWallet() {
      if (this.search) {
        const x = this.search.replace("ronin:", "0x")
        this.$router.push(`/dashboard/${x}`);
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
