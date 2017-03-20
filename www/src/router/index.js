import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Search from '../components/Search'
import Connections from '../components/Connections'
import MyProfile from '../components/profile/MyProfile'
import Profile from '../components/profile/Profile'
import CreateGroup from '../components/CreateGroup'
import Chat from '../components/Chat'
import Group from '../components/Group'

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
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: MyProfile
  },  
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/chat/:id',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/group/:id',
    name: 'Group',
    component: Group

  }
  ]
})