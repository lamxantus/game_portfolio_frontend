<template>
  <div class="container">
    <section class="mt-6">
      <h4 class="widget-title mb-2">Select a game</h4>
      <board-game/>
    </section>
    <section class="mt-6">
      <h4 class="widget-title mb-2">General report</h4>
      <client-only><board-report/></client-only>
    </section>
    <section class="mt-6">
      <board-account/>
    </section>
    <section class="mt-6">
      <h4 class="widget-title mb-2">Asset list</h4>
      <board-asset/>
    </section>
  </div>
</template>

<script>

export default {
  name: "GamePage",
  data() {
    return {}
  }
}
</script>

<style>
.widget-title {
  @apply uppercase text-xs font-bold text-stone-500;
}
</style>
