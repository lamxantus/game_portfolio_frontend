import Vue from "vue";

Vue.mixin({
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    shortAddress(address) {
      return `${address.substr(0, 5)}...${address.substr(35, 42)}`
    }
  }
});
