<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框  -->
    <br>
    <el-row>
        <el-col>
        <el-input v-model="query" placeholder="请输入内容"  class="input-with-select">
         <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary">添加用户</el-button>
        </el-col>
    </el-row>

     <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="60">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"  width="150">
      </el-table-column>
      <el-table-column prop="modlie" label="电话" width="150">
      </el-table-column>
      <el-table-column  label="创建日期" width="120">
      </el-table-column>
      <el-table-column  label="用户状态" width="80">
      </el-table-column>
      <el-table-column  label="操作">
      </el-table-column>
    </el-table>

 </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      tableData: [],
      query: '',
      pagesize: '2',
      pagenum: '1'
    }
  },
  created () {
    // 页面加载，显示数据
    this.getTableData()
  },
  methods: {
    // 需要请求的数据
    // query 查询参数 可以为空
    // pagenum 当前页码 不能为空
    // pagesize 每页显示条数 不能为空

    async getTableData () {
      // 设置token=auth_token，以用来获取数据
      const AUTH_TOKEN = localStorage.getItem('token')
      //              设置请求头
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      //  获取首屏数据
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res)
            // 提取数据
      const{
        data:{
        data:{users,total},
        meta:{status,msg}
        }
        }=res
        // 如果状态对
        if(status === 200){
          // 将数据渲染到页面,给表格数据赋值
          this.tableData = users
        }
        this.$message.success(msg)
    }
  }
}
</script>

<style>
.input-with-select{
  width: 400px;
}
</style>
