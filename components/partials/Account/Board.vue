<template>
  <div>
    <div class="flex space-x-4 items-center">
      <h4 class="widget-title">Account</h4>
      <div class="flex items-center cursor-pointer border border-stone-500 bg-stone-600 space-x-2 rounded px-3 py-1">
        <icon name="plus"></icon>
        <span class="text-xs">Add</span>
      </div>
    </div>
    <table class="w-full table-fixed text-sm font-medium mb-4 mt-2">
      <thead>
      <tr class="text-gray-400 font-light uppercase text-xs leading-normal">
        <th class="py-2 text-left">Name</th>
        <th class="py-2 px-4 text-left">Address</th>
        <th class="hidden md:table-cell py-2 w-48 px-4 text-left">SLP</th>
        <th class="hidden md:table-cell py-2 w-1/6 px-4 text-right">Rank</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="item in response.results">
        <tr class="border-b border-dashed hover:bg-gray-100 duration-200" :key="item.id">
          <td class="py-2 flex justify-center items-center">
          </td>
          <td class="py-2 px-4 text-left">
          </td>
          <td class="hidden md:table-cell py-1 px-4 text-left -mx-1 flex flex-wrap">
          </td>
          <td class="hidden md:table-cell py-2 px-4 text-right">
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "BoardAccount",
  computed: {
    response() {
      return {
        results: []
      }
    }
  }
}
</script>

<style scoped>

</style>
