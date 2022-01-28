<template>
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
</template>

<script>
export default {
  name: "SelectGame",
  data() {
    return {
      game: 1,
    }
  }
}
</script>

<style scoped>

</style>
