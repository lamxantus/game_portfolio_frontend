<template>
  <div class="my-6" :class="{container: !user}">
    <div class="flex space-x-4">
      <div class="flex-1 p-4 bg-blue-50 rounded">
        <div v-if="!user" class="mb-6">
          <div class="md:inline-flex items-center md:space-x-3 space-y-2 md:space-y-0">
            <span class="text-lg font-bold">Tracker for </span>
            <label>
              <input class="p-1.5 px-2 border border-gray-200 rounded" type="text" placeholder="Wallet Address">
            </label>
            <button class="p-1.5 px-2 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] text-white rounded">Get Started</button>
            <nuxt-link class="text-sm inline-flex items-center space-x-2" to="/dashboard/0x9aF493BC3deFCe2933E8f08B4dB8E4BfD63e25b4">
              <span>View random wallet</span>
              <icon name="chv-right"></icon>
            </nuxt-link>
          </div>
        </div>
        <div class="mb-12">
          <div class="mb-6 md:flex md:space-x-16 space-y-4 md:space-y-0">
            <div>
              <h4 class="font-extrabold text-4xl">620$</h4>
              <span>Earning</span>
            </div>
            <div>
              <h4 class="font-extrabold text-4xl">330$</h4>
              <span>Unclaimed</span>
            </div>
            <div>
              <h4 class="font-extrabold text-4xl">9k</h4>
              <span>Total</span>
            </div>
            <div>
              <h4 class="font-extrabold text-4xl">8days</h4>
              <span>Next Claim</span>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <earning/>
            <ranking/>
          </div>
        </div>
        <div class="mb-12">
          <div class="flex justify-between mb-4">
            <h2 class="font-bold">NFTs</h2>
            <div class="flex space-x-6">
              <span>Quantity:</span>
              <span class="font-bold">10</span>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="i in 4" :key="i" class="">
              <video autoplay="autoplay" muted="muted" playsinline="" loop="loop" class="w-full">
                <source :src="`https://cdn.stephero.io/heroes/720w/SH_${i}10.mp4`">
              </video>
            </div>
          </div>
        </div>
        <div v-if="!user" class="mb-12 text-center">
          <h2 class="text-2xl">View full dashboard and track more game</h2>
          <div>
            <nuxt-link class="m-3 p-1.5 px-2 inline-flex space-x-2 items-center cursor-pointer bg-[#0F43F9] rounded text-white" to="/dashboard">
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
      <div v-if="user" class="w-64">
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
            <div class="m-3 p-1.5 px-2 inline-flex space-x-2 items-center cursor-pointer bg-[#0F43F9] rounded text-white">
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
export default {
  name: "DashboardSingle",
  data() {
    return {
      game: null
    }
  },
  components: {Ranking, Earning}
}
</script>

<style scoped>
.wallet-select {
  @apply rounded bg-gray-100 p-4 mb-4 cursor-pointer;
}

.wallet-select.active {
  @apply -ml-4 pl-8 bg-blue-50 rounded-tl-none rounded-bl-none;
}
</style>
