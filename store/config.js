import Vue from 'vue';
const schemas = require("/plugins/schemas");
export default {
  namespaced: true,
  state: () => ({
    games: [
      {
        id: 1,
        title: "StepHero",
        description: "step hero MULTIVERSE. The one-stop shop for P2E gamers which brings you extraordinary. gaming experience & lucrative earning opportunities.",
        image: "/stephero.jpeg"
      },
      {
        id: 2,
        title: "Axie Infinity",
        description: "Build up a collection and use them across an ever expanding universe of games! Axie Infinity uses cutting edge technology called Blockchain to reward players",
        image: "/axie.jpeg"
      }
    ],
    dashboard: schemas.DASHBOARD,
    wallet: schemas.WALLET
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
  },
  actions: {
    async fetchData({commit, state}, wallet) {
      wallet = wallet.replace("ronin:", "0x")
      const res = await this.$axios.$get(`/${wallet}`, {
        params: {
          game: 1
        }
      });
      if (res) {
        commit("SET_DATA", {
          wallet: wallet,
          data: res
        })
      }
    }
  },
  getters: {},
};
