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
        bg: "/bg/axs.png",
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
    }
  },
  actions: {
    async fetchData({commit, state}, wallet, game_id = 4) {
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
