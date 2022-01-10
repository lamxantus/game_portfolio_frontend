<template>
  <div class="p-6 flex md:space-x-12">
    <div v-if="user" class="w-28 bg-[#0F43F9] rounded shadow py-16">
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
      <div v-if="user" class="flex space-x-4 text-[#0F43F9]">
        <div class="text-gray-500">{{now.toLocaleDateString()}} {{now.toLocaleTimeString()}}</div>
        <div>AXS/USDt: 70</div>
        <div>SLP/USDt: 0.02</div>
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
  @apply text-center text-white justify-center py-4 duration-300 cursor-pointer;
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
