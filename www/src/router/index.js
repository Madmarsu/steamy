import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Search from '../components/Search'
import Connections from '../components/Connections'
// import ProfileRoutes from './profile'
import CreateGroup from '../components/CreateGroup'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
        path: 'login',
        name: 'Login',
        component: Login
      },{
        path: 'sign-up',
        name: 'Sign Up',
        component: SignUp
      }
      ]
    },
    {
      path: '/creategroup',
      name: 'CreateGroup',
      component: CreateGroup
    },
    {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/connections',
    name: 'connections',
    component: Connections
  }
  
    //profileroutes
  ]
})