<template>
  <div class="main-site">
    <p-header/>
    <nuxt/>
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
        href: 'https://fonts.googleapis.com/css?family=Space+Grotesk:wght@300;400;600'
      }
    ]
  }
}
</script>

<style>
.main-site {
  min-height: 100vh;
  font: 400 14px / 20px Space Grotesk;
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
  max-width: 1000px;
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
  quotes: "\201C""\201D""\2018""\2019";
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
