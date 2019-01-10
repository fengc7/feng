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
        <el-input
         @clear = "showAll()"
         clearable v-model="query" placeholder="请输入内容"  class="input-with-select">
         <el-button slot="append" 
         @click="showUser"
         icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" @click="addUserName()">添加用户</el-button>
        </el-col>
    </el-row>

     <el-table class="table" overflow = "hidden" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="60">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"  width="150">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="150">
      </el-table-column>
      <el-table-column  label="创建日期" width="140">
        <template slot-scope="scope">
          {{scope.row.create_time | dayData}}
        </template>
      </el-table-column>
      <el-table-column  label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            @change="changeloads(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" circle @click="editUserName(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="showdeletedata(scope.row)"></el-button>
            <el-button type="success" icon="el-icon-check" @click="showEditRole(scope.row)"></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- @size-change 每页显示条数改变时
         @current-change 当前页码改变
         current-page当前页码
         page-sizes 控制每页显示条数所在的数组【】
         layout 分页组件的小功能
         total 数据总个数-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2,4,6,8]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10">
    </el-pagination>

<!-- 修改权限 -->
   <el-dialog title="" :visible.sync="centerDialogVisible">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
       {{currusername}}
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="currUserRoleId" placeholder="请选择活动区域">
        <el-option label="请选择" :value="-1"></el-option>
        <el-option  v-for="(v,i) in roles" :key="i"
        :label = "v.roleName" :value="v.id" > </el-option><!-- label是指需要的数据，要显示的数据
        v是对象。对象.属性前面需要加：，否“v.roleName”就是字符串 -->
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="showEditRoleID()">确 定</el-button>
  </div>
</el-dialog>
<!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
     <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
   </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
    <el-button type="primary" @click="AddUser()">确 定</el-button>
  </div>
 </el-dialog>


<!-- 修改用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleEdit">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
     <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
   </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
    <el-button type="primary" @click="EditUser()">确 定</el-button>
  </div>
 </el-dialog>
 </el-card>
</template>

<script>
export default {
  // data 是数据初始化
  data () {
    return {
      query: '',
      tableData: [],
      query: '',
      pagesize: 2,
      pagenum: 1,
      total:-1,
      form:{
        username:"",
        password :"",
        email:"",
        mobile:""
      },
      data:{

      },
      formLabelWidth:'100px',
      dialogFormVisibleAdd:false,
      dialogFormVisibleEdit:false,
      centerDialogVisible:false,
      roles:[],
      currUserRoleId:-1,
      currusername:"",
      currid:-1
    }
  },
  created () {
    // 页面加载，显示数据
    this.getTableData()
  },
  methods: {
    // 点击确定关闭修改权限
      async showEditRoleID(){
          // 页面中没有scope.row，就无法传值和 data中也没有声明用户的id
          // 想要使用id确定用户，只能在data中重新声明一个变量,当前的用户的id
         const res = await this.$http.put(`users/${this.currid}/role` , 
         {rid:this.currUserRoleId})
        //  console.log(res);
        //  this.currUserRoleId= res.data.rid
         this.centerDialogVisible = false
      },

      // 展示修改信息
      async showEditRole(user){
        console.log(user)
        this.currid = user.id
        this.currusername = user.username
        // this.currUserRoleId = user.role_name
         const res = await this.$http.get("roles")
         this.roles = res.data.data
          console.log(this.roles);
          
         const res2 = await this.$http.get(`users/${user.id}`)
          // rid = currUserRoleId
          const{meta:{msg:newMsg , status:newStatus}}=res2.data
          if(newStatus === 200){
             this.currUserRoleId = res2.data.data.rid
             
          }else{
            this.$message.warning(newMsg)
          }
        this.centerDialogVisible = true
         console.log(res2)
         console.log(this.roles);
         
        
      },


      // 状态栏展示修改
      async changeloads(user){
        const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
        console.log(res)
        const{meta:{msg,status}}= res.data
        if(status ===200){
          this.$message.success(msg);

        }
      }, 

      // 添加用户框，弹出
      addUserName(){ 
        //  清空数据
        this.form = {};
        this.dialogFormVisibleAdd = true
      },

    // 添加用户
    async AddUser(){
       
       const res = await this.$http.post("users" , this.form)
       
       const {meta:{msg , status}}=res.data
      //  console.log(msg)
       if(status === 201){
          // 关闭弹框
         this.dialogFormVisibleAdd = false 
         this.getTableData()
       }else{
         this.$message.warning(msg)
               //  刷新数据
        // this.getTableData()
       }
        this.getTableData()
    },

    // 点击清空时重新获取数据
    showAll(){
      this.getTableData()
    },

        //  搜索请求实现
    showUser(){
      this.pagenum = 1
       this.getTableData()
    },
    //  分页相关的方法
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagesize = val
        this.pagenum = 1
        this.getTableData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pagenum=val
        
        this.getTableData()
      },

    // 需要请求的数据
    // query 查询参数 可以为空
    // pagenum 当前页码 不能为空
    // pagesize 每页显示条数 不能为空

    async getTableData () {
      // 设置token=auth_token，以用来获取数据

      //  获取首屏数据
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // console.log(res)
            // 提取数据
      const{data:{data:{users,total},meta:{status,msg}}}=res
        // 如果状态对
        // console.log(res)
        if(status === 200){
          // 将数据渲染到页面,给表格数据赋值
          this.tableData = users
          this.total = total
          
        }
        this.$message.success(msg)
    }, 

    // 删除
     showdeletedata(value){
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          const res = await this.$http.delete(`users/${value.id}`)
          //  console.log(res)
           const {meta:{msg , status}}=res
           if(status === 200){
             this.pagenum = 1
             this.$message.success(msg);
           }
        }).catch(() => {
          this.$message.warning("取消删除");          
        });
     },
      // 更改
      async EditUser(){
       const res = await this.$http.put(`users/${this.form.id}` , {email:this.form.email,mobile:this.form.mobile})
      //  console.log(res)
       const {meta:{msg , status}}=res.data
      //  console.log(msg)
       if(status === 200){
          // 关闭弹框
         this.dialogFormVisibleEdit = false 
         this.$message.success(msg)
         this.getTableData()
       }else{
         this.$message.warning(msg)
               //  刷新数据
        this.getTableData()
       }
    },
     // 添加用户框，弹出
      editUserName(user){ 
        // console.log(user)
        this.form = user
        this.dialogFormVisibleEdit = true
      }

  }
}
</script>

<style>
.input-with-select{
  width: 400px;
}
.table{
  overflow: hidden;
}

</style>
