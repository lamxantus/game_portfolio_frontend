<template>
  <div v-if="data && data.battle_logs">
    <div class="mb-3 flex justify-between">
      <div class="flex items-center space-x-2">
        <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
          <img src="/icon/battle-log.png" alt="">
        </div>
        <h2 class="font-bold text-lg">Battle Log</h2>
        <div>
          <img src="/icon/warning.png" alt="">
        </div>
      </div>
    </div>
    <div class="bg-white rounded-xl p-4 duration-300 hover:shadow-xl">
      <table class="table-fixed w-full">
        <thead>
        <tr class="font-bold rounded">
          <td class="p-3 w-1/4 text-left">Date</td>
          <td class="p-3">Mode</td>
          <td class="p-3">My Team</td>
          <td class="p-3">Result</td>
          <td class="p-3">Opponent</td>
          <td class="p-3 text-right">Track</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in battle_logs" :key="item.battle_id">
          <td class="p-3">
            <p>
              <b>{{new Date(item.time_start).toLocaleDateString()}}</b>
              <span>{{new Date(item.time_start).toLocaleTimeString()}}</span>
            </p>
          </td>
          <td class="p-3 uppercase">{{ item.mode }}</td>
          <td class="p-3">
            <div class="flex space-x-2">
              <div v-for="nft in item.teams" :key="nft.id">
                <img
                  class="w-28"
                  :src="nft.media_url"
                  alt="">
              </div>
            </div>
          </td>
          <td class="p-3">
            <div class="flex justify-between">
              <div>Win</div>
              <div>+{{item.earn_token}} SLP</div>
            </div>
            <div class="flex justify-between">
              <div>ELO</div>
              <div>{{ item.earn_elo }}</div>
            </div>
          </td>
          <td class="p-3">
            <div class="flex space-x-2">
              <div v-for="nft in item.opponents" :key="nft.id">
                <img
                  class="w-28"
                  :src="nft.media_url"
                  alt="">
              </div>
            </div>
          </td>
          <td class="p-3"></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const schemas = require("/plugins/schemas");

export default {
  name: "BattleLog",
  computed: {
    data() {
      return this.$store.state.config.wallet || schemas.WALLET
    },
    battle_logs() {
      return this.data.battle_logs.slice(0, 6)
    }
  }
}
</script>

<style scoped>

</style>
