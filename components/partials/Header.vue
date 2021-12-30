<template>
  <header>
    <div class="container">
      <div class="flex space-x-2 items-center">
        <div class="site-title" @click="$router.push('/')">
          <n-link class="bg-red-400 p-3 text-xs uppercase text-white font-bold my-2 rounded-sm shadow" to="/">GPortfolio
          </n-link>
        </div>
      </div>
      <div class="flex space-x-8 items-center">
        <div class="m-3 p-1.5 px-3 flex space-x-2 items-center cursor-pointer border border-stone-700 rounded-sm text-stone-400">
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
  @apply border-b border-neutral-800 shadow font-bold;
}

header .container {
  @apply flex justify-between space-x-8 px-6 md:px-0 h-14;
}

.site-title {
  @apply flex space-x-2;
}
</style>
