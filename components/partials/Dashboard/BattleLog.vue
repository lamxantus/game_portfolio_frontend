<template>
  <div>
    <div class="mb-4 flex justify-between">
      <div class="flex items-center space-x-2 mb-3">
        <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
          <img src="/icon/battle-log.png" alt="">
        </div>
        <h2 class="font-bold text-lg">Battle Log</h2>
        <div>
          <img src="/icon/warning.png" alt="">
        </div>
      </div>
    </div>
    <table class="table-fixed w-full">
      <thead>
      <tr class="font-bold">
        <td class="p-3 text-left">Date</td>
        <td class="p-3">Mode</td>
        <td class="p-3">My Team</td>
        <td class="p-3">Result</td>
        <td class="p-3">Opponent</td>
        <td class="p-3 text-right">Track</td>
      </tr>
      </thead>
      <tbody>
      <tr class="bg-white rounded-xl">
        <td class="p-3">
          <p>
            <b>Jan 20, 2020</b>
            <span>7:44:30 PM</span>
          </p>
        </td>
        <td class="p-3">PVE</td>
        <td class="p-3">
          <div class="flex space-x-2">
            <div v-for="i in 3" :key="i">
              <img
                class="w-28"
                src="https://storage.googleapis.com/assets.axieinfinity.com/axies/8993192/axie/axie-full-transparent.png"
                alt="">
            </div>
          </div>
        </td>
        <td class="p-3">
          <div class="flex justify-between">
            <div>Win</div>
            <div>+2 SLP</div>
          </div>
          <div class="flex justify-between">
            <div>ELO</div>
            <div>1929</div>
          </div>
        </td>
        <td class="p-3">
          <div class="flex space-x-2">
            <div v-for="i in 3" :key="i">
              <img
                class="w-28"
                src="https://storage.googleapis.com/assets.axieinfinity.com/axies/8993192/axie/axie-full-transparent.png"
                alt="">
            </div>
          </div>
        </td>
        <td class="p-3"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "BattleLog"
}
</script>

<style scoped>

</style>
