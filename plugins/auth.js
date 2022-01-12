const cookie_parser = process['server'] ? require('cookieparser') : undefined

export default function (context, inject) {
  const $auth = {}
  const logout = async () => {
    await setToken(null)
    await setUser(null)
  }
  const login = async (credential) => {
    let res = await context.$axios.$post('/auth/login/', credential).catch(e => {
      console.log(e);
    })
    if (res) {
      await setToken(res['token'])
      let user = await getUser()
      await setUser(user)
    }
  }
  const connectBlockchain = async (credential) => {
    let res = await context.$axios.$post('/auth/login/', credential).catch(e => {
      console.log(e);
    })
    if (res) {
      await setToken(res['token'])
      let user = await getUser()
      await setUser(user)
    }
  }
  const getUser = async () => {
    try {
      return await context.$axios.$get('/auth/me')
    } catch (e) {
      if (e.response && e.response.status === 401) {
        await logout()
      }
      return null
    }
  }
  const getToken = async () => {
    let token = null
    if (process['server'] && context.req.headers.cookie) {
      const parsed = cookie_parser.parse(context.req.headers.cookie)
      token = parsed['auth.token']
    } else {
      token = context.store.$ck.get('auth.token')
    }
    return token
  }
  const setToken = async (token) => {
    if (token) {
      context.$axios.setHeader('Authorization', 'JWT ' + token)
      context.store.$ck.set('auth.token', token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      })
    } else {
      context.$axios.setHeader('Authorization', undefined)
      context.store.$ck.remove('auth.token')
    }
    await context.store.commit('auth/SET_TOKEN', token);
  }
  const setUser = async (user) => {
    await context.store.commit('auth/SET_USER', user);
  }
  const init = async () => {
    let token = await getToken();
    await setToken(token);
    if (token) {
      let user = await getUser();
      await setUser(user);
    }
  }
  const bcConnect = async (token) => {
    await setToken(token)
    let user = await getUser()
    await setUser(user)
  }
  init().then(() => {});
  $auth.login = login;
  $auth.logout = logout;
  $auth.bcConnect = bcConnect;
  context.$auth = $auth;
  inject('auth', $auth);
}
