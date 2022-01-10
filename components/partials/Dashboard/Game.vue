<template>
  <div class="my-6 md:mb-12 border bg-gray-100 rounded p-6">
    <div class="-mt-10 mb-6">
      <div class="inline-flex rounded bg-gray-200 overflow-hidden">
        <span class="py-1 p-6 cursor-pointer text-white bg-[#0F43F9]">Game 1</span>
        <span class="py-1 p-6 cursor-pointer">Game 1</span>
        <span class="py-1 p-6 cursor-pointer">Game 1</span>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
      <div v-for="i in 6" :key="i" class="">
        <video autoplay="autoplay" muted="muted" playsinline="" loop="loop" class="w-full">
          <source :src="`https://cdn.stephero.io/heroes/720w/SH_${i}10.mp4`">
        </video>
      </div>
      <div v-for="i in 6" :key="i" class="">
        <video autoplay="autoplay" muted="muted" playsinline="" loop="loop" class="w-full">
          <source :src="`https://cdn.stephero.io/heroes/720w/SH_${i}10.mp4`">
        </video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Game"
}
</script>

<style scoped>

</style>
