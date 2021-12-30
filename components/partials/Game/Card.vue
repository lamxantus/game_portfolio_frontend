<template>
  <div class="border border-stone-700 bg-stone-800 rounded shadow flex space-x-2 py-3 p-4" v-if="value">
    <div class="w-5 mt-1">
      <img class="rounded-sm" :src="value.image" alt="">
    </div>
    <div class="flex-1">
      <h4 class="font-extrabold">{{ value.title }}</h4>
      <p class="text-xs text-stone-500">{{ value.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameCard",
  props: {
    value: {
      default: null,
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
