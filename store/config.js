import Vue from 'vue';

const schemas = require("/plugins/schemas");

export default {
  namespaced: true,
  state: () => ({
    games: [
      {
        id: 1,
        title: "Axie Infinity",
        description: "Build up a collection and use them across an ever expanding universe of games! Axie Infinity uses cutting edge technology called Blockchain to reward players",
        image: "/axie.jpeg",
        bg: "/bg/axie_infinity.png",
        meta: {
          token_in_game: "SLP"
        }
      }
    ],
    dashboard: [],
    wallet: schemas.WALLET,
    modal: null,
    priceRates: [],
    activeGame: 0,
    ns: []
  }),
  mutations: {
    ["SET_GAMES"](state, payload) {
      state.games = payload;
    },
    ["SET_DATA"](state, {data, wallet}) {
      if (wallet === "dashboard") {
        Vue.set(state, "dashboard", data)
      } else {
        Vue.set(state, "wallet", data)
      }
    },
    ["SET_MODAL"](state, payload) {
      state.modal = payload;
    },
    ["SET_PRICE"](state, payload) {
      state.priceRates = payload;
    },
    ["PUSH_NOTIFY"](state, payload) {
      state.ns.unshift(payload)
    },
    ["REMOVE_NOTIFY"](state, index) {
      if (index) {
        state.ns.splice(index, 1)
      } else {
        state.ns.pop()
      }
    },
    ["REMOVE_WATCHER"](state, watcherId) {
      if (state.wallet.related.length) {
        const index = state.wallet.related.map(x => x.id).indexOf(watcherId);
        if (index >= 0) {
          state.wallet.related.splice(index, 1)
        }
      }
      for (let i = 0; i < state.dashboard.length; i++) {
        if (state.dashboard[i].wallets.length) {
          const index = state.dashboard[i].wallets.map(x => x.watcher.id).indexOf(watcherId)
          if (index >= 0) {
            state.dashboard[i].wallets.splice(index, 1)
          }
        }
      }
    }
  },
  actions: {
    async fetchData({commit, state}, wallet, game_id = 1) {
      wallet = wallet.replace("ronin:", "0x");
      const res = await this.$axios.$get(`/${wallet}`, {
        params: {
          game: game_id
        }
      });
      if (res) {
        commit("SET_DATA", {
          wallet: wallet,
          data: res
        })
      } else {
        commit("SET_DATA", {
          wallet: wallet,
          data: schemas.WALLET
        })
      }
    },
    removeWatcher({commit, state}, watcherId) {
      this.$axios.$delete('/watch', {
        params: {
          id: watcherId
        }
      }).then(() => {
        commit('REMOVE_WATCHER', watcherId)
        commit('REMOVE_NOTIFY', {
          msg: "Stopped watch a wallet!",
          type: "success"
        })
      }).catch(() => {
        commit('REMOVE_NOTIFY', {
          msg: "Something wrong!",
          type: "error"
        })
      })
    }
  },
  getters: {
    getPriceRate: (state) => (symbol) => {
      return state.priceRates.find(todo => todo.pair === `${symbol}/USDT`)
    },
    getCurrentPriceRate: (state) => {
      const currentToken = state.games[state.activeGame].meta.token_in_game;
      const price = state.priceRates.find(item => item.pair === `${currentToken}/USDT`);
      if (price) {
        return price.price
      }
      return 0
    }
  },
};
