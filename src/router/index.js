import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Users from '../components/users.vue'
import Role from '../components/role.vue'
import Right from '../components/right.vue'
import Goodlist from '../components/goodlist.vue'
import Params from '../components/goodsparams.vue'
import Goodsadd from '../components/goodsadd.vue'

// 单独引入
import {Message} from 'element-ui'

Vue.use(Router)

const router = new Router({
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
      name:'roles',
      path:'/roles',
      component:Role
    },{
      name:'rights',
      path:'/rights',
      component:Right
    },{
      name:'goods',
      path:'/goods',
      component:Goodlist
    },{
      name:'params',
      path:'/params',
      component:Params
    },{
      name:'goodsadd',
      path:'/goodsadd',
      component:Goodsadd
    }]
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
  ]
})

// 路由守卫，执行之前拦截路由
// to 要去的路由配置
// from 当前的路由配置
// next 类型是方法，继续执行路由配置
router.beforeEach((to,from,next)=>{
  if(to.name === 'login'){
    next()
  }else{
    const token = localStorage.getItem('token')
    if(!token){
      router.push({
        name:'login'
      });
  Message.warning(msg)
    }else{
      next()
    }
  }
})

export default router