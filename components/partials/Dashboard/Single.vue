<template>
  <div class="container my-10">
    <div class="mb-12">
      <div class="inline-flex items-center space-x-3">
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
      <div class="mb-6 flex space-x-16">
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
      <div class="grid grid-cols-2 space-x-6">
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
      <div class="grid grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="">
          <video autoplay="autoplay" muted="muted" playsinline="" loop="loop" class="w-full">
            <source :src="`https://cdn.stephero.io/heroes/720w/SH_${i}10.mp4`">
          </video>
        </div>
      </div>
    </div>
    <div class="mb-12 text-center">
      <h2 class="text-2xl">View full dashboard and track more game</h2>
      <div>
        <div class="m-3 p-1.5 px-2 inline-flex space-x-2 items-center cursor-pointer bg-[#0F43F9] rounded text-white">
          <icon class="md" name="user" fill="#d6d3d1"/>
          <span>Connect Wallet</span>
        </div>
      </div>
      <div class="flex items-center justify-center space-x-4">
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
</template>

<script>
import Earning from "./Earning";
import Ranking from "./Ranking";
export default {
  name: "DashboardSingle",
  components: {Ranking, Earning}
}
</script>

<style scoped>

</style>
