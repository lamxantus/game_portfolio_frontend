<template>
  <div>
    <table class="w-full table-fixed text-sm font-medium mb-4 mt-2">
      <thead>
      <tr class="text-gray-400 font-light uppercase text-xs leading-normal">
        <th class="py-2 text-left">Media</th>
        <th class="py-2 px-4 text-left">Name</th>
        <th class="py-2 px-4 text-left">Owner</th>
        <th class="hidden md:table-cell py-2 w-48 px-4 text-left">Rarity</th>
        <th class="hidden md:table-cell py-2 w-1/6 px-4 text-right">Action</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="item in response.results">
        <tr class="border-b border-dashed hover:bg-gray-100 duration-200" :key="item.id">
          <td class="py-2 flex justify-center items-center">
          </td>
          <td class="py-2 px-4 text-left">
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
  name: "AssetBoard",
  data() {
    return {
      response: {
        results: []
      }
    }
  },
}
</script>

<style scoped>

</style>
