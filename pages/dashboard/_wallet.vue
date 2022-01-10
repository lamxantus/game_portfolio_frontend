<template>
  <div class="py-0 p-6 flex md:flex-row flex-col md:space-x-12" :class="{container: !user}">
    <div v-if="user" class="md:w-28 mb-6 bg-[#0F43F9] rounded shadow md:py-16 flex md:flex-col space-x-0">
      <div class="menu-item active">
        <div><icon name="home"></icon></div>
        <div>Dashboard</div>
      </div>
      <div class="menu-item">
        <div><icon name="target"></icon></div>
        <div>NFTs</div>
      </div>
      <div class="menu-item">
        <div><icon name="user"></icon></div>
        <div>Scholarship</div>
      </div>
    </div>
    <div class="flex-1">
      <div v-if="user" class="flex flex-wrap text-[#0F43F9] -mx-2">
        <div class="px-2 text-gray-500">{{now.toLocaleDateString()}} {{now.toLocaleTimeString()}}</div>
        <div class="px-2">AXS/USDt: 70</div>
        <div class="px-2">SLP/USDt: 0.02</div>
      </div>
      <dashboard-multiple v-if="!$route.params.wallet"/>
      <dashboard-single v-else/>
    </div>
  </div>
</template>

<script>
import DashboardMultiple from "../../components/partials/Dashboard/Multiple";
import DashboardSingle from "../../components/partials/Dashboard/Single";
export default {
  name: "PageWallet",
  components: {DashboardSingle, DashboardMultiple},
  data() {
    return {
      now: new Date
    }
  }
}
</script>

<style>
.menu-item {
  @apply text-center text-white justify-center p-4 duration-300 cursor-pointer;
}

.menu-item svg {
  fill: #FFFFFF;
}

.menu-item:hover,
.menu-item.active {
  @apply bg-white;
  color: #0F43F9;
}

.menu-item:hover svg,
.menu-item.active svg {
  fill: #0F43F9;
}
</style>
