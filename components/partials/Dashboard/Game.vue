<template>
  <div>
    <div class="mb-6 flex justify-between">
      <h4 class="font-bold text-lg">You have {{ response.count }} NFTs</h4>
      <div class="flex space-x-2 items-center">
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
          <span>{{ item.price > 0 ? item.price.toLocaleString() + 'eth' : 'N/A' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Game",
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
        this.response = await this.$axios.$get("/assets", {
          params: {
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
