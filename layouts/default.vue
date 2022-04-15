<template>
  <div class="flex">
    <div v-if="user && $route.path !== '/'" class="sidebar">
      <div class="flex justify-center">
        <nuxt-link to="/">
          <img class="w-32" src="/logo/logo-black.svg" alt="Xantus Tracker">
        </nuxt-link>
      </div>
      <div class="flex-1 flex flex-col justify-center">
        <nuxt-link to="/dashboard" class="menu-item">
          <div>
            <icon name="home"></icon>
          </div>
          <div>Dashboard</div>
        </nuxt-link>
        <nuxt-link to="/dashboard/game" class="menu-item">
          <div>
            <icon name="target"></icon>
          </div>
          <div>NFTs</div>
        </nuxt-link>
        <nuxt-link v-if="false" to="/dashboard/scholarship" class="menu-item">
          <div>
            <icon name="user"></icon>
          </div>
          <div>Wallet Management</div>
        </nuxt-link>
      </div>
      <div>
        <div class="bg-[#0F43F9] rounded-xl p-6 py-16 text-center text-white space-y-2">
          <div>
            <img class="mx-auto" src="/icon/wallet.svg" alt="">
          </div>
          <h4 class="font-bold">Xantus Wallet</h4>
          <p>The wallet of people</p>
          <a v-if="false" class="inline-flex border text-white py-1.5 rounded-lg text-sm p-3 cursor-pointer">Read
            more</a>
          <span class="text-sm text-gray-400">Coming Soon</span>
        </div>
      </div>
    </div>
    <div class="flex-1 main-site flex flex-col">
      <p-header/>
      <nuxt class="flex-1"/>
      <p-footer/>
      <modal-adapter/>
      <div v-if="$store.state.config.ns.length" class="notification">
        <transition v-for="(n, index) in $store.state.config.ns" :key="index" name="fade">
          <div :class="`item ${n.type}`">
            <span class="text-sm">{{ n.msg }}</span>
            <icon
              class="cursor-pointer px-1 hover:bg-green-700"
              fill="#EEE"
              name="close"
              @click.native="$store.commit('config/REMOVE_NOTIFY', index)"
            />
          </div>
        </transition>
      </div>
    </div>
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
  },
  mounted() {
    window.addEventListener('mouseover', initLandbot, {once: true});
    window.addEventListener('touchstart', initLandbot, {once: true});
    let myLandbot;

    function initLandbot() {
      if (!myLandbot) {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.addEventListener('load', function () {
          myLandbot = new Landbot.Livechat({
            configUrl: 'https://chats.landbot.io/v3/H-1173931-TBVEOV2LJR3RTE0C/index.json',
          });
        });
        s.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      }
    }
  },
  created() {
    if (this.$route.query.code) {
      this.$axios.$post('/auth/google', {
        code: this.$route.query.code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.APP_URL,
        grant_type: 'authorization_code',
        callback: process.env.APP_URL
      }).then(res => {
        this.$w3_auth.bcConnect(res.token, res.user);
        this.$gtm.push({ event: 'Login_gmail' })
        this.$router.push('/dashboard');
      })
    }
  }
}
</script>

<style>
.main-site {
  height: 100vh;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .0179em;
  overflow-y: auto;
  background: #F7F8FF;
}

.sidebar {
  @apply bg-white h-screen hidden md:flex flex-col p-4 shadow;
  width: 240px;
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
  @apply mx-auto;
  max-width: 1010px;
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

.menu-item {
  @apply items-center py-2 p-4 duration-300 cursor-pointer flex space-x-4 rounded-xl mb-1;
}

.menu-item:hover,
.menu-item.nuxt-link-exact-active {
  background: #F6F8FF;
  color: #0F43F9;
}

.menu-item:hover svg,
.menu-item.nuxt-link-exact-active svg {
  fill: #0F43F9;
}

.chart-elm {
  @apply rounded-full text-sm flex flex-col justify-center items-end py-2 text-center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>
