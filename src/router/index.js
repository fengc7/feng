import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import MainUser from '../components/main-user.vue'
 Vue.use(Router)

export default new Router({
  routes: [{
      name:'home',
      path:'/',
      // redirect:{name:'login'},
      component:Home,
      children:[{
          name:'MainUser',
          path:'/mainuser',
          component:MainUser
        }]
  },
    {
      path: '/Login',
      name: 'login',
      component: Login
    }
  ]
})
