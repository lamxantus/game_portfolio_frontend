<template>
  <div class="axs">
    <div class="py-0 p-6 flex md:flex-row flex-col" :class="{container: !user}">
      <div v-if="user" class="md:fixed top-0 left-4 bottom-0 flex-col items-center justify-center flex">
        <div class="md:w-28 mb-6 bg-[#F6F8FF] rounded shadow flex md:flex-col space-x-0 w-full">
          <nuxt-link to="/dashboard" class="menu-item">
            <div><icon name="home"></icon></div>
            <div>Dashboard</div>
          </nuxt-link>
          <nuxt-link to="/dashboard/game" class="menu-item">
            <div><icon name="target"></icon></div>
            <div>NFTs</div>
          </nuxt-link>
          <nuxt-link to="/dashboard/scholarship" class="menu-item">
            <div><icon name="user"></icon></div>
            <div>Scholarship</div>
          </nuxt-link>
        </div>
      </div>
      <div class="flex-1" :class="{'md:ml-32': user}">
        <div v-if="user" class="flex flex-wrap text-[#0F43F9] -mx-2">
          <div class="px-2 text-gray-500">{{now.toLocaleDateString()}} {{now.toLocaleTimeString()}}</div>
          <div class="px-2">AXS/USDt: 70</div>
          <div class="px-2">SLP/USDt: 0.02</div>
        </div>
        <dashboard-multiple v-if="!$route.params.wallet"/>
        <game v-else-if="$route.params.wallet === 'game'"/>
        <scholarship v-else-if="$route.params.wallet === 'scholarship'"/>
        <dashboard-single v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import DashboardMultiple from "../../components/partials/Dashboard/Multiple";
import DashboardSingle from "../../components/partials/Dashboard/Single";
import Game from "../../components/partials/Dashboard/Game";
import Scholarship from "../../components/partials/Dashboard/Scholarship";

export default {
  name: "PageWallet",
  components: {Scholarship, Game, DashboardSingle, DashboardMultiple},
  data() {
    return {
      now: new Date
    }
  },
  fetch() {
    this.fetchData(this.$route.params.wallet || "dashboard")
  },
  methods: {
    ...mapActions('config', [
      'fetchData'
    ]),
  }
}
</script>

<style>
.menu-item {
  @apply text-center text-white justify-center p-4 duration-300 cursor-pointer flex-1;
}

.menu-item svg {
  fill: #FFFFFF;
}

.menu-item:hover,
.menu-item.nuxt-link-exact-active {
  @apply bg-white;
  color: #0F43F9;
}

.menu-item:hover svg,
.menu-item.nuxt-link-exact-active svg {
  fill: #0F43F9;
}
</style>
