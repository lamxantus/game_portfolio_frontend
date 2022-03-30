<template>
  <div>
    <div class="mb-6">
      <h4 class="font-bold text-lg">You have {{ response.count }} NFTs</h4>
      <p class="text-gray-500">Whose total value is $0</p>
    </div>
    <div class="mb-6 flex justify-between">
      <div class="flex items-center space-x-2">
        <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
          <img src="/icon/earning.png" alt="">
        </div>
        <h2 class="font-bold text-lg">{{ game ===1 ? 'Axies Infinity': 'Gunfire Hero' }}</h2>
      </div>
      <div class="flex space-x-2 items-center">
        <div class="font-bold text-gray-500 mr-6">Total: {{ response.count }}</div>
        <div
          v-if="filter.page > 1"
          class="cursor-pointer rounded-full w-8 h-8 shadow-lg bg-white p-2" @click="navigate(false)">
          <icon name="chv-left"></icon>
        </div>
        <div
          v-if="filter.page * 8 < response.count"
          class="cursor-pointer rounded-full w-8 h-8 shadow-lg bg-white p-2" @click="navigate(true)">
          <icon name="chv-right"></icon>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div v-for="(item, i) in response.results" :key="i" class="bg-white rounded-lg duration-300 hover:shadow-xl p-3">
        <img :src="item.media_url" alt="">
        <h3 class="text-lg font-bold">{{ item.name }}</h3>
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-500">Last price</span>
          <span>{{item.current_price > 0?  item.current_price.toLocaleString() + 'eth' : 'N/A' }}</span>
        </div>
        <hr class="my-2 border-gray-100">
        <a
          :href="`https://marketplace.axieinfinity.com/axie/${item.id}/`"
          target="_blank"
          class="text-xs flex space-x-2 items-center">
          View on marketplace
          <icon name="chv-right" class="sm"></icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NFTS",
  props: {
    game: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      response: {
        results: [],
        count: 0
      },
      filter: {
        page: 1
      }
    }
  },
  methods: {
    async fetch() {
      if (this.user) {
        this.response = await this.$axios.$get("/nfts", {
          params: {
            game: this.game,
            user: this.user.id || this.user.pk,
            ...this.filter
          }
        });
      }
    },
    navigate(isNext = true) {
      if (isNext) {
        if (this.filter.page * 8 < this.response.count) {
          this.filter.page++
        }
      } else if (this.filter.page > 1) {
        this.filter.page--
      }
    }
  },
  watch: {
    user() {
      this.fetch()
    },
    filter: {
      deep: true,
      handler: function () {
        this.fetch({
          ...this.filter,
        })
      }
    },
  },
  created() {
    this.fetch()
  }
}
</script>

<style scoped>

</style>
