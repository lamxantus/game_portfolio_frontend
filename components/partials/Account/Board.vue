<template>
  <div>
    <div class="flex space-x-4 items-center">
      <h4 class="widget-title">Account</h4>
      <label>
        <input class="px-3 py-1 border bg-stone-800 border-stone-700" v-model="input">
      </label>
      <div class="flex items-center cursor-pointer border border-stone-500 bg-green-600 space-x-2 px-3 py-2" @click="fetch()">
        <icon name="plus"></icon>
        <span class="text-xs">Add</span>
      </div>
    </div>
    <table class="w-full table-fixed text-sm font-medium mb-4 mt-2">
      <thead>
      <tr class="text-gray-400 font-light uppercase text-xs leading-normal">
        <th class="py-2 text-left">Name</th>
        <th class="py-2 px-4 text-left">Address</th>
        <th class="hidden md:table-cell py-2 w-48 px-4 text-left">Claimed</th>
        <th class="hidden md:table-cell py-2 w-1/6 px-4 text-right">Elo</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="item in results">
        <tr class="border-b border-dashed hover:bg-gray-100 duration-200" :key="item.accountId">
          <td class="py-2 flex justify-center items-center">{{ item.name }}
          </td>
          <td class="py-2 px-4 text-left">{{ item.address }}
          </td>
          <td class="hidden md:table-cell py-1 px-4 text-left -mx-1 flex flex-wrap">{{ item.claimed }}
          </td>
          <td class="hidden md:table-cell py-2 px-4 text-right">{{ item.elo }}</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "BoardAccount",
  data() {
    return {
      input: null,
    }
  },
  methods: {
    ...mapActions("config", ["fetchAsset"]),
    fetch() {
      this.fetchAsset(this.input);
    }
  },
  computed: {
    results() {
      return this.$store.state.config.wallets;
    }
  }
}
</script>

<style scoped>

</style>
