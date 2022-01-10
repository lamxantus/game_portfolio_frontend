<template>
  <div class="mb-6 md:mb-12 border bg-gray-100 rounded">
    <div class="-mt-2">
      <span class="ml-12 bg-[#0F43F9] py-1 p-4 text-white rounded-full">Game 1</span>
    </div>
    <div class="md:flex md:space-x-16 space-y-4 md:space-y-0 p-4">
      <div class="flex-1"></div>
      <div class="flex-1 flex justify-center md:space-x-16 space-x-4">
        <div>
          <h4 class="font-extrabold text-4xl">620$</h4>
          <span>Earning</span>
        </div>
        <div>
          <h4 class="font-extrabold text-4xl">330$</h4>
          <span>Unclaimed</span>
        </div>
        <div>
          <h4 class="font-extrabold text-4xl">9k</h4>
          <span>Total</span>
        </div>
      </div>
      <div class="flex-1 flex justify-center md:justify-end space-x-4">
        <div>Today</div>
        <div>Week</div>
        <div>Month</div>
      </div>
    </div>
    <div class="m-4 border bg-white rounded">
      <table class="w-full table-fixed text-sm font-medium mb-4 mt-2">
        <thead>
        <tr class="text-gray-400 font-light uppercase text-xs leading-normal">
          <th class="py-2 px-4 text-left">Name</th>
          <th class="py-2 px-4 text-left">Today</th>
          <th class="py-2 px-4 text-left">Elo</th>
          <th class="py-2 px-4 text-left">Rank</th>
          <th class="py-2 px-4 text-left">Range of Rank</th>
          <th class="py-2 px-4 text-left">NFTs</th>
          <th class="py-2 px-4 text-right">Next Claim</th>
        </tr>
        </thead>
        <tbody>
        <template>
          <tr class="hover:bg-gray-100 duration-200">
            <td class="py-2 px-4 text-left">
              <nuxt-link class="text-[#0F43F9]" to="/dashboard/random">0x00...b4</nuxt-link>
            </td>
            <td class="py-2 px-4 text-left">1</td>
            <td class="py-2 px-4 text-left">2</td>
            <td class="py-2 px-4 text-left">3</td>
            <td class="py-2 px-4 text-left">4</td>
            <td class="py-2 px-4 text-left">5</td>
            <td class="py-2 px-4 text-right">6</td>
          </tr>
        </template>
        </tbody>
      </table>
      <div class="mb-4 text-center">
        <div class="inline-flex border-[#0F43F9] px-4 py-1.5 rounded space-x-2 border">
          <icon name="plus"></icon>
          <span>Add more</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameReport"
}
</script>

<style scoped>

</style>
