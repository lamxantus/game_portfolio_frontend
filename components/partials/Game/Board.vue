<template>
  <div class="grid grid-cols-4 gap-4">
    <card-game v-for="item in items" :key="item.id" :value="item"/>
  </div>
</template>

<script>
export default {
  name: "GameBoard",
  computed: {
    items() {
      return this.$store.state.config.games;
    }
  }
}
</script>

<style scoped>

</style>
