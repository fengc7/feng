<template>
    <el-card>
     <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
     
     <!-- 按钮 -->
     <br>
       <el-button @click="getRole()">添加角色</el-button>
     <br>
   <!-- 内容 -->
        <el-table :data="roles" border style="width: 100%">
       <el-table-column type="index" label="#" width="80">
       </el-table-column>
      <el-table-column prop="authName" label="权限" width="200">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="200">
      </el-table-column>
      <el-table-column prop="level" label="层级">
          <template slot-scope="scope">
              <div>
                <span v-if="scope.row.level === '0' ">一级</span>
                <span v-if="scope.row.level === '1' ">二级</span>
                <span v-if="scope.row.level === '2' ">三级</span>
              </div>
          </template>
      </el-table-column>
    </el-table>
    </el-card>
</template>

<script>
export default {
   data() {
     return {
       roles:[]
     }
   },
   created() {
     this.getloads()
   },
   methods: {
     async getloads(){
       const res = await this.$http.get("rights/list")
       console.log(res)
       this.roles = res.data.data

     },
     getRole(){

     }
   },
}
</script>

<style>

</style>
