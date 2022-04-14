import Vue from 'vue';

const schemas = require("/plugins/schemas");
const SAMPLE_RANDOM = [
  [
    "0x12006db683612a966a2b58e7ab48a9b26636e677",
    "0x0e807b442ac131747d84488a8adf0a4a3cbf10e5",
    "0x94a16076f7d2a9827f0f9f66330d81737dd40f14",
    "0x76e2d11a55e562ab8f71b8ed33bfac4e2a02e911",
    "0x363ee02a455dc8707ed68ee871849c2f30ac58a2",
    "0x8f59e0b2a466e184cf9d31a261b4bc3f83012e5b",
    "0x5f1a6637ac4b9ffc89b31f36d707b2687af9ad0d",
    "0xe7afdacbfc214c880e91d0f1622311a03d5201e7",
    "0xbedc85691d5b30dcba1dca84909e470abcee7155",
    "0x199a9b84aa0ebea2f8e37b7a95613a96d26dc4c2",
    "0x1455935b53256da47ec0269bb76d7fb77fff001c",
    "0x8703abfb1be0328cb39f59eaa7540344230c2df9",
    "0xa99d40e26941db858fb10c7ca2ac18afd76ddd2a",
    "0x314f67d76521856d99c335c2fec5590053785373",
    "0x037935db34323e00ec19270f4532cb6772ef1eef",
    "0xbc04b3d07659449441cf3a4a180e32397b8a0a0d",
    "0xbe3ab9df75a54d3f274ed27e92d5c15bc6412208",
    "0x0c3e80a7ebd41ac623c9ad92d838250c8dca8a74",
    "0x78d0d93cf7099528df338dd28a51c3e1d42db6d2",
    "0xade4a30e44ee1df7e50b7876fe4b547ecfddeacb",
    "0x2e56da8d5c805d1ba9a857b4ad68ad6cb96c833e",
    "0x9f2afe8035c7eca6b34cf1e3049f3eaa05fac57b",
    "0x9e5e76b90cc3fa028a7fdc207a03f1dd299bbf28",
    "0x53cff033b963e9176420556f122889be43592bc3",
    "0x7e4608064c66a94fd6e987346d9ac908b425ce58",
    "0xd433b64dea912f133594d184c4019326035704de"
  ],
  [
    "0xbA3cBfaea792690740a4AD13e3Ae1052045ca45e",
    "0x2828869900142857cb8981F2E2a834a86fC1627D",
    "0xd583EcC1Fd57d434e0a779C982670FC33bF5E064",
    "0xa250264Aa0923304516CC6d9C449423162A0C234",
    "0xaE0a27957f633eA3B35b953e27e22fa76427f61D",
    "0x3b752bd4232796d02939e9266A78511747861E0F",
    "0x5607A5ce5a3B5b1B10210EB91eeE59Dd5B90023C",
    "0x7704C7347A2e925d025408dbfa73D4014306bf2C",
    "0x70aA458Ea1eaa371D13b0170c32bd23506091621",
    "0x52F458642B20Acae8Cf8F2e993a543283A6D578B",
    "0xB2a21A470BeA410a52Fe1e198F9E2bE88BDD60f2",
    "0xFa66e1062c3Ec5cabC2885934B937E9060d47Ac3",
    "0x022eFAd4C18aE2D62C693DD8b8Aa3553Ec0e2A9A",
    "0xC50845b220F612505D0A9D248b5205064aD82807",
    "0xc5A1f1B26B9b94945081EBfBEfaa182878A5f241",
    "0x47bA7EE51CbF0606E21A917b5F2B61f4Ff28E4c4",
    "0x9064a7e88c575f0A6eeD338293372dCa37A71262",
    "0xdC216Abc8708F7B35F7D5b9c65a7451338814Ed7",
    "0x00BDaF14D8FfA5795a809bE4124B9BcC58A2ABe1",
    "0x987b6DaDda42A5b8cD4c0FC600b3d8e0f699aeEC",
    "0xEBbCA60e98ae467cb8C6fa8DD4FCA6f6B03ba736",
    "0x0069C32c9FEf1d905f374b314ABD26a676858120",
    "0x3836624F63fF41d34aa944e3b9dCb87E10fea626",
    "0x084786fC116e79f4DeB3B0280687260400125a50",
    "0x821c8B5dBa9c1e8b3B17Bd4A3497Fa3b8AE8C626",
    "0x8588E3D1dB5A12f9b2Ff450D3eE6dFaCd209e177",
    "0xE32351778C370537da2F2CF0D203ff8F4dd39007",
    "0x172482Ac50210314D399A76D7F335Fb69A631868",
    "0x0A76dFC1f0057AE7932B2d182dE11607855d1509",
    "0x534f03dF0e73022f45912E0442cA6D8D9f8b4A39",
    "0x7E0A8F9aeca79924aA10E46C0924DaC58a448dfe",
    "0x867F1Db082B1d2D802181CA6078b4111FfA2ff11",
    "0x7BE30D2457b9E463B8A43183c16E70D34F25811d",
    "0x5907048Ed4480E8E358612eA850dc3bD67f963Ed",
    "0xB2f09010F7FC438cF6330b33aC925103D7E7e70A",
    "0x66b279A073847948893f95413ab1A74c1e51b874",
    "0xBe0B768DDCa543505a8af2D8d6bB6029DE7F11dF",
    "0x18E10f83E1102639ef8A4185b30D5366A2252BE5",
    "0x0f9F8eFEC5ba2930d15359Ad8dfFCDa4eeBa590d",
    "0x5EB9DF642d44bf33071D3468629601009cF163e9",
    "0x84B6253d5Fa34468c9770d81B00BD9fBEB658F92",
    "0x5Bf651B72B139189a6227614B1294D1ECED14c83",
    "0x6993279243C809Bf30F0b5aa342604E112fB0904",
    "0x0ECE0708B9Bc60544Ee3Ba538A2FFA6De2129603",
    "0x22ce6978f103AA303ABF9A8bD56BcAefF11186f0",
    "0x6A182Dab760ed1117c646F17744Ba5EAdD0096fF",
    "0x55628b90831b5f8672dD7E7bB807b27976B20c5b",
    "0xE52ee249cA751F6B8a4b8eBB3352109D8BE88DE4",
    "0xCd1a7A9580675fB3556D01F54E626737f043f2e9",
    "0x1aa9e4d5F1a96F606A7240a441e284C6bc8D21F9"
  ]
]

export default {
  namespaced: true,
  state: () => ({
    games: {
      axie_infinity: {
        id: 1,
        title: "Axie Infinity",
        description: "Build up a collection and use them across an ever expanding universe of games! Axie Infinity uses cutting edge technology called Blockchain to reward players",
        meta: {
          token_in_game: "SLP"
        },
        id_string: "axie_infinity"
      },
      gunfire: {
        id: 2,
        title: "Gunfire Hero",
        description: "Gunfire Hero is the second blockchain game in the Step Hero Play-to-earn Multiverse.",
        meta: {
          token_in_game: "STEP"
        },
        id_string: "gunfire"
      }
    },
    dashboard: [],
    wallet: schemas.WALLET,
    modal: null,
    priceRates: [],
    activeGame: 'gunfire',
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
        Vue.set(state, "wallet", {
          ...state.wallet,
          ...data
        })
        state.activeGame = data.game
      }
    },
    ["SET_GAME_TX"](state, data) {
      Vue.set(state.wallet, "gameTX", data);
    },
    ["SET_GAME_RS"](state, data) {
      Vue.set(state.wallet, "win_rate", data);
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
    },
    ["SET_ACTIVE_GAME"](state, gameIndex) {
      state.activeGame = gameIndex;
    }
  },
  actions: {
    async fetchData({commit, state}, {wallet, game_id}) {
      if (wallet === "random") {
        const gi = Math.floor(Math.random() * 2)
        wallet = SAMPLE_RANDOM[gi][Math.floor(Math.random() * SAMPLE_RANDOM[gi].length)]
        await this.$router.replace(`/dashboard/${wallet}`);
        return
      }
      commit("SET_DATA", {
        wallet: wallet,
        data: wallet === "dashboard" ? [] : schemas.WALLET
      })
      wallet = wallet.replace("ronin:", "0x");
      const res = await this.$axios.$get(`/v2/${wallet}`, {
        params: {
          game: game_id
        }
      });
      if (res) {
        console.log(res);
        commit("SET_DATA", {
          wallet: wallet,
          data: res
        })
      }
    },
    async fetchGameTX({commit, state}, params) {
      const res = await this.$axios.$get('/v2/game-txs', {
        params: {
          ...params,
          page_size: 8
        }
      });
      commit('SET_GAME_TX', res);
    },
    async fetchGameRS({commit, state}, params) {
      const res = await this.$axios.$get('/game-result', {
        params: {
          ...params
        }
      });
      commit('SET_GAME_RS', res);
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
      const currentToken = state.games[state.activeGame || "gunfire"].meta.token_in_game;
      const price = state.priceRates.find(item => item.pair === `${currentToken}/USDT`);
      if (price) {
        return price.price
      }
      return 0
    }
  },
};
