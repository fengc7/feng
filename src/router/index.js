import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Users from '../components/users.vue'
import Role from '../components/role.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'home',
    path: '/',
    // redirect:{name:'login'},
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: Users
    },{
      name:'role',
      path:'/role',
      component:Role
    }]
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  }
  ]
})
