<template>
  <div class="container my-10">
    <div class="mb-10 text-center w-3/5 mx-auto">
      <h1 class="text-6xl font-bold mb-6">Easily Track your GameFI Portfolio</h1>
      <p class="mb-8 text-sm text-gray-500">Enter your wallet address to start</p>
      <div class="mb-12">
        <div class="inline-flex items-center space-x-3">
          <label>
            <input class="p-1.5 px-2 border border-gray-200 rounded" type="text" placeholder="Wallet Address">
          </label>
          <button class="p-1.5 px-2 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] text-white rounded">Get Started</button>
        </div>
      </div>
      <nuxt-link class="text-sm inline-flex items-center space-x-2" to="/dashboard/0x9aF493BC3deFCe2933E8f08B4dB8E4BfD63e25b4">
        <span>View random wallet</span>
        <icon name="chv-right"></icon>
      </nuxt-link>
    </div>
    <div class="mb-10 grid grid-cols-3 gap-6">
      <div class="p-4 hover:bg-gray-100 duration-300">
        <div class="w-12 h-12 bg-[#0F43F9] mb-4 rounded"></div>
        <h3 class="mb-4 text-2xl font-bold">Easy tracking</h3>
        <p>a book or other written or printed work, regarded in terms of its content rather than its physical form.</p>
      </div>
      <div class="p-4 hover:bg-gray-100 duration-300">
        <div class="w-12 h-12 bg-[#0F43F9] mb-4 rounded"></div>
        <h3 class="mb-4 text-2xl font-bold">Full report</h3>
        <p>a book or other written or printed work, regarded in terms of its content rather than its physical form.</p>
      </div>
      <div class="p-4 hover:bg-gray-100 duration-300">
        <div class="w-12 h-12 bg-[#0F43F9] mb-4 rounded"></div>
        <h3 class="mb-4 text-2xl font-bold">Secure...</h3>
        <p>a book or other written or printed work, regarded in terms of its content rather than its physical form.</p>
      </div>
    </div>
    <div class="w-3/5 mx-auto flex space-x-4">
      <h2 class="w-2/3 text-xl">More than <span class="text-[#0F43F9]">150.000+</span> Gamefi player are using us</h2>
      <div class="flex items-center">
        <img class="-mr-6" src="/avatar.png" alt="">
        <img class="-mr-6" src="/avatar.png" alt="">
        <img class="-mr-6" src="/avatar.png" alt="">
        <img class="-mr-6" src="/avatar.png" alt="">
        <img class="-mr-6" src="/avatar.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageIndex"
}
</script>

<style scoped>

</style>
