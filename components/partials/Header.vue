<template>
  <header>
    <div class="container">
      <div class="flex space-x-2 items-center">
        <div class="site-title" @click="$router.push('/')">
          <n-link class="bg-[#0F43F9] p-3 text-xs uppercase text-white font-bold my-2 rounded-sm shadow" to="/">Xantus
          </n-link>
        </div>
      </div>
      <div class="flex space-x-8 items-center">
        <div class="m-3 p-1.5 px-2 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] rounded text-white">
          <icon class="md" name="user" fill="#d6d3d1"/>
          <span>Connect Wallet</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "PHeader"
}
</script>

<style>
header {
  @apply font-bold;
}

header .container {
  @apply flex justify-between space-x-8 px-6 md:px-0 h-14;
}

.site-title {
  @apply flex space-x-2;
}
</style>
