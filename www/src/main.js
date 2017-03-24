// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, ':3000')

Vue.config.productionTip = false

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  data: {
    store
  },
  router,
  template: '<App/>',
  components: { App },
 })
router.beforeEach((to, from, next) => {
  if (from.name === "MyProfile" && !vue.$data.store.state.user.steamId) {
    next(false)
    return
  }
  next()
})