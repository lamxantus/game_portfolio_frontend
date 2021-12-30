<template>
  <div class="border border-stone-700 bg-stone-800 rounded shadow flex space-x-4 py-3 p-4" v-if="value">
    <div></div>
    <div>
      <h4 class="font-bold">{{ value.title }}</h4>
      <p class="text-xs">{{ value.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssetCard",
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
