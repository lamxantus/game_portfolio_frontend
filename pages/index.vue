<template>
  <div class="container my-10">
    <div class="mb-10 text-center md:w-3/5 mx-auto">
      <h1 class="text-6xl font-bold mb-6">Easily Track your GameFI Portfolio</h1>
      <p class="mb-8 text-sm text-gray-500">Enter your wallet address to start</p>
      <div class="mb-12">
        <div class="inline-flex items-center space-x-3">
          <label>
            <input
              v-model="wallet"
              class="p-1.5 px-2 border border-gray-200 rounded" type="text" placeholder="Wallet Address"
            >
          </label>
          <button
            class="p-1.5 px-2 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] text-white rounded"
            @click="trackWallet"
          >Get Started</button>
        </div>
      </div>
      <nuxt-link v-if="!user" class="text-sm inline-flex items-center space-x-2" to="/dashboard/random">
        <span>View random wallet</span>
        <icon name="chv-right"></icon>
      </nuxt-link>
      <nuxt-link v-else class="text-sm inline-flex items-center space-x-2" to="/dashboard">
        <span>Dashboard</span>
        <icon name="chv-right"></icon>
      </nuxt-link>
    </div>
    <div class="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 -mx-4 md:mx-0">
      <div class="p-4 hover:bg-gray-100 duration-300">
        <div class="w-12 h-12 bg-[#0F43F9] mb-4 rounded"></div>
        <h3 class="mb-4 text-2xl font-bold">Easy tracking</h3>
        <p>a book or other written or printed work, regarded in terms of its content rather than its physical form.</p>
      </div>
      <div class="p-4 hover:bg-gray-100 duration-300">
        <div class="w-12 h-12 bg-[#0F43F9] mb-4 rounded"></div>
        <h3 class="mb-4 text-2xl font-bold">Full report</h3>
        <p>a book or other written or printed work, regarded in terms of its content rather than its physical form.</p>
      </div>
      <div class="p-4 hover:bg-gray-100 duration-300">
        <div class="w-12 h-12 bg-[#0F43F9] mb-4 rounded"></div>
        <h3 class="mb-4 text-2xl font-bold">Secure...</h3>
        <p>a book or other written or printed work, regarded in terms of its content rather than its physical form.</p>
      </div>
    </div>
    <div class="md:w-3/5 mx-auto md:flex md:space-x-4">
      <h2 class="md:w-2/3 text-xl mb-4">More than <span class="text-[#0F43F9]">150.000+</span> Gamefi player are using us</h2>
      <div class="flex items-center">
        <img class="" src="/avatar.png" alt="">
        <img class="-ml-6" src="/avatar.png" alt="">
        <img class="-ml-6" src="/avatar.png" alt="">
        <img class="-ml-6" src="/avatar.png" alt="">
        <img class="-ml-6" src="/avatar.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      wallet: null
    }
  },
  methods: {
    trackWallet() {
      if (this.wallet) {
        this.$router.push(`/dashboard/${this.wallet}`);
      }
    }
  }
}
</script>

<style scoped>

</style>
