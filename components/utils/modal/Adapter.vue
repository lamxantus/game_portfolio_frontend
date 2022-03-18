<template>
  <div v-if="modal" class="fixed top-0 left-0 right-0 bottom-0 z-20 flex justify-center items-center p-4">
    <div
      class="fixed top-0 left-0 right-0 bottom-0 backdrop-blur bg-black/30"
      @click="$store.commit('config/SET_MODAL', null)"
    ></div>
    <div class="mx-auto bg-white rounded-xl p-4 md:p-6 relative z-10 overflow-y-scroll ">
      <form-watcher v-if="modal.type === 'add_wallet'"/>
      <metamask-install v-else-if="modal.type === 'metamask_install'"/>
      <login v-else-if="modal.type === 'login'"/>
    </div>
  </div>
</template>

<script>
import FormWatcher from "./FormWatcher";
import MetamaskInstall from "./MetamaskInstall";
import Login from "./Login";

export default {
  name: "Adapter",
  components: {Login, MetamaskInstall, FormWatcher},
  computed: {
    modal() {
      return this.$store.state.config.modal
    }
  }
}
</script>

<style scoped>

</style>
