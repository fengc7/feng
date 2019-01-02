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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-d-arrow-right"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="mainuser">
              <i class="el-icon-location"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-d-arrow-right"></i>
              <span>权限管理</span>
            </template>

            <el-menu-item index="2-1">
              <i class="el-icon-location"></i>
              角色列表
            </el-menu-item>

            <el-menu-item index="2-2">
              <i class="el-icon-location"></i>
              权限列表
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-d-arrow-right"></i>
              <span>商品管理</span>
            </template>

            <el-menu-item index="3-1">
              <i class="el-icon-location"></i>
              商品列表
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-location"></i>
              分类参数
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-location"></i>
              商品分类
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-d-arrow-right"></i>
              <span>订单管理</span>
            </template>

            <el-menu-item index="4-1">
              <i class="el-icon-location"></i>
              订单列表
            </el-menu-item>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-d-arrow-right"></i>
              <span>数据统计</span>
            </template>

            <el-menu-item index="5-1">
              <i class="el-icon-location"></i>
              数据报表
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
  // 在组件渲染前，判断 if token 是否存在-> newVue之前
  beforeCreate() {
     if (!localStorage.getItem("token")) {
      //  编程式导航回到登陆页
         this.$router.push({
           name:'login'
         })  
         this.$message.warning("请先登录")
    }
  },
 
  methods:{

    handleLoginout(){
      // 清除token
      localStorage.clear();

      // 编程式导航
      this.$router.push({
        name:'login'
      })
      // 
      this.$message.success("退出成功")
    }
  }
};
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
