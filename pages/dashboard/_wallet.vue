<template>
  <div class="flex flex-col lg:flex-row px-3">
    <div class="flex-1">
      <div class="container my-4">
        <div class="my-8 flex justify-between">
          <template v-if="!user">
            <div class="flex space-x-2 items-center">
              <div class="site-title" @click="$router.push('/')">
                <nuxt-link class="" to="/">
                  <img class="w-32" src="/logo/logo-black.svg" alt="Xantus Tracker">
                </nuxt-link>
              </div>
            </div>
            <div class="flex space-x-8 items-center">
              <div class="p-1.5 px-4 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] rounded-xl text-white"
                   @click="logIn">
                <icon class="md" name="user" fill="#d6d3d1"/>
                <span>{{ user ? getUserName : 'Login' }}</span>
              </div>
            </div>
          </template>
          <div v-else-if="!$route.params.wallet">
            <h4 class="font-bold text-lg">Have a good day,</h4>
            <p class="text-gray-500">Here is the summary of your portfolio</p>
          </div>
        </div>
        <dashboard-multiple v-if="!$route.params.wallet"/>
        <game v-else-if="$route.params.wallet === 'game'"/>
        <scholarship v-else-if="$route.params.wallet === 'scholarship'"/>
        <dashboard-single v-else/>
      </div>
    </div>
    <div v-if="data && data.wallet && data.watcher && isWallet" class="bg-[#DDE0F64D] w-full md:w-72 p-4 py-8">
      <div class="flex items-center space-x-3">
        <div class="text-4xl bg-[#ACB9FF] p-1.5 w-12 h-12 rounded-full">🤨</div>
        <div class="flex-1">
          <h4 class="text-lg font-bold">{{ data.watcher.meta ? data.watcher.meta.name : "Unnamed" }}</h4>
          <div class="address_section">
            <p class="short_address" @copy="copyAddress" >{{ shortAddress(data.wallet) }}</p>
          </div>
        </div>
        <div class="border rounded p-1 px-2 text-xs cursor-pointer" @click="edit">Edit</div>
      </div>
      <div class="mt-4">
        <div class="flex justify-between mb-2">
          <h4>Share</h4>
          <span class="font-bold">{{ toBN( data.watcher.earn_ratio ) }}%</span>
        </div>
        <div class="w-full bg-[#0F43F9] h-2 rounded-xl">
          <div class="bg-[#FFA800] h-2 rounded-xl" :style="{width: `${(data.watcher.earn_ratio * 100) > 100 ? 100 : data.watcher.earn_ratio * 100}%`}"></div>
        </div>
      </div>
      <hr class="my-4 border-[#ACB9FF50]"/>
      <div >
        <div class="flex justify-between items-center mb-2">
          <h4>Name</h4>
          <div v-if="data.watcher.meta" class="font-bold">{{ data.watcher.meta.name }}</div>
        </div>
        <div class="flex justify-between items-center mb-2">
          <h4>Phone</h4>
          <div v-if="data.watcher.meta" class="font-bold">{{ data.watcher.meta.phone }}</div>
        </div>
        <div class="flex justify-between items-center mb-2 space-x-6">
          <h4>Address</h4>
          <div v-if="data.watcher.meta" class="font-bold">{{ data.watcher.meta.address }}</div>
        </div>
        <div class="flex justify-between items-center mb-2">
          <h4>Telegram</h4>
          <div class="font-bold">0987654321</div>
        </div>
        <div class="flex justify-between items-center mb-2">
          <h4>Payout Address</h4>
          <div v-if="data.watcher.meta && data.watcher.meta.payout_address" class="font-bold">
            {{
              `${data.watcher.meta.payout_address.substr(0, 5)}...${data.watcher.meta.payout_address.substr(35, 42)}`
            }}
          </div>
        </div>
        <div>
          <div class="flex justify-between items-center mb-2">
            <h4>Note</h4>
          </div>
          <div v-if="data.watcher.meta" class="h-32 italic text-sm">{{ data.watcher.meta.note }}</div>
        </div>
        <hr class="my-4 border-[#ACB9FF50]"/>
        <div class="grid grid-cols-3 gap-3">
          <div v-for="item in data.related" :key="item.id" class="has-remove">
            <nuxt-link
              :to="`/dashboard/${item.wallet}?game=${$route.query.game}`"
              class="p-2 py-4 bg-white rounded-xl hover:shadow-xl cursor-pointer block"
            >
              <div class="text-4xl bg-[#ACB9FF] p-1.5 w-12 h-12 rounded-full mx-auto mb-3">🤨</div>
              <p class="one-line">{{item.meta ? item.meta.name : 'Unnamed'}}</p>
            </nuxt-link>
            <div class="remove" @click="removeWatcher(item.id)">
              <icon class="sm" fill="#FFF" name="remove"></icon>
            </div>
          </div>
          <div class="p-2 py-4 border border-dashed rounded-xl cursor-pointer text-center" @click="openForm()">
            <icon name="plus"></icon>
            <p>Add more wallet</p>
          </div>
        </div>
      </div>
    </div>
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
    ...mapGetters("w3_auth", ["getUserName"]),
    isWallet() {
      return this.$route.params.wallet && !["game", "scholarship"].includes(this.$route.params.wallet)
    },
    data() {
      return this.$store.state.config.wallet
    }
  },
  fetch() {
    if (this.isWallet || !this.$route.params.wallet) {
      this.fetchData({
        wallet: this.$route.params.wallet || "dashboard",
        game_id: this.$route.query.game
      })
    }
  },
  methods: {
    ...mapActions("w3_auth", ["logIn"]),
    ...mapActions('config', ['fetchData', 'removeWatcher']),
    copyAddress() {
      navigator.clipboard.writeText(this.data.wallet)
    },
    edit() {
      this.$store.commit('config/SET_MODAL', {
        type: "add_wallet",
        data: {
          watcher: this.data.watcher,
          game: {
            id: this.$route.query.game
          }
        }
      })
    },
    openForm() {
      this.$store.commit('config/SET_MODAL', {
        type: "add_wallet",
        data: {
          game: {
            id: this.$route.query.game
          }
        }
      })
    }
  }
}
</script>

<style>
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.address_section {
  position: relative;
}
.address_hidden {
  position: absolute;
  z-index: 1;
  background: #f5f5f5
}
</style>
