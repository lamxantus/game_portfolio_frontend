<template>
  <div>
    <div class="container py-6 mt-6 border-t border-[#ACB9FF20] text-sm">
      <div class="flex justify-between items-center">
        <div class="w-full mb-6 md:inline-flex items-center space-y-2 md:space-y-0">
          <span class="text-lg font-bold mr-4">Keep in touch</span>
          <label class="mr-4">
            <input
              class="p-1.5 px-4 border border-[#DDE0F7] rounded-xl" type="text"
              placeholder="Your email address">
          </label>
          <button
            class="p-1.5 px-4 flex space-x-2 items-center cursor-pointer bg-[#0F43F9] text-white rounded-xl"
          >View</button>
        </div>
        <div class="flex items-center space-x-4">
          <a class="p-1.5 bg-[#0F43F9] rounded-full" href="">
            <icon name="tw" fill="#FFF"></icon>
          </a>
          <a class="p-1.5 bg-[#0F43F9] rounded-full" href="">
            <icon name="tl" fill="#FFF"></icon>
          </a>
          <a class="p-1.5 bg-[#0F43F9] rounded-full" href="">
            <icon name="fb" fill="#FFF"></icon>
          </a>
        </div>
      </div>
      <div class="flex justify-between">
        <p class="text-[#808080]">© 2022 Copyright by Xantus, .JSC. All rights reserved</p>
        <div class="flex space-x-6 text-[#0F43F9]">
          <a href="">White paper</a>
          <a href="">Terms & Conditions</a>
          <a href="">Privacy Policies</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PFooter"
}
</script>

<style scoped>

</style>
