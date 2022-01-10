export default {
  namespaced: true,
  state: () => ({
    wallets: [],
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
    assets: [],
  }),
  mutations: {
    ["SET_GAMES"](state, payload) {
      state.games = payload;
    },
    ["SET_ASSETS"](state, payload) {
      state.assets = payload;
    },
    ["SET_WALLETS"](state, payload) {
      state.wallets = payload;
    },
    ["PUSH_WALLET"](state, payload) {
      state.wallets.unshift(payload);
    }
  },
  actions: {
    fetchAsset({state, commit}, input) {
      if (!state.wallets.map(x => x.address).includes(input)) {
        this.$axios.$get("/getAccountOverview", {
          params: {
            userAddress: input
          }
        }).then(res => {
          if (res) commit('PUSH_WALLET', res);
        })
        this.$axios.$get("/getAxies", {
          params: {
            userAddress: input
          }
        }).then(res => {
          if (res) {
            commit('SET_ASSETS', state.assets.concat(res.data.axies.results));
          }
        })
      }
    }
  },
  getters: {},
};
