import Web3 from "web3";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const wc_connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: QRCodeModal,
});
const W3 = new Web3(window.ethereum);

const CHAIN_MAPPING = {
  "56": "bsc_mainnet",
  "1": "eth_mainnet",
  "43114": "avax_mainnet",
  "250": "fantom_mainet",
  "137": "polygon_mainet",
}

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
    async logIn({commit, state}) {
      commit('config/SET_MODAL', {
        type: 'login'
      }, {root: true})
    },
    async login({commit, state}, type) {
      if (state.user) {
        await this.$router.push('/dashboard');
        return;
      }
      let account, chainId;
      if (window.ethereum && type === 'metamask') {
        if (!window.ethereum) {
          commit('config/SET_MODAL', {
            type: 'metamask_install'
          }, {root: true})
          return
        }
        await window.ethereum.enable().catch(() => {
        });
        const accounts = await W3.eth.getAccounts().catch(() => ([]));
        account = accounts.pop()
        chainId = await W3.eth.net.getId();
      } else if (type === 'walletconnect') {
        const res = await wc_connector.connect().catch(() => {
          return {
            accounts: [],
            chainId: null
          }
        });
        if (res.accounts.length) {
          account = res.accounts[0]
        }
        chainId = res.chainId;
      } else {
        const url = `https://accounts.google.com/o/oauth2/auth/identifier?protocol=oauth2&response_type=code&access_type&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.APP_URL}&scope=openid%20profile%20email&state=XmYy8FSl6Q&code_challenge_method&flowName=GeneralOAuthFlow`
        window.open(url, "_self")
      }
      if (!account) {
        return
      }
      if (!chainId || !CHAIN_MAPPING[chainId.toString()]) {
        return
      }
      if (account) {
        const chain_id = CHAIN_MAPPING[chainId.toString()];
        const message = `AUTHENTICATION_${(new Date()).getTime()}`;
        let signature;
        if (type === "metamask") {
          signature = await W3.eth.personal.sign(
            message,
            account,
            ''
          ).catch(() => null);
        } else {
          signature = await wc_connector.signPersonalMessage([account, message]).catch(() => null);
        }
        if (signature) {
          const res = await this.$axios.$post('/connect', {
            chain_id,
            message,
            signature: signature
          }).catch(() => {
            return null
          })
          if (res && res.address.toLowerCase() === account.toLowerCase()) {
            await this.$w3_auth.bcConnect(res.token);
            this.$gtm.push({ event: 'Connect_wallet' })
            await this.$router.push('/dashboard');
            commit('config/SET_MODAL', null, {root: true})
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
