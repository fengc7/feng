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
      <el-table-column type="expand">
          <template slot-scope="right">
              <!-- 一级 -->
              <el-row class="row" v-for="item in right.row.children" :key="item.id">
                  <el-col :span="4">
                      <el-tag class="span" closable @close="deletehandle(right.row , item.id)">{{item.authName}}</el-tag>
                      <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="20">
                <!-- 二级 -->
                    <el-row v-for="item2 in item.children"  :key="item2.id">
                        <el-col :span="4" >
                            <el-tag class="span" closable @colse="deletehandle(right.row , item2.id)">{{item2.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <!-- 三级 -->
                        <el-col :span="20">
                            <el-tag class="span" closable @close="deletehandle(right.row , item3.id)" v-for="item3 in item2.children"  :key="item3.id">{{item3.authName}}</el-tag>
                        </el-col>
                    </el-row>
                    
                  </el-col>
              </el-row>

              <el-row v-if="right.row.children.length === 0">
                  <el-col><span>此角色没有分配权限</span></el-col>
              </el-row>
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
            <el-button type="success" icon="el-icon-check" circle @click="EditTreeMap(scope.row)"></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

<!-- 树状图弹出框 -->
<!-- data  数据 -->
<!-- show-checkbox  可选中项-->
<!-- node-key  每个节点唯一标识，来源于data中的key名 -->
<!-- default-expanded-keys  默认展开项-->
<!-- default-checked-keys 默认选中项-->
<!-- props 配置选项 其值要求是对象，内容是数据-->
     <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
       <el-tree
         ref="tree"
         :data="treeData"
         show-checkbox
         node-key="id"
         default-expand-all
         :default-checked-keys="expandedArr"
         :props="defaultProps">
       </el-tree>

       <div slot="footer" class="dialog-footer">
         <el-button @click="dialogTableVisible = false">取 消</el-button>
         <el-button type="primary" @click="showEdit()">确 定</el-button>
       </div>
     </el-dialog>

    </el-card>
</template>

<script>
export default {
    data() {
        return {
            roles:[],
            dialogTableVisible:false,
            treeData:[],
            defaultProps:{
            //   label 和children来源是树形结构绑定数据的key值
            //   label 是指文本信息
            //   children 是指树形结构的子节点
            label: "authName",
            children:"children"
            },
            expandedArr:[],
            currRoleId:-1
        }
    },
    created(){
       this.getRole()
    },
 methods: {
    //  确认修改
    async showEdit(){
    //   全选
    const arr1 = this.$refs.tree.getCheckedKeys()
    console.log(arr1);
    //   半选
    // this.$refs.tree在js中调用el-tree的getHalfCheckedKeys方法
    const arr2 = this.$refs.tree.getHalfCheckedKeys()
    console.log(arr2)
    // ES6 的展开操作运算符，合并[]内地的对象或数组，...是符号
    const arr = [...arr1 , ...arr2]
    console.log(arr)
    // {}内需要以，分割 的权限的值
    const res = await this.$http.post(`roles/${this.currRoleId}/rights`,{
      rids:arr.join(",")
       }) 
       this.dialogTableVisible = false
    //    console.log(res)
       this.getRole()
    },

    //  弹出树状图
    async EditTreeMap(rights){
        // console.log(rights)
        this.currRoleId = rights.id
        // 展示数据
        const res = await this.$http.get("rights/tree")
        // console.log(res);
        this.treeData = res.data.data
        // 选项默认打开
        // const mapArr = []
        // this.treeData.forEach((item)=>{
        //     // mapArr.push(item.id);
        //     item.children.forEach((item2)=>{
        //         // mapArr.push(item2.id);
        //         item2.children.forEach((item3)=>{
        //             mapArr.push(item3.id)
        //         })
        //     })
        // })
        // this.expandedArr = mapArr
        
        // 打开后选中项默认选中
        // 取出当前角色所拥有的权限
        const mapArr = []
        rights.children.forEach((item)=>{
            // mapArr.push(item.id);
            item.children.forEach((item2)=>{
                // mapArr.push(item2.id);
                item2.children.forEach((item3)=>{
                    mapArr.push(item3.id)
                })
            })
        })
        this.expandedArr = mapArr
        // console.log(mapArr);
       this.dialogTableVisible = true
    },
    //  树状图
    async treeMap(){
       const res = await this.$http.put()
    },
    //  删除权限
     async getRole(){
        const res = await this.$http.get("roles",this.form)
        // console.log(res)
        const treeData = res.data.data
        this.roles = res.data.data
    
     },
    //  初始化数据
    async deletehandle(user , roleId){
        const res = await this.$http.delete(`roles/${user.id}/rights/${roleId}`)
        // console.log(res)
        //   只更新当前角色的权限部分
        user.children = res.data.data
        //    刷新表格,更新
        //    this.getRole()
     }
},
}
</script>
  

<style>
.row{
    margin-bottom: 5px;
}
.span{
    margin-right: 0px;
}
</style>
