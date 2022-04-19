import Vue from "vue";
import Web3 from "web3";

Vue.mixin({
  computed: {
    user() {
      return this.$store.state.w3_auth.user;
    },
  },
  methods: {
    shortAddress(address) {
      return `${address.substr(0, 5)}...${address.substr(35, 42)}`
    },
    toBN(str) {
      return Math.round(str * 100)
    },
    nFormatter(num, digits = 3) {
      const lookup = [
        {value: 1, symbol: ""},
        {value: 1e3, symbol: "k"},
        {value: 1e6, symbol: "M"},
        {value: 1e9, symbol: "G"},
        {value: 1e12, symbol: "T"},
        {value: 1e15, symbol: "P"},
        {value: 1e18, symbol: "E"}
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      const item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
      });
      return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    },
    pFormatter(num) {
      if (num < 0.001) {
        return `${num.toExponential(3)}`
      } else {
        return new Intl.NumberFormat(
          'en-US',
          {style: 'currency', currency: 'USD', maximumSignificantDigits: 4}
        ).format(num)
      }
    },
    oFormatter(num) {
      if (!num && num !== 0) {
        num = 0
      }
      return num.toLocaleString()
    }
  }
});
