<template>
  <div class="my-6">
    <p v-if="!data.wallet" class="mb-4 bg-green-300 p-3 border rounded">This wallet data on the road, please be
      patient!</p>
    <div v-if="!user" class="md:flex justify-between mb-4">
      <div class="w-full mb-3 md:mb-0 flex items-center flex-1 space-x-4">
        <label class="w-1/3">
          <input v-model="search" class="w-full p-2 px-3 border border-[#DDE0F7] rounded-xl" type="text"
                 placeholder="Track for wallet Address">
        </label>
        <button
          class="p-2 px-3 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] text-white rounded-xl"
          @click="trackWallet()"
        >Search
        </button>
        <div v-if="data.wallet" class="p-2.5 cursor-pointer border border rounded-xl" @click="refresh()">
          <icon name="refresh"></icon>
        </div>
      </div>
      <div class="text-sm inline-flex items-center space-x-2 cursor-pointer" @click="random">
        <span>View random wallet</span>
        <icon name="chv-right"></icon>
      </div>
    </div>
    <div class="flex md:flex-row flex-col md:space-x-4">
      <div class="mb-4 flex-1 rounded-xl">
        <div class="mb-4">
          <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div class="flex-1 flex flex-col">
              <div class="flex items-center space-x-2 mb-3">
                <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
                  <img src="/icon/earning.png" alt="">
                </div>
                <h2 class="font-bold">Total Earning</h2>
              </div>
              <div
                class="hover:shadow-xl duration-300 bg-white rounded-xl flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="p-4">
                  <h4 class="mb-2 text-[#0F43F9]">Unclaimed</h4>
                  <div class="font-bold text-4xl">{{ oFormatter(data.token_claimable) }}</div>
                  <div>{{ ag.meta.token_in_game }}</div>
                  <span v-if="data.unclaimed"
                        class="text-gray-500">{{ pFormatter(getCurrentPriceRate * data.token_claimable) }}</span>
                </div>
                <div class="border-l p-4 border-[#F7F8FF]">
                  <h4 class="mb-2 text-[#10CE00]">Claimed</h4>
                  <div class="font-bold text-4xl">{{ oFormatter(data.token_claimed) }}</div>
                  <div>{{ ag.meta.token_in_game }}</div>
                  <span class="text-gray-500">{{ pFormatter(getCurrentPriceRate * data.token_claimed) }}</span>
                </div>
                <div class="border-l p-4 border-[#F7F8FF]">
                  <h4 class="mb-2 text-[#FFA800]">Total Earning</h4>
                  <div class="font-bold text-4xl">{{ oFormatter(data.token_total) }}</div>
                  <div>{{ ag.meta.token_in_game }}</div>
                  <span class="text-gray-500">{{ pFormatter(getCurrentPriceRate * data.token_total) }}</span>
                </div>
                <div class="border-l p-4 border-[#F7F8FF]">
                  <h4 class="mb-2 text-[#00A3FF]">Next Claim</h4>
                  <div class="font-bold text-4xl">
                    <span v-if="data.next_claim_date">{{ nextClaimDate }}</span>
                    <span v-else class="text-gray-300">Now</span>
                  </div>
                  <div v-if="data.next_claim_date">{{ (new Date(data.next_claim_date)).toLocaleTimeString() }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md:mb-6 mb-4">
          <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div class="md:w-2/3">
              <client-only>
                <earning/>
              </client-only>
            </div>
            <div class="flex-1">
              <client-only>
                <statistic/>
              </client-only>
            </div>
          </div>
        </div>
        <div class="md:mb-6 mb-4">
          <battle-log/>
        </div>
        <div v-if="data.tokens" class="md:mb-12 mb-6">
          <div class="flex justify-between mb-4">
            <h2 class="font-bold">NFTs</h2>
            <div class="flex space-x-6">
              <span>Quantity:</span>
              <span class="font-bold">{{ data.tokens.length }}</span>
            </div>
          </div>
          <template v-if="data.tokens.length">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div v-for="(item, i) in data.tokens" :key="i"
                   class="bg-white rounded-lg duration-300 hover:shadow-xl p-3">
                <img :src="item.media_url" alt="">
                <h3 class="text-lg font-bold">{{ item.name }}</h3>
                <div class="flex justify-between items-center">
                  <span class="text-xs text-gray-500">Last price</span>
                  <span v-if="item.price">{{ (item.price || 0).toLocaleString() }}eth</span>
                  <span v-else>N/A</span>
                </div>
                <hr class="my-2 border-gray-100">
                <a
                  :href="`https://marketplace.axieinfinity.com/axie/${item.id}/`"
                  target="_blank"
                  class="text-xs flex space-x-2 items-center">
                  View on marketplace
                  <icon name="chv-right" class="sm"></icon>
                </a>
              </div>
            </div>
          </template>
          <div class="p-8 text-center" v-else>
            <div class="w-28 mx-auto mb-3">
              <img src="/bg/empty.svg" alt="Empty">
            </div>
            <p class="text-gray-500">Empty data!</p>
          </div>
        </div>
        <div v-if="!user" class="mb-12 text-center">
          <h2 class="text-2xl">View full dashboard and track more game</h2>
          <div class="my-4">
            <div class="p-1.5 px-4 inline-flex space-x-2 items-center cursor-pointer bg-[#0F43F9] rounded-xl text-white"
                 @click="logIn">
              <icon class="md" name="user" fill="#d6d3d1"/>
              <span>{{ user ? getUserName : 'Login' }}</span>
            </div>
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
import Web3 from "web3";

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
    ...mapGetters("w3_auth", ["getUserName"]),
    ...mapGetters("config", ["getCurrentPriceRate"]),
    nextClaimDate() {
      const now = new Date()
      if (this.data.next_claim_date) {
        const date = new Date(this.data.next_claim_date)
        date.setDate(date.getDate() + this.ag.meta.claimITV);
        if (date.getTime() <= now.getTime()) {
          return "Now"
        } else {
          return date.toLocaleDateString()
        }
      }
      return "Now"
    },
    ag() {
      const cfStore = this.$store.state.config
      return cfStore.games[cfStore.activeGame || 'gunfire'];
    }
  },
  methods: {
    ...mapActions("w3_auth", ["logIn"]),
    ...mapActions('config', [
      'fetchData'
    ]),
    random() {
      if (this.$route.params.wallet !== "random") {
        this.$route.params.wallet = "random"
      }
      this.fetchData({
        wallet: "random", game_id: undefined
      });
    },
    refresh() {
      this.fetchData({
        wallet: this.data.wallet,
        game_id: this.data.game,
        force: true
      });
    },
    trackWallet() {
      if (this.search) {
        const x = this.search.replace("ronin:", "0x");
        this.search = x;
        if (Web3.utils.isAddress(x)) {
          this.$router.push(`/dashboard/${x}`);
        } else {
          this.$store.commit('config/PUSH_NOTIFY', {
            msg: "Please input a valid address",
            type: "error"
          })
        }
      }
    }
  },
  watch: {
    data() {
      if (this.data) {
        this.search = this.data.wallet
      }
    }
  },
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
