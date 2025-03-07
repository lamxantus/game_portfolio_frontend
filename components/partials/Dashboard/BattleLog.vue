<template>
  <div v-if="response">
    <div class="mb-3 flex justify-between">
      <div class="flex items-center space-x-2">
        <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
          <img src="/icon/battle-log.png" alt="">
        </div>
        <h2 class="font-bold">Battle Log</h2>
        <div v-if="false">
          <img src="/icon/warning.png" alt="">
        </div>
      </div>
    </div>
    <div class="bg-white rounded-xl p-4 duration-300 hover:shadow-xl">
      <div class="flex justify-between items-center mb-3">
        <div class="flex space-x-2 font-bold text-gray-400">
          <div
            class="cursor-pointer"
            :class="{'text-black': filter.game_mode === null}"
            @click="filter.game_mode = null">All
          </div>
          <div
            class="cursor-pointer"
            :class="{'text-black': filter.game_mode === 'pvp'}"
            @click="filter.game_mode = 'pvp'">PVP
          </div>
          <div
            class="cursor-pointer"
            :class="{'text-black': filter.game_mode === 'pve'}"
            @click="filter.game_mode = 'pve'">PVE
          </div>
        </div>
        <div class="flex space-x-2 items-center">
          <div class="font-bold text-gray-500 mr-6">Total: {{ response.count }}</div>
          <div
            v-if="filter.page > 1"
            class="cursor-pointer rounded-full w-8 h-8 shadow-lg bg-white p-2" @click="navigate(false)">
            <icon name="chv-left"></icon>
          </div>
          <div
            v-if="filter.page * 8 < response.count"
            class="cursor-pointer rounded-full w-8 h-8 shadow-lg bg-white p-2" @click="navigate(true)">
            <icon name="chv-right"></icon>
          </div>
        </div>
      </div>
      <table v-if="response.results.length" id="battle_log" class="table-auto w-full">
        <thead>
        <tr class="font-bold rounded">
          <td class="p-1 w-1/4 text-left">Date</td>
          <td class="p-1">Mode</td>
          <td v-if="false" class="p-1 w-1/3">My Team</td>
          <td class="p-1 w-1/5 text-right">Result</td>
          <td class="p-1 w-1/3" v-if="false">Opponent</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in response.results" :key="item.id">
          <td class="p-1">
            <p>
              <b>{{ new Date(item.time_start).toLocaleDateString() }}</b>
              <span>{{ new Date(item.time_start).toLocaleTimeString() }}</span>
            </p>
          </td>
          <td class="p-1 uppercase">{{ item.game_mode }}</td>
          <td v-if="false" class="p-1">
            <div class="flex space-x-2">
              <div v-for="token in item.token_items" :key="token.id">
                <img class="w-28" :src="token.media_url" alt="">
              </div>
            </div>
          </td>
          <td class="p-1 text-right">
            <div class="flex justify-between items-center">
              <div class="text-xs text-gray-500">Win</div>
              <span class="text-xs">{{ item.token }} {{ activeGame.meta.token_in_game }}</span>
            </div>
            <div class="flex justify-between items-center">
              <div class="text-xs text-gray-500">ELO</div>
              <div>{{ item.point }}</div>
            </div>
          </td>
          <td class="p-1" v-if="false">
            <div class="flex space-x-2">
              <div v-for="token in item.opponents" :key="token.id">
                <img class="w-28" :src="token.media_url" alt="">
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="p-8 text-center" v-else>
        <div class="w-28 mx-auto mb-3">
          <img src="/bg/empty.svg" alt="Empty">
        </div>
        <p class="text-gray-500">Empty data!</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

const schemas = require("/plugins/schemas");

export default {
  name: "BattleLog",
  data() {
    return {
      filter: {
        game_mode: null,
        page: 1
      }
    }
  },
  computed: {
    data() {
      return this.$store.state.config.wallet || schemas.WALLET
    },
    response() {
      return this.data.gameTX
    },
    activeGame() {
      const cfStore = this.$store.state.config
      return cfStore.games[cfStore.activeGame];
    }
  },
  watch: {
    filter: {
      deep: true,
      handler: function () {
        this.fetchGameTX({
          ...this.filter,
          wallet: this.$route.params.wallet,
          game: this.$route.query.game
        })
      }
    },
    "$route.params.wallet"() {
      this.fetchGameTX({
        ...this.filter,
        wallet: this.$route.params.wallet,
        game: this.$route.query.game
      })
    }
  },
  methods: {
    ...mapActions('config', ['fetchGameTX']),
    navigate(isNext = true) {
      if (isNext) {
        if (this.filter.page * 8 < this.response.count) {
          this.filter.page++
        }
      } else if (this.filter.page > 1) {
        this.filter.page--
      }
    }
  },
  mounted() {
    this.fetchGameTX({
      ...this.filter,
      wallet: this.$route.params.wallet,
      game: this.$route.query.game
    })
  }
}
</script>

<style scoped>

</style>
