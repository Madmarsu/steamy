// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, 'https://multi-player.herokuapp.com')

Vue.config.productionTip = false

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  data: {
    store
  },
  methods: {
    loadNavBar() {
      $(".dropdown-button").dropdown();
    }
  },
  router,
  template: '<App/>',
  components: { App },
  watch: {
    '$route' (to, from) {
      // react to route changes...
      $(".dropdown-button").dropdown();
    }
  }
})

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
vue.loadNavBar()
router.beforeEach((to, from, next) => {
  console.log(to.name)
  if (from.name === "MyProfile" && to.name != "Logout" && !isEmpty(vue.$data.store.state.user) && !vue.$data.store.state.user.steamId) {
    Materialize.toast('Please link your Steam account to use the rest of the site!', 1000);
    next(false)
    return
  }
  next()
})