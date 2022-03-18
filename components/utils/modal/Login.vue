<template>
  <div>
    <p class="mb-4">
      Connect with one of our available wallet info providers or create a new one.
    </p>
    <div class="border rounded-xl">
      <div
        class="p-4 border-b hover:shadow-md flex space-x-4 items-center cursor-pointer"
        @click="handleClick('walletconnect')"
      >
        <img class="w-6" src="/walletconnect.svg" alt="">
        <div class="flex-1">
          <span>WalletConnect</span>
          <p v-if="showNoti" class="text-xs text-gray-400">Please open your mobile wallet!</p>
        </div>
      </div>
      <div
        class="p-4 hover:shadow-md flex space-x-4 items-center cursor-pointer"
        @click="handleClick('metamask')"
      >
        <img class="w-6" src="/metamask.png" alt="">
        <span>MetaMask</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      showNoti: false
    }
  },
  methods: {
    ...mapActions("auth", ["login"]),
    handleClick(type) {
      this.showNoti = type === "walletconnect";
      this.login(type)
    }
  }
}
</script>

<style scoped>

</style>
