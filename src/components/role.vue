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
     <!-- table -->
      <el-table :data="roles" style="width: 100%">
      <el-table-column type="expand" width="60">
          <template slot-scope="right">
              <div>
                  
              </div>
          </template>
      </el-table-column>
       <el-table-column type="index" prop="id" label="#" width="60">
       </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色权限" width="180">
      </el-table-column>
      <el-table-column  label="操作">
          <template slot-scope="scope">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle ></el-button>
            <el-button type="success" icon="el-icon-check" circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            roles:[],
            form:{
                
            }
        }
    },
    created(){
       this.getRole()
    },
 methods: {
   async getRole(){
        const res = await this.$http.get(`roles`)
        console.log(res)
    }
},
}
</script>

<style>

</style>
