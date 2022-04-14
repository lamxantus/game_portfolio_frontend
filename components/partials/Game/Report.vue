<template>
  <div v-if="value && value.meta" class="mb-6">
    <div class="mb-4">
      <div class="flex items-center justify-between  mb-3">
        <div class="flex items-center space-x-2">
          <div class="rounded-full w-8 h-8 shadow-lg bg-white p-2">
            <img src="/icon/game.png" alt="">
          </div>
          <h2 class="font-bold text-lg">{{ value.title }}</h2>
        </div>
        <div>
          <select id="select-options" @change="onSelectedItem">
            <option value="options" selected disabled>Options</option>
            <option value="add_wallet">Add wallet</option>
            <option value="import_data">Import Data</option>
            <option value="export_data">Export Data</option>
          </select>
        </div>
      </div>
    </div>
    <div class="md:flex rounded-xl bg-white hover:shadow-xl duration-300 overflow-hidden">
      <div class="md:w-1/4">
        <div class="quick-report">
          <div class="bg" :style="{backgroundImage: `url(/bg/${value.id_string}.png)`}"></div>
          <div class="absolute top-0 left-0 right-0 bottom-0 p-4 flex flex-col">
            <div class="flex-1 flex justify-center items-center">
              <img class="w-1/2 mx-auto" :src="`/logo/${value.id_string}.png`" alt="">
            </div>
            <div class="text-sm">
              <div class="shadow bg-white rounded-lg">
                <div class="p-3 flex justify-between">
                  <div>
                    <span class="text-[#0F43F9]">Earning</span>
                    <div class="font-bold">{{ value.meta['token_in_game'] }}</div>
                  </div>
                  <div>
                    <h4 class="font-extrabold text-2xl mt-2">{{ analytic.earning.toLocaleString() }}</h4>
                    <span class="text-gray-500">{{ (priceRate * analytic.earning).toLocaleString() }}$</span>
                  </div>
                </div>
                <hr>
                <div class="p-3 space-y-2">
                  <div class="flex justify-between text-gray-500">
                    <span>Manager</span>
                    <div class="space-y-2 text-right text-xs">
                      <div class="text-black font-bold">{{ analytic.manager.toLocaleString() }}
                        {{ value.meta['token_in_game'] }}
                      </div>
                      <span>${{ (priceRate * analytic.manager).toLocaleString() }}</span>
                    </div>
                  </div>
                  <div class="flex justify-between text-gray-500">
                    <span>Scholar</span>
                    <div class="space-y-2 text-right text-xs">
                      <div class="text-black font-bold">{{ analytic.scholar.toLocaleString() }}
                        {{ value.meta['token_in_game'] }}
                      </div>
                      <span>${{ (priceRate * analytic.scholar).toLocaleString() }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white flex-1 p-4 pt-0" style="position: relative; height: 250px; overflow-y: auto">
        <table class="w-full table-auto text-sm table-game">
          <thead>
          <tr class="text-black font-bold uppercase text-xs leading-normal rounded">
            <th class="py-3 px-4 text-left">Name</th>
            <th class="py-3 px-4 text-left">
              <div>
                <b>Scholar</b>
                <span v-if="value.meta" class="text-gray-400 capitalize">{{ value.meta.token_in_game }}</span>
              </div>
            </th>
            <th class="py-3 px-4 text-left">
              <div>
                <b>Manager</b>
                <span v-if="value.meta" class="text-gray-400 capitalize">{{ value.meta.token_in_game }}</span>
              </div>
            </th>
            <th class="py-3 px-4 text-left">
              <div>
                <b>Share</b>
                <span class="text-gray-400 capitalize">Of Manager</span>
              </div>
            </th>
            <th class="py-3 px-4 text-left hidden md:table-cell">Elo</th>
            <th class="py-3 px-4 text-left hidden md:table-cell">Win Rate</th>
            <th class="py-3 px-4 text-right">NFTs</th>
          </tr>
          </thead>
          <tbody>
          <template>
            <tr v-for="(item, i) in value.wallets" :key="i" class="has-remove">
              <td class="py-3 px-4 text-left">
                <nuxt-link class="text-[#0F43F9]" :to="`/dashboard/${item.address}?game=${value.id}`">
                  {{ shortAddress(`${item.watcher.meta ? item.watcher.meta.name : 'Unnamed'}`) }}
                </nuxt-link>
              </td>
              <td class="py-3 px-4 text-left">{{
                  (item.totalEarning * (1 - (item.earn_ratio <= 1 ? item.earn_ratio : item.earn_ratio / 100))).toLocaleString()

                }}
              </td>
              <td class="py-3 px-4 text-left">{{
                  (item.totalEarning * (item.earn_ratio <= 1 ? item.earn_ratio : item.earn_ratio / 100)).toLocaleString()

                }}
              </td>
              <td class="py-3 px-4 text-left">
                {{ Math.round((item.earn_ratio <= 1 ? item.earn_ratio : item.earn_ratio / 100) * 100) }}%
              </td>
              <td class="py-3 px-4 text-left hidden md:table-cell">{{ item.elo.toLocaleString() }}</td>
              <td class="py-3 px-4 text-left hidden md:table-cell">{{
                  (item.game_result.results * 100).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                }}%
              </td>
              <td class="py-3 px-4 text-right">
                <span>{{ item.totalNFT }}</span>
                <div class="remove" @click="removeWatcher(item.watcher.id)">
                  <icon class="sm" fill="#FFF" name="remove"></icon>
                </div>
              </td>
            </tr>
          </template>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "GameReport",
  props: {
    value: {
      default: null
    }
  },
  computed: {
    wallets() {
      return this.$store.state.config.dashboard.filter(x => x.game === this.value.id_string);
    },
    analytic() {
      let earning = 0;
      let unclaimed = 0;
      let totalNFT = 0;
      let manager = 0;
      if (this.wallets) {
        this.wallets.forEach(item => {
          manager = manager + item.totalEarning * (1 - (item.earn_ratio || 1))
          earning = +item.totalEarning + +earning;
          unclaimed = +item.todayEarning + +unclaimed;
          totalNFT = totalNFT + item.totalNFT;
        })
      }
      return {
        earning,
        unclaimed,
        totalNFT,
        roi: 0,
        manager,
        scholar: earning - manager
      }
    },
    priceRate() {
      const obj = this.$store.getters["config/getPriceRate"](this.value.meta["token_in_game"])
      if (obj) {
        return obj.price
      }
      return 0
    }
  },
  methods: {
    ...mapActions('config', ['removeWatcher']),
    openForm() {
      this.$store.commit('config/SET_MODAL', {
        type: "add_wallet",
        data: {
          game: this.value
        }
      })
    },
    openFormImport() {
      this.$store.commit('config/SET_MODAL', {
        type: "form_import",
        data: {
          game: this.value
        }
      })
    },
    openFormExport() {
      const headers = ['Name', 'Scholar Address', 'Scholar SLP', 'Manager SLP', 'Manager Share', 'ELO', 'Win Rate', 'NFTs']
      const finalData = [];
      this.$axios.$get(`/v2/move?game=${this.value.id}`, ).then((res) => {
        res.forEach((item, index) => {
          const arrayData = [item.meta ? item.meta.name : 'Unnamed', item.wallet, item.earn_scholar, item.earn_manager, `${Math.round((1 - (item.earn_ratio <= 1 ? item.earn_ratio : item.earn_ratio / 100))*100)}%`, item.elo,`${ Math.round(item.win_rate * 100*100)/100}%`, item.totalNFT || 0];
          finalData.push(arrayData.join(','));
        });
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += headers.join(',');
        csvContent += '\n';
        csvContent += finalData.join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "tracker.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
        setTimeout(() => {
          document.body.removeChild(link)
        }, 100)
      })


    },
    onSelectedItem(event) {
      const selectItem = event.target.value;
      if (selectItem === 'add_wallet') this.openForm();
      if (selectItem === 'import_data') this.openFormImport();
      if (selectItem === 'export_data') this.openFormExport();
      event.target.value = "options"
    }
  }
}
</script>

<style scoped>
.quick-report {
  @apply relative overflow-hidden;
  padding-top: 130%;
}

#select-options {
  @apply py-2 px-4 text-xs;
  background: none;
  border: 1px solid #ACB9FF;
  border-radius: 20px;
  color: #ACB9FF;
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari and Chrome */
  appearance:none;
  background-image: url("/icon/icon-dropdown.svg");
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: 1.5em auto, 100%;
}

.quick-report .bg {
  @apply absolute top-0 left-0 bottom-0 right-0;
  background-position: center;
  background-size: cover;
  filter: blur(3px);
}

.table-game {
  /*display: block;*/
}

.table-game thead {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
}

</style>
