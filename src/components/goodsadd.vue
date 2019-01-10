<template>
    <el-card>
                <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <!-- 消息提示 -->
  <el-alert
    title="添加商品信息"
    center
    type="warning"
    show-icon
    :closable="false">
  </el-alert>
<!-- 导航条 -->
    <el-steps class="steps" :space="200" :active="1*active" align-center="" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
<!-- 侧边栏 -->
<el-from :model="form" label-position="top" label-width = "80px">
    <el-tabs tab-position="left" v-model="active">
        <!-- 当选中某个tab时，v-model绑定的数据active 其值就是被选中的name值 -->
      <el-tab-pane name="1" label="基本信息">

          <!-- <el-form-item label="商品名称">
            <el-input ></el-input>
          </el-form-item>   

          <el-form-item label="商品价格">
            <el-input ></el-input>
          </el-form-item> 
          <el-form-item label="商品重量">
            <el-input ></el-input>
          </el-form-item> 
          <el-form-item label="商品数量">
            <el-input></el-input>
          </el-form-item> 
          <el-form-item label="商品分类">
            <el-input ></el-input>
          </el-form-item>   -->
      </el-tab-pane>
      <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </el-from>


    </el-card>
</template>

<script>
export default {
    data() {
        return {
            active:"1",
            form:{
               name 
            }
        }
    },
}
</script>

<style>
.steps{
    margin-top: 15px;
    margin-bottom: 30px 
}
</style>
