<template>
  <div class="my-4">
    <div class="mb-6 md:flex md:space-x-4 space-y-4 md:space-y-0">
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
              <div class="text-2xl font-bold ">${{
                  total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                }}
              </div>
              <span v-if="false" class="text-[#10CE00]">(+23 Today)</span>
            </div>
            <div>
              <div class="flex justify-between">
                <span>Claimed</span>
                <span>{{
                    claimed.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
                  }}$</span>
              </div>
              <div class="flex justify-between my-2">
                <span>Unclaimed</span>
                <span>{{
                    unClaimed.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
                  }}$</span>
              </div>
              <div class="flex justify-between">
                <span>Next Claim</span>
                <span>_</span>
              </div>
            </div>
          </div>
          <general-report/>
        </div>
      </div>
      <div class="md:w-1/4">
        <div class="flex items-center space-x-2 mb-3">
          <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
            <img src="/icon/bookmark.png" alt="">
          </div>
          <h2 class="font-bold text-lg">Portfolio</h2>
        </div>
        <div class="rounded-xl bg-white hover:shadow-xl duration-300 p-4">
          <div class="flex">
            <div class="flex-1">
              <div class="text-4xl font-bold">{{ totalNFT }}</div>
              <div>NFT</div>
            </div>
            <div class="w-2/3">
              <div class="flex justify-between items-center">
                <span>Total Value</span>
                <span class="font-bold">${{ nftTotalValue }}</span>
              </div>
              <div class="flex justify-between items-center my-2">
                <span>Highest Price</span>
                <span class="font-bold">${{ nftHighestValue }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Lowest Price</span>
                <span class="font-bold">${{ nftLowestValue }}</span>
              </div>
            </div>
          </div>
          <hr class="border-gray-100 my-4">
          <div class="flex">
            <div class="flex-1">
              <div class="text-4xl font-bold">{{ totalScholar }}</div>
              <div>Scholar</div>
            </div>
            <div class="w-2/3">
              <div class="flex justify-between items-center">
                <span>Best Earning</span>
                <span class="font-bold">N/A</span>
              </div>
              <div class="flex justify-between items-center my-2">
                <span>Best ROI</span>
                <span class="font-bold">N/A</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Most Invest</span>
                <span class="font-bold">N/A</span>
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
import GeneralReport from "./GeneralReport";
import GameReport from "../Game/Report";

const schemas = require("/plugins/schemas");
export default {
  name: "DashboardMultiple",
  components: {GeneralReport, GameReport},
  data() {
    return {
      total: 0,
      claimed: 0,
      unClaimed: 0,
      totalNFT: 0,
      totalScholar: 0,
      nftTotalValue: 0,
      nftHighestValue: 0,
      nftLowestValue: 0
    }
  },
  computed: {
    games() {
      return this.$store.state.config.games
    },
  },
  watch: {
    games: {
      deep: true,
      handler: function () {
        this.compute()
      }
    },
    rates: {
      deep: true,
      handler: function () {
        this.compute()
      }
    },
  },
  methods: {
    RD(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    compute() {
      this.total = 0;
      this.claimed = 0;
      this.unClaimed = 0;
      this.totalNFT = 0;
      this.totalScholar = 0;
      this.nftTotalValue = 0;
      this.nftHighestValue = 0;
      this.nftLowestValue = 0;
      for (let i = 0; i < this.games.length; i++) {
        let game = this.games[i];
        const rate = this.$store.getters["config/getPriceRate"](game.options["token_in_game"]);
        const rateValue = rate ? rate.price : 0;
        const wallets = this.$store.state.config.dashboard.filter(item => item.game === game.id_string);
        wallets.forEach(wallet => {
          if (j === 0) {
            this.nftLowestValue = wallet.nftLowestValue || 0
          }
          this.total = this.total + +wallet.token_total * rateValue;
          this.claimed = this.claimed + +wallet.token_claimed * rateValue;
          this.unClaimed = this.unClaimed + +wallet.token_claimable * rateValue;
          this.totalNFT = this.totalNFT + +wallet.meta["total_nft"];
          if (wallet.meta["total_nft_value"]) {
            this.nftTotalValue = this.nftTotalValue + wallet.meta["total_nft_value"]
          }
          if (wallet.meta["high_nft_value"] && wallet.meta["high_nft_value"] > this.nftHighestValue) {
            this.nftHighestValue = wallet.meta["high_nft_value"]
          }
          if (wallet.meta["low_nft_value"] && wallet.meta["low_nft_value"] < this.nftLowestValue) {
            this.nftLowestValue = wallet.meta["low_nft_value"]
          }
        })
        if (wallets.length) {
          this.totalScholar = this.totalScholar + 1;
        }
      }
    },
  },
  mounted() {
    this.compute();
  }
}
</script>
