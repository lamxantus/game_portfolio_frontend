<template>
  <div class="my-4">
    <div class="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      <div class="border bg-gray-100 rounded">
        <div class="text-center -mt-2">
          <span class="bg-[#0F43F9] py-1 p-4 text-white rounded-full">Today</span>
        </div>
        <div class="md:flex md:space-x-16 space-y-4 md:space-y-0 p-4">
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
        <div class="mb-4 text-center text-[#0F43F9]">+203 Today (PNL)</div>
      </div>
      <div class="border bg-gray-100 rounded">
        <div class="text-center -mt-2">
          <span class="bg-[#0F43F9] py-1 p-4 text-white rounded-full">Portfolio</span>
        </div>
        <div class="md:flex md:space-x-16 space-y-4 md:space-y-0 p-4">
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
        <div class="mb-4 text-center text-[#0F43F9]">Value: 8k</div>
      </div>
      <div class="border bg-gray-100 rounded">
        <div class="text-center -mt-2">
          <span class="bg-[#0F43F9] py-1 p-4 text-white rounded-full">Performance</span>
        </div>
        <div class="md:flex md:space-x-16 space-y-4 md:space-y-0 p-4">
          <div>
            <h4 class="font-extrabold text-4xl">620$</h4>
            <span>Earning</span>
          </div>
          <div>
            <h4 class="font-extrabold text-4xl">330$</h4>
            <span>Unclaimed</span>
          </div>
        </div>
      </div>
    </div>
    <game-report v-for="(item, i) in games" :key="i" :value="item"/>
  </div>
</template>

<script>
const schemas = require("/plugins/schemas");
import GameReport from "../Game/Report";
export default {
  name: "DashboardMultiple",
  components: {GameReport},
  computed: {
    games() {
      return this.$store.state.config.dashboard || schemas.DASHBOARD
    }
  }
}
</script>

<style scoped>

</style>
