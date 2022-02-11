<template>
  <div class="">
    <div class="mb-6">
      <h4 class="font-bold text-lg">You have 25 NFTs</h4>
      <p class="text-gray-500">Whose total value is 29,309$</p>
    </div>
    <n-f-t-s class="mb-6" :id="1"/>
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
