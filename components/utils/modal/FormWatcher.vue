<template>
  <div>
    <h1 class="text-xl mb-4 text-center font-bold">
      <span v-if="!form.id">Add Wallet</span>
      <span v-else-if="!done">Change Wallet Information</span>
    </h1>
    <div v-if="!done" class="space-y-3" style="width: 35%; min-width: 350px">
      <label v-if="!form.id" class="block">
        <span class="mx-2 block text-sm font-bold mb-2">Wallet address</span>
        <input
          v-model="form.wallet" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
          @focus="inputFocus('wallet')"
          placeholder="Wallet Address">
        <span class="mx-2 block text-sm mb-2 mt-1" style="color: red" v-if="this.required.wallet">This wallet address is invalid!</span>

      </label>
      <template v-else-if="!done">
        <div class="block ">
          <div class="flex items-center space-x-3">
            <div class="text-4xl bg-[#ACB9FF] p-1.5 w-12 h-12 rounded-full">🤨</div>
            <div class="flex-1">
              <h4 class="text-lg font-bold">{{ form.meta.name || "Unnamed" }}</h4>
              <p>{{ `${form.wallet.substr(0, 5)}...${form.wallet.substr(35, 42)}` }}</p>
            </div>
            <div class="border rounded p-1 px-2 text-xs cursor-pointer">Edit</div>
          </div>
        </div>
        <label class="block">
          <span class="mx-2 block text-sm font-bold mb-2">Name <span style="color: red">*</span></span>
          <input
            v-model="form.meta.name" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
            @focus="inputFocus('name')"
          >
          <span class="mx-2 block text-sm mb-2" style="color: red"
                v-if="this.required.name">This field is required</span>
        </label>
        <label class="block">
          <span class="mx-2 block text-sm font-bold py-2">Manager Percentage <span style="color: red">*</span></span>
          <input
            v-model="form.earn_ratio" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl"
            min="1"
            max="100"
            @focus="inputFocus('manager')"

            type="number">
          <span class="mx-2 block text-sm mb-2" style="color: red"
                v-if="this.required.manager">This field is required</span>

        </label>
        <label class="block">
          <span class="mx-2 block text-sm font-bold mb-2">Scholar Percentage</span>
          <input
            class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl"
            :value="100-form.earn_ratio"
            disabled
            placeholder="This field is auto-calculated"
            type="number">
        </label>
        <label class="block">
          <span class="mx-2 block text-sm font-bold mb-2">Address</span>
          <input
            v-model="form.meta.address" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
          >
        </label>
        <label class="block">
          <span class="mx-2 block text-sm font-bold mb-2">Phone</span>
          <input
            v-model="form.meta.phone" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
          >
        </label>
        <label class="block">
          <span class="mx-2 block text-sm font-bold mb-2">Telegram</span>
          <input
            v-model="form.meta.telegram" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
          >
        </label>
        <label class="block">
          <span class="mx-2 block text-sm font-bold mb-2">Payout Address</span>
          <input v-model="form.meta.payout_address" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl">
        </label>
        <div class="block">
          <label>
            <span class="mx-2 block text-sm font-bold mb-2">Note</span>
          </label>
          <textarea v-model="form.meta.note" class="w-full p-1.5 px-4 border border-[#DDE0F7] rounded-xl"></textarea>
        </div>
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
      <div v-if="form.id && !done" class="border border-[#0F43F9] p-2 px-4 rounded-xl cursor-pointer" @click="skip">
        <span>Skip</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {cloneDeep} from "lodash";
import Web3 from "web3";

export default {
  name: "FormWatcher",
  data() {
    return {
      done: false,
      required: {
        name: false,
        manager: false,
        wallet: false
      },
      form: {
        id: null,
        wallet: null,
        address: null,
        meta: {
          name: null,
          phone: null,
          address: null,
          telegram: null,
          payout_address: null,
          note: null,
          color: null,
          character: null
        },
        earn_ratio: 0,
      }
    }
  },
  watch: {
    "form.earn_ratio"(val) {
      if (val > 100) this.form.earn_ratio = 100;
      this.form.scholar_ratio = 100 - this.form.earn_ratio;

    },
    "this.$store.state.config.modal"() {
      this.init()
    }
  },
  methods: {
    ...mapActions('config', ['fetchData']),
    inputFocus(t) {
      this.required[t] = false;
    },
    skip() {
      this.fetchData("dashboard", 1);
      this.$store.commit('config/SET_MODAL', null);
    },
    action() {
      if (!this.form.id) {
        if (!this.form.wallet) {
          return
        } else {
          this.form.wallet = this.form.wallet.replace("ronin:", "0x");
        }
        if (!Web3.utils.isAddress(this.form.wallet)) {
          this.required.wallet = true;

          return;
        }
        this.$axios.$post('/watch', {
          address: this.form.wallet,
          game: this.form.game
        }).then((res) => {
          this.form.id = res.id;
        })
      } else if (!this.done && this.form.id) {
        let checkFalse = false;
        if (!this.form.meta.name) {
          this.required.name = true;
          checkFalse = true;
        }
        if (!this.form.earn_ratio) {
          this.required.manager = true;
          checkFalse = true;
        }
        if(checkFalse) return
        this.$axios.$post('/save-watcher', {...this.form, earn_ratio: this.form.earn_ratio/100 }).then(() => {
          this.done = true;
        })
      } else {
        this.skip()
      }
    },
    init() {
      const data = this.$store.state.config.modal.data;
      if (data) {
        this.form.game = data.game.id;
        if (data.watcher) {
          this.form.id = data.watcher.id;
          this.form.earn_ratio = data.watcher.earn_ratio * 100;
          this.form.wallet = data.watcher.wallet;
          this.form.meta = data.watcher.meta ? cloneDeep(data.watcher.meta) : {
            name: null,
            phone: null,
            address: null,
            telegram: null,
            payout_address: null,
            note: null,
            color: null,
            character: null
          }
        }
      }
    }
  },
  created() {
    this.init()
  }
}
</script>

<style scoped>

</style>
