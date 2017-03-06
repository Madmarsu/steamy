import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '../components/Home'
import Login from '../components/login'
// import ProfileRoutes from './profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
        path: 'login',
        name: 'Login',
        component: Login
      }
      //,{
      //   path: 'sign-up',
      //   name: 'Sign Up',
      //   component: SignUp
      // }
      ]
    }
   // ...ProfileRoutes
  ]
})