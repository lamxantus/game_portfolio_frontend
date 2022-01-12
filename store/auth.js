import Web3 from "web3";

export default {
  namespaced: true,
  state: () => ({
    user: null,
    token: null,
    loggedIn: false,
    forceLogin: false,
  }),
  mutations: {
    ['SET_USER'](state, user) {
      state.user = user;
      state.loggedIn = !!user;
    },
    ['SET_TOKEN'](state, token) {
      state.token = token;
    },
    ['FORCE_LOGIN'](state) {
      state.forceLogin = !state.forceLogin;
    }
  },
  actions: {
    async logIn({commit, store}) {
      if (window.ethereum) {
        const W3 = new Web3(window.ethereum)
        await window.ethereum.enable();
        const account = (await W3.eth.getAccounts()).pop();
        if (account) {
          const chain_id = "eth_mainnet";
          const message = "KOIN_HUNT_AUTHENTICATION";
          const signature = await W3.eth.personal.sign(
            message,
            account,
            ''
          ).catch((e) => {
            return null
          });
          if (signature) {
            const res = await this.$axios.$post('/connect', {
              chain_id,
              message,
              signature: signature
            }).catch(() => {
              return null
            })
            if (res && res.address.toLowerCase() === account.toLowerCase()) {
              await this.$auth.bcConnect(res.token);
            }
          }
        }
      }
    }
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    getUserName: state => {
      return state.user ? `${state.user.username.substr(0, 5)}...${state.user.username.substr(35, 42)}` : 'Anonymous';
    },
  }
}
