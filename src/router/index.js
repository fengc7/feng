import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      name:'home',
      path:'/',
      redirect:{name:'login'}
  },
    {
      path: '/Login',
      name: 'login',
      component: Login
    }
  ]
})
