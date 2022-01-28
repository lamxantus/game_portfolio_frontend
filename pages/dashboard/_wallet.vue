<template>
  <div class="container my-4">
    <div class="mb-4 flex justify-between">
      <template v-if="!user">
        <div class="flex space-x-2 items-center">
          <div class="site-title" @click="$router.push('/')">
            <n-link class="" to="/">
              <img src="/logo.png" alt="Xantus Tracker">
            </n-link>
          </div>
        </div>
        <div class="flex space-x-8 items-center">
          <div class="p-1.5 px-4 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] rounded-xl text-white" @click="logIn">
            <icon class="md" name="user" fill="#d6d3d1"/>
            <span>{{ user ? getUserName : 'Connect Wallet' }}</span>
          </div>
        </div>
      </template>
      <div v-else>
        <h4 class="font-bold text-lg">Hello Son,</h4>
        <p class="text-gray-500">Next claimed is about 3 days. Here is sumary of your porfolio</p>
      </div>
    </div>
    <dashboard-multiple v-if="!$route.params.wallet"/>
    <game v-else-if="$route.params.wallet === 'game'"/>
    <scholarship v-else-if="$route.params.wallet === 'scholarship'"/>
    <dashboard-single v-else/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
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
  computed: {
    ...mapGetters("auth", ["getUserName"]),
  },
  fetch() {
    this.fetchData(this.$route.params.wallet || "dashboard", 1)
  },
  methods: {
    ...mapActions("auth", ["logIn"]),
    ...mapActions('config', ['fetchData']),
  }
}
</script>

<style>

</style>
