<template>
  <header class="bg-black text-white">
    <div class="wrapper" :class="{'container': !$route.path.includes('dashboard') || !user}">
      <div class="flex space-x-4 my-2 text-xs items-center">
        <div class="p-1 px-3 bg-[#555555] rounded">{{now.toISOString()}}</div>
        <div v-for="item in priceRates" :key="item.pair">
          <span class="text-[#C4C4C4]">{{ item.pair }}</span>
          <span class="text-green-400">{{ item.price.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
const {mapActions, mapGetters} = require("vuex");
export default {
  name: "PHeader",
  data() {
    return {
      now: new Date(),
    }
  },
  computed: {
    priceRates() {
      return this.$store.state.config.priceRates
    }
  },
  created() {
    this.$axios.$get("/prices").then(res => {
      this.$store.commit('config/SET_PRICE', res);
    })
  }
}
</script>

<style>
header {
  @apply relative z-10;
}

header .wrapper {
  @apply flex justify-between space-x-8 px-6 h-10 px-6;
}

header .wrapper.container {
  @apply md:px-0;
}

.site-title {
  @apply flex space-x-2;
}
</style>
