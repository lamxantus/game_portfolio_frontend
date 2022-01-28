<template>
  <div>
    <h1 class="text-xl m-4 font-bold">Add Wallet</h1>
    <div v-if="!done" class="space-y-3">
      <label class="block">
        <span class="mx-4 block font-bold mb-2">Wallet address</span>
        <input
          v-model="form.wallet" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
          placeholder="Wallet Address">
      </label>
      <template v-if="form.id && !done">
        <label class="block">
          <span class="mx-4 block font-bold mb-2">Name</span>
          <input
            v-model="form.name" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
          >
        </label>
        <label class="block">
          <span class="mx-4 block font-bold mb-2">Address</span>
          <input
            v-model="form.address" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
          >
        </label>
        <label class="block">
          <span class="mx-4 block font-bold mb-2">Phone</span>
          <input
            v-model="form.phone" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
          >
        </label>
        <label class="block">
          <span class="mx-4 block font-bold mb-2">Telegram</span>
          <input
            v-model="form.telegram" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
          >
        </label>
        <label class="block">
          <span class="mx-4 block font-bold mb-2">Profit Sharing Percentage</span>
          <input
            v-model="form.psp" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl"
            type="number">
        </label>
      </template>
    </div>
    <div v-else>
      <h1 class="text-xl m-4 font-bold">New wallet was added successfully</h1>
    </div>
    <div class="flex justify-center space-x-4 mt-6">
      <div class="bg-[#0F43F9] text-white p-2 px-4 rounded-xl cursor-pointer" @click="action()">
        <span v-if="!form.id">Add to your portfolio</span>
        <span v-else-if="!done">Save</span>
        <span v-else>View your dashboard</span>
      </div>
      <div v-if="form.id && !done" class="border border-[#0F43F9] p-2 px-4 rounded-xl">
        <span>Skip</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "FormWatcher",
  data() {
    return {
      done: false,
      form: {
        id: null,
        wallet: null,
        address: null,
        name: null,
        phone: null,
        telegram: null,
        psp: 1
      }
    }
  },
  computed: {
    game() {
      return this.$store.state.config.modal ? this.$store.state.config.modal.data.game : null
    }
  },
  methods: {
    ...mapActions('config', ['fetchData']),
    action() {
      if (!this.form.id) {
        if (!this.form.wallet) return;
        this.$axios.$post('/watch', {
          address: this.form.wallet,
          game: this.game.id
        }).then((res) => {
          this.form.id = res.id;
          this.fetchData("dashboard", 1);
          this.$store.commit('config/SET_MODAL', null);
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
