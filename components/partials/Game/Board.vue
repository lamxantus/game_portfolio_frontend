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
      return [
        {
          id: 1,
          title: "StepHero",
          description: "step hero MULTIVERSE. The one-stop shop for P2E gamers which brings you extraordinary. gaming experience & lucrative earning opportunities.",
          image: "/stephero.jpeg"
        },
        {
          id: 2,
          title: "Axie Infinity",
          description: "Build up a collection and use them across an ever expanding universe of games! Axie Infinity uses cutting edge technology called Blockchain to reward players",
          image: "/axie.jpeg"
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
