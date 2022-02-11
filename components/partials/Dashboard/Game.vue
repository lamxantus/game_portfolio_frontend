<template>
  <div class="">
    <div class="mb-4">
      <h4 class="font-bold text-lg">Hello Son,</h4>
      <p class="text-gray-500">Next claimed is about 3 days. Here is sumary of your porfolio</p>
    </div>
    <n-f-t-s :id="1"/>
  </div>
</template>

<script>
import NFTS from "../Game/NFTS";

export default {
  name: "Game",
  components: {NFTS}

}
</script>

<style scoped>

</style>
