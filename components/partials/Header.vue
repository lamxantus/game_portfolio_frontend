<template>
  <header class="bg-black text-white">
    <div class="flex space-x-6 m-2 text-xs items-center">
      <div class="p-1 px-3 bg-[#555555] rounded">{{now.toLocaleDateString()}} {{now.toLocaleTimeString()}}</div>
      <div class="relative flex-1 h-4">
        <div class="absolute top-0 left-0 right-0 bottom-0 overflow-x-auto overflow-y-hidden disable-scrollbar">
          <div class="flex space-x-4 items-center " style="white-space: nowrap;">
            <div class="space-x-2 inline-flex" v-for="item in priceRates" :key="item.pair">
              <span class="text-[#C4C4C4]">{{ item.pair }}</span>
              <span class="text-green-400">{{ item.price.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="$store.state.auth.loggedIn" class="p-1 px-3 cursor-pointer" @click="$auth.logout()">
        <icon name="logout" fill="#F9F9F9"></icon>
      </div>
    </div>
  </header>
</template>

<script>
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
    setInterval(() => {
      this.now = new Date();
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

.disable-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.disable-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
