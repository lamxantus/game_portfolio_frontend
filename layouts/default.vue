<template>
  <div class="main-site flex flex-col">
    <p-header/>
    <nuxt class="flex-1"/>
    <p-footer/>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
      }
    ]
  }
}
</script>

<style>
.main-site {
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .0179em;
}

.zoom-enter-active, .zoom-leave-active {
  transform: scale(1);
}

.zoom-enter, .zoom-leave-to /* .fade-leave-active below version 2.1.8 */
{
  transform: scale(.9);
}

::-webkit-scrollbar-track {
  border-radius: 0;
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #F0F0F0;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: #4cb8ae;
}

@media only screen and (min-width: 600px) {
}

.container {
  @apply mx-auto px-6 md:px-0;
  max-width: 1120px;
}

.container.sm {
  max-width: 800px;
}

td {
  vertical-align: middle;
}

blockquote {
  background: #f9f9f9;
  border-bottom: 2px solid #ccc;
  padding: 1px 10px 0 5px;
  quotes: "\201C" "\201D" "\2018" "\2019";
}

blockquote:before {
  color: #ccc;
  content: open-quote;
  line-height: 0.1em;
  margin-right: 0.125em;
  vertical-align: -0.1em;
}

blockquote p {
  display: inline;
}

.text-xxs {
  font-size: 11px;
}

.bg-blue {
  color: #FFF;
}
</style>
