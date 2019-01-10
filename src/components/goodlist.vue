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
       <el-row>
           <el-col>
           <el-input
            
            clearable v-model="query" placeholder="请输入内容"  class="input-with-select">
            <el-button slot="append" 
            
            icon="el-icon-search"></el-button>
           </el-input>
           <el-button @click="$router.push({name:'goodsadd'})" type="primary" >添加用户</el-button>
           </el-col>
       </el-row>
       <br>
      
      <el-table
      height="400px"
         :data="tableData"
         border
         style="width: 100%">
         <el-table-column
           type="index"
           label="#"
           width="60">
         </el-table-column>
         <el-table-column
           prop="goods_name"
           label="商品名称"
           width="500">
         </el-table-column>
         <el-table-column
           prop="goods_price"
           label="商品价格（元）"
           width="120">
         </el-table-column><el-table-column
           prop="goods_weight"
           label="商品重量"
           width="120">
         </el-table-column>
         <el-table-column
           prop="add_time"
           label="创建日期"
           width="120">
         </el-table-column>
         <el-table-column
           prop="address"
           label="操作">
         </el-table-column>
       </el-table>

       <!-- 分页 -->
       <div class="block">
         <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="pagenum"
           
           :page-size="10"
           layout="total, sizes, prev, pager, next, jumper"
           :total="total">
         </el-pagination>
       </div>
 
 </el-card>

</template>

<script>
export default {
     data() {
         return {
             query:"",
             tableData:[],
             query:"",
             pagesize: 10,
             pagenum: 1,
             total:0,
             
         }
     },
     created() {
        this.getGoods()
     },
     methods:{
        //  
        async getGoods(){
            const res = await this.$http.get(`goods/?pagesize=${this.pagesize}&pagenum=${this.pagenum}`)
            console.log(res)
            const{meta:{msg,status},data} = res.data
            // console.log(res.data)
            this.tableData = data.goods
            this.total = data.total
        },
        //  分页
         handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
     }
}

</script>

<style>
.input-with-select{
 width: 400px;
}
</style>
