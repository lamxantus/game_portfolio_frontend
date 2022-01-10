<template>
  <header>
    <div class="wrapper" :class="{'container': !$route.path.includes('dashboard') || !user}">
      <div class="flex space-x-2 items-center">
        <div class="site-title" @click="$router.push('/')">
          <n-link class="bg-[#0F43F9] p-1.5 px-2 text-xs uppercase text-white font-bold my-2 rounded-sm shadow" to="/">
            Xantus
          </n-link>
        </div>
      </div>
      <div class="flex space-x-8 items-center">
        <div class="p-1.5 px-2 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] rounded-sm text-white" @click="logIn">
          <icon class="md" name="user" fill="#d6d3d1"/>
          <span>{{ user ? user.username : 'Connect Wallet' }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
const {mapActions} = require("vuex");
export default {
  name: "PHeader",
  methods: {
    ...mapActions("auth", ["logIn"])
  }
}
</script>

<style>
header {
  @apply font-bold relative z-10;
}

header .wrapper {
  @apply flex justify-between space-x-8 px-6 h-14 px-6;
}

header .wrapper.container {
  @apply md:px-0;
}

.site-title {
  @apply flex space-x-2;
}
</style>
