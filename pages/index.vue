<template>
  <div>
    <section class="bg-black text-white">
      <div class="container mb-10">
        <div class="mb-4 flex justify-between">
          <div class="flex space-x-2 items-center">
            <div class="site-title" @click="$router.push('/')">
              <nuxt-link class="" to="/">
                <img src="/logo/logo-white.svg" alt="Xantus Tracker">
              </nuxt-link>
            </div>
          </div>
          <div class="flex space-x-8 items-center">
            <div class="p-1.5 px-2 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] rounded text-white" @click="logIn">
              <img src="/icon/wallet-white.png" alt="">
              <span>{{ user ? getUserName : 'Connect Wallet' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container relative z-20 text-center">
        <div class="md:w-3/5 mx-auto text-5xl font-bold leading-10">
          <div class="mb-3">Easily Track your</div>
          <div>GameFI Portfolio</div>
        </div>
        <div class="my-6">
          <h2 class="mb-4 font-bold text-lg">Enter your  wallet address</h2>
          <div class="mb-4 flex justify-center" @keyup.enter="trackWallet">
            <div class="inline-flex items-center space-x-3">
              <label>
                <input
                  v-model="wl"
                  class="p-1.5 px-2 border text-black border-gray-200 rounded" type="text" placeholder="Wallet Address"
                >
              </label>
              <button
                class="p-1.5 px-2 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] text-white rounded"
                @click="trackWallet"
              >Get Started</button>
            </div>
          </div>
          <nuxt-link class="text-sm inline-flex items-center space-x-1" :to="`/dashboard/${user ? '': 'random?game=1'}`">
            <span class="text-white">{{user ? 'Dashboard' : 'View random wallet'}}</span>
            <icon name="chv-right" class="sm" fill="white"></icon>
          </nuxt-link>
        </div>
      </div>
      <div class="bg-[#F7F8FF] relative">
        <div id="s1" class="absolute bg-black top-0 left-0 right-0 bottom-1/2"></div>
        <div class="container">
          <div class="relative z-10">
            <img class="mx-auto" src="/bg/macbook.png" alt="">
            <div class="absolute top-12 pb-6 left-0 right-0 text-center">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="my-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 -mx-4 md:mx-0">
          <div class="p-6 bg-white rounded-2xl duration-300 hover:shadow-xl">
            <h3 class="mb-2 text-xl font-bold flex space-x-2 items-center">
              <img src="/icon/bookmark.png" alt="">
              <span>Track more game</span>
            </h3>
            <p>We're using the Game API's and Data mining to display all data in the way user want to know</p>
          </div>
          <div class="p-4 bg-white rounded-2xl duration-30 hover:shadow-xl">
            <h3 class="mb-2 text-xl font-bold flex space-x-2 items-center">
              <img src="/icon/bookmark.png" alt="">
              <span>Data-driven</span>
            </h3>
            <p>We're using the Game API's and Data mining to display all data in the way user want to know</p>
          </div>
          <div class="p-4 bg-white rounded-2xl duration-300 hover:shadow-xl">
            <h3 class="mb-2 text-xl font-bold flex space-x-2 items-center">
              <img src="/icon/bookmark.png" alt="">
              <span>Secure...</span>
            </h3>
            <p>a book or other written or printed work, regarded in terms of its content rather than its physical
              form.</p>
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
              <h2>More than <span class="text-[#FFA800]">150.000+</span></h2>
              <h2>Gamefi player are using us</h2>
            </div>
            <div class="p-1.5 px-2 flex space-x-2 items-center cursor-pointer bg-white rounded" @click="logIn">
              <img src="/icon/wallet.png" alt="">
              <span class="text-black">{{ user ? getUserName : 'Connect Wallet' }}</span>
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

export default {
  name: "PageIndex",
  components: {Adapter},
  data() {
    return {
      wl: null
    }
  },
  methods: {
    trackWallet() {
      if (this.wl) {
        const x = this.wl.replace("ronin:", "0x")
        this.wl = x;
        if (Web3.utils.isAddress(x)) {
          this.$router.push(`/dashboard/${x}?game=1`);
        } else {
          this.$store.commit('config/PUSH_NOTIFY', {
            msg: "Please input a valid address",
            type: "error"
          })
        }
      }
    },
    ...mapActions("auth", ["logIn"]),
    ...mapActions('config', ['fetchData']),
  },
  computed: {
    ...mapGetters("auth", ["getUserName"]),
  },
}
</script>

<style>
#s1 {}

#s1:before {
  position: absolute;
  width: 40vw;
  top: 0;
  content: "";
  bottom: 0;
  left: 30vw;
  border-radius: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 -14px 70px 45px #0f43f9;
  background: #0F43F9;
}

</style>
