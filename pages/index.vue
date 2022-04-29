<template>
  <div class="bg-[#030C1F] px-4">
    <section class="text-white">
      <div class="container mb-10">
        <div class="my-4 flex justify-between">
          <div class="flex space-x-2 items-center">
            <div class="site-title" @click="$router.push('/')">
              <nuxt-link class="" to="/">
                <img class="w-32" src="/logo/logo-white.svg" alt="Xantus Tracker">
              </nuxt-link>
            </div>
          </div>
          <div class="flex space-x-8 items-center">
            <div class="p-2 px-3 flex space-x-2 items-center cursor-pointer  rounded text-white connect-wallet-btn"
                 @click="logIn">
              <icon class="md" name="user" fill="#d6d3d1"/>
              <span style="font-weight: 700; color: #ACB9FF">{{ user ? getUserName : 'Login' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container relative z-20 text-center">
        <div class="md:w-3/5 mx-auto text-5xl font-bold leading-10">
          <div class="mb-3">Easily Track your</div>
          <div>GameFi Portfolio</div>
        </div>
        <div class="my-6" v-if="!user">
          <h2 class="mb-4 font-bold text-lg">Enter your wallet address</h2>
          <div class="mb-4 flex justify-center" @keyup.enter="trackWallet">
            <div id="search-section" class="inline-flex items-center space-x-3">
              <input
                v-model="wl"
                class="p-1.5 px-2 text-black bg-transparent wallet-input" type="text"
                placeholder="Wallet Address"
              >
              <button class="p-2 cursor-pointer bg-[#0F43F9] rounded-full" @click="trackWallet">
                <icon name="right" fill="#FFFFFF"></icon>
              </button>
            </div>
          </div>
          <nuxt-link class="text-sm inline-flex items-center space-x-1" :to="`/dashboard/${user ? '': 'random'}`">
            <span class="text-white">{{ user ? 'Dashboard' : 'View random wallet' }}</span>
            <icon name="chv-right" class="sm" fill="white"></icon>
          </nuxt-link>
        </div>
        <div class="my-6" v-if="user">
          <nuxt-link class="text-sm inline-flex items-center space-x-1 bg-[#0F43F9] rounded-3xl p-2 px-3"
                     to="/dashboard">
            <span class="text-white">View Dashboard</span>
            <icon name="chv-right" class="m" fill="white"></icon>
          </nuxt-link>
        </div>
      </div>
      <div class="relative my-16">
        <div id="s1" class="absolute  top-0 left-0 right-0 bottom-1/2"></div>
        <div class="container">
          <div class="relative z-10">
            <img style="width: 80%;" class="mx-auto" src="/bg/macbook.png" alt="">
            <div class="absolute top-12 pb-6 left-0 right-0 text-center">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="my-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 -mx-4 md:mx-0">
          <div class="p-4 md:p-6 bg-white rounded-2xl duration-300 hover:shadow-xl">
            <h3 class="mb-2 text-xl font-bold flex space-x-2 items-center">
              <img src="/icon/bookmark.png" alt="">
              <span>Multi-game</span>
            </h3>
            <p>Supports not only one game but many top games of your interest with ease</p>
          </div>
          <div class="p-4 md:p-6 bg-white rounded-2xl duration-30 hover:shadow-xl">
            <h3 class="mb-2 text-xl font-bold flex space-x-2 items-center">
              <img src="/icon/bookmark.png" alt="">
              <span>Data-driven</span>
            </h3>
            <p>Provides useful indexes and tools to help manage your resources</p>
          </div>
          <div class="p-4 md:p-6 bg-white rounded-2xl duration-300 hover:shadow-xl">
            <h3 class="mb-2 text-xl font-bold flex space-x-2 items-center">
              <img src="/icon/bookmark.png" alt="">
              <span>Free-to-use</span>
            </h3>
            <p>Lets you connect wallet and access tools to track your stats for free</p>
          </div>
        </div>
        <div class="my-16">
          <h2 class="mb-8 text-center text-3xl font-bold text-white">Track all the games you love</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="game-holder" v-for="game in games" :key="game.id">
              <div class="wrap">
                <img class="object-cover w-full h-full rounded-lg" :src="`/bg/${game.id}.png`" alt="">
              </div>
              <div class="absolute top-0 right-0 left-0 flex justify-center">
                <div v-if="!game.date || game.date > now" class="time">
                  <span v-if="game.date">{{ countDown(game.date - now) }}</span>
                  <span v-else>Coming soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-16">
          <h2 class="mb-8 text-center text-3xl font-bold text-white">Partnership with leading players</h2>
          <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div class="border p-4 text-center rounded-xl flex justify-center items-center" style="border-color: #3A4667;" v-for="item in partners" :key="item">
              <img class="object-cover mx-auto rounded" :src="`/logo/${item}.png`" alt="">
            </div>
          </div>
        </div>
        <div class="bg-[#0F43F9] p-6 text-white rounded-2xl hover:shadow-xl">
          <div class="md:flex md:space-x-4 items-center">
            <div class="flex items-center">
              <div class="rounded-full bg-white shadow border border-white">
                <img class="w-6" src="/avatar.png" alt="">
              </div>
              <div class="rounded-full bg-white shadow border border-white -ml-3 mb-4">
                <img class="w-8" src="/avatar.png" alt="">
              </div>
              <div class="rounded-full bg-white shadow border border-white -ml-3 mt-4 relative z-10">
                <img class="w-14" src="/avatar.png" alt="">
              </div>
              <div class="rounded-full bg-white shadow border border-white -ml-3 mb-4">
                <img class="w-8" src="/avatar.png" alt="">
              </div>
            </div>
            <div class="flex-1 text-2xl font-bold">
              <h2 style="font-size: 34px"><span class="text-[#FFA800]">150,000+</span></h2>
              <h2>GameFi Players are using Oxalus</h2>
            </div>
            <div class="p-2 px-3 flex space-x-2 items-center cursor-pointer bg-white rounded-3xl" @click="logIn">
              <icon class="md" name="user" fill="#d6d3d1"/>
              <span style="font-weight: 700; color: #0F43F9">{{ user ? getUserName : 'Login' }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Adapter from "../components/utils/modal/Adapter";
import {mapActions, mapGetters} from "vuex";
import Web3 from "web3";

let ivt = null;
export default {
  name: "PageIndex",
  components: {Adapter},
  data() {
    return {
      wl: null,
      now: new Date().getTime(),
      games: [
        {
          id: "axie_infinity",
          date: new Date().getTime()
        }, {
          id: "gunfire",
          date: new Date().getTime()
        }, {
          id: "mones",
          date: null
        }, {
          id: "ninneko",
          date: null
        }, {
          id: "thetan_arena",
          date: null
        }, {
          id: "splinterlands",
          date: null
        }, {
          id: "orbitau",
          date: null
        }, {
          id: "defi_kingdoms",
          date: null
        }, {
          id: "sandbox",
          date: null
        }, {
          id: "cyball",
          date: null
        }, {
          id: "elpis_battle",
          date: null
        }, {
          id: "the_parallel",
          date: null
        }
      ],
      partners: ['76', 'modgame', 'stephero', 'mones', 'acestarter', 'factory_chain', 'elpis_battle', 'the_parallel']
    }
  },
  methods: {
    trackWallet() {
      this.$gtm.push({event: 'Get_started'});
      if (this.wl) {
        const x = this.wl.replace("ronin:", "0x")
        this.wl = x;
        if (Web3.utils.isAddress(x)) {
          this.$router.push(`/dashboard/${x}`);
        } else {
          this.$store.commit('config/PUSH_NOTIFY', {
            msg: "Please input a valid address",
            type: "error"
          })
        }
      }
    },
    ...mapActions("w3_auth", ["logIn"]),
    ...mapActions('config', ['fetchData']),
    countDown(distance) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Display the result in the element with id="demo"
      return days + "d " + hours + "h " + minutes + "m " + seconds + "s "
    }
  },
  computed: {
    ...mapGetters("w3_auth", ["getUserName"]),
  },
  mounted() {
    ivt = setInterval(() => {
      this.now = new Date();
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(ivt);
  }
}
</script>

<style>
#s1 {
}

#search-section {
  @apply p-1;
  background: #FFFFFF;
  border-radius: 50px;
  width: 50%;
}

.wallet-input {
  @apply flex-1;
}

.wallet-input:focus-visible {
  outline: none;
}

#s1:before {
  position: absolute;
  width: 40vw;
  top: 0;
  content: "";
  bottom: 0;
  left: 30vw;
  border-radius: 100% 100% 0 0;
  box-shadow: 0 -14px 70px 45px #0f43f9;
  background: #0F43F9;

}

.connect-wallet-btn {
  border: 1px solid #ACB9FF;
  border-radius: 20px;
}

.game-holder {
  @apply relative;
  padding-top: 50%;
}

.game-holder .wrap {
  @apply absolute top-0 left-0 right-0 bottom-0;
}

.game-holder .time {
  @apply text-white p-0.5 px-2 bg-red-500 text-xs;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
