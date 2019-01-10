<template>
    <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3">
          <img src="@/assets/logo.png" alt>
        </el-col>
        <el-col :span="19">
          <h2 class="middle">电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href class="loginout" @click.prevent="handleLoginout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 导航 -->
        <el-menu router default-active="2" :unique-opened="true">
          <!-- 1 -->
           <el-submenu :index="''+item.order" v-for="(item,i) in menus" :key="item.id"> <!-- -->
            <template slot="title">
              <i class="el-icon-d-arrow-right"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item :index="item2.path" v-for="(item2 , i) in item.children" :key="item2.id">
              <i class="el-icon-location"></i>
              {{item2.authName}}
            </el-menu-item>
          </el-submenu>
          
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus:[],
      
    }
  },

  // 在组件渲染前，判断 if token 是否存在-> newVue之前
  // beforeCreate () {
  //   if (!localStorage.getItem('token')) {
  //     //  编程式导航回到登陆页
  //     this.$router.push({
  //       name: 'login'
  //     })
  //     this.$message.warning('请先登录')
  //   }
  // },
  created(){
   this.getmenus()
  },

  methods: {
      // 初始化左侧导航
      async getmenus(){
         const res = await this.$http.get("menus")
         console.log(res)
         this.menus = res.data.data

      },
     handleLoginout () {
      // 清除token
      localStorage.clear()

      // 编程式导航
      this.$router.push({
        name: 'login'
      })
      //
      this.$message.success('退出成功')
    }
  }
}
</script>

<style>
   .container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.middle {

  line-height: 60px;
  text-align: center;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>
