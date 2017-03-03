import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '../components/Home'
import CreateGroup from '../components/CreateGroup'
//import ProfileRoutes from './profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/creategroup',
      name: 'CreateGroup',
      component: CreateGroup
    }
    //...ProfileRoutes
  ]
})
