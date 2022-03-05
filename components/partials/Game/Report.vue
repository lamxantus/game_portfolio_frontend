<template>
  <div v-if="value" class="mb-6">
    <div class="mb-4">
      <div class="flex items-center space-x-2 mb-3">
        <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
          <img src="/icon/game.png" alt="">
        </div>
        <h2 class="font-bold text-lg">{{ value.name }}</h2>
      </div>
    </div>
    <div class="md:flex rounded-xl bg-white hover:shadow-xl duration-300 overflow-hidden">
      <div class="md:w-1/4">
        <div class="quick-report">
          <div class="bg" :style="{backgroundImage: `url(/bg/${value.id_string}.png)`}"></div>
          <div class="absolute top-0 left-0 right-0 bottom-0 p-4 flex flex-col">
            <div class="flex-1 flex justify-center items-center">
              <img :src="`/logo/${value.id_string}.png`" alt="">
            </div>
            <div class="text-sm">
              <div class="shadow bg-white p-3 rounded-lg">
                <div class="p-3">
                  <span class="text-[#0F43F9]">Earning</span>
                  <h4 class="font-extrabold text-xl mt-2">{{ analytic.earning.toLocaleString() }}</h4>
                  <div class="font-bold">{{value.options['token_in_game']}}</div>
                  <span class="text-gray-500">{{ (priceRate * analytic.earning).toLocaleString() }}$</span>
                </div>
                <hr>
                <div class="p-3 space-y-2">
                  <div class="flex justify-between items-center text-gray-500">
                    <span>Manager</span>
                    <div class="flex space-x-2">
                      <b class="text-black">{{analytic.manager.toLocaleString()}} SLP</b>
                      <span>${{(priceRate * analytic.manager).toLocaleString()}}</span>
                    </div>
                  </div>
                  <div class="flex justify-between items-center text-gray-500">
                    <span>Scholar</span>
                    <div class="flex space-x-2">
                      <b class="text-black">{{analytic.scholar.toLocaleString()}} SLP</b>
                      <span>${{(priceRate * analytic.scholar).toLocaleString()}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white flex-1 p-4">
        <table class="w-full table-auto text-sm">
          <thead>
          <tr class="text-black font-bold uppercase text-xs leading-normal rounded">
            <th class="py-3 px-4 text-left">Name</th>
            <th class="py-3 px-4 text-left">Scholar</th>
            <th class="py-3 px-4 text-left">Manager</th>
            <th class="py-3 px-4 text-left">Share</th>
            <th class="py-3 px-4 text-left hidden md:table-cell">Elo</th>
            <th class="py-3 px-4 text-left hidden md:table-cell">Win Rate</th>
            <th class="py-3 px-4 text-right">NFTs</th>
          </tr>
          </thead>
          <tbody>
          <template>
            <tr v-for="(item, i) in value.wallets" :key="i" class="has-remove">
              <td class="py-3 px-4 text-left">
                <nuxt-link class="text-[#0F43F9]" :to="`/dashboard/${item.address}?game=${value.id}`">
                  {{ shortAddress(item.name) }}
                </nuxt-link>
              </td>
              <td class="py-3 px-4 text-left">{{ (item.totalEarning * (item.earning_rate || 1)).toLocaleString() }}</td>
              <td class="py-3 px-4 text-left">{{ (item.totalEarning * (1 - (item.earning_rate || 1))).toLocaleString() }}</td>
              <td class="py-3 px-4 text-left">{{(item.earning_rate || 1) * 100}}%</td>
              <td class="py-3 px-4 text-left hidden md:table-cell">{{ item.elo.toLocaleString() }}</td>
              <td class="py-3 px-4 text-left hidden md:table-cell">{{ (item.win_rate.results * 100).toLocaleString() }}%</td>
              <td class="py-3 px-4 text-right">
                <span>{{item.totalNFT}}</span>
                <div class="remove" @click="removeWatcher(item.watcher.id)">
                  <icon class="sm" fill="#FFF" name="remove"></icon>
                </div>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
        <div class="mt-4 text-center">
          <div
            class="inline-flex border-[#0F43F9] px-4 py-1.5 rounded space-x-2 border cursor-pointer"
            @click="openForm">
            <icon name="plus"></icon>
            <span>Add more</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "GameReport",
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  computed: {
    analytic() {
      let earning = 0;
      let unclaimed = 0;
      let totalNFT = 0;
      let rv = 0;
      let iv = 0;
      let manager = 0;
      if (this.value.wallets) {
        this.value.wallets.forEach(item => {
          manager = manager + item.totalEarning * (1 - (item.earning_rate || 1))
          earning = +item.totalEarning + +earning;
          unclaimed = +item.todayEarning + +unclaimed;
          totalNFT = totalNFT + item.totalNFT;
          if (item.premium) {
            rv = rv + item.premium.lifetime_profit;
            iv = iv + item.premium.lifetime_invest;
          }
        })
      }
      return {
        earning,
        unclaimed,
        totalNFT,
        roi: iv ? rv / iv : 0,
        manager,
        scholar: earning - manager
      }
    },
    priceRate() {
      const obj = this.$store.getters["config/getPriceRate"](this.value.options["token_in_game"])
      if (obj) {
        return obj.price
      }
      return 0
    }
  },
  methods: {
    ...mapActions('config', ['removeWatcher']),
    openForm() {
      this.$store.commit('config/SET_MODAL', {
        type: "add_wallet",
        data: {
          game: this.value
        }
      })
    }
  }
}
</script>

<style scoped>
.quick-report {
  @apply relative overflow-hidden;
  padding-top: 150%;
}

.quick-report .bg {
  @apply absolute top-0 left-0 bottom-0 right-0;
  background-position: center;
  background-size: cover;
  filter: blur(3px);
}
</style>
