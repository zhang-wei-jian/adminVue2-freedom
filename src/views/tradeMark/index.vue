<template>
  <div>
   <el-card>
    <el-button>添加</el-button>
    <el-table
    :data="tardemarkList">
  <el-table-column label="ID" prop="id">

  </el-table-column>
  <el-table-column label="品牌名字" prop="tmName">

  </el-table-column>
  <el-table-column label="品牌LOGO">
<template slot-scope="{row}">
  <img :src="row.logoUrl" alt="" style="width:100px">
</template>
  </el-table-column>
  <el-table-column label="操作">
    <template slot-scope="{row}">
<el-button type="warning"> 修改</el-button>
<el-button type="danger" @click="getDeleteTradeMark(row.id)"> 删除</el-button>
</template>
  </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination 
  :total="total"
  :current="pageNo"
  :page-size="pageSize"
  :page-sizes="[5, 10, 20, 400]"
  @size-change="handleSizeChange"
   @current-change="handleCurrentChange"
  >

  </el-pagination>
   </el-card>
  </div>
</template>

<script>
import {reqTrademarkList,pageTardemarkList,reqDeleteTrademark} from '@/api/APItardemark'
 export default {
  name: "trademark",
  data() {
    return {
      pageNo:1,
      pageSize:5,
      total:0,
      tardemarkList:[]
    }
  },
  methods: {
    async getPageTrademarkList  (){
      //  请求匹配分页列表
     const res =await pageTardemarkList(this.pageNo,this.pageSize)
    this.total=res.total;
    this.pageNo = res.current;
    this.pageSize = res.pages;
    this.tardemarkList= res.records
    },
   async getDeleteTradeMark(id){
    //删除
      await reqDeleteTrademark(id)
      this.getTrademarkList()
    },
    handleCurrentChange(pageNo){
      // 点击页数current
      this.pageNo = pageNo
      this.getPageTrademarkList()
    },
    handleSizeChange(pageSize){
      console.log(pageSize);
    }
  },
  mounted() {
    // 请求分页品牌列表
    this.getPageTrademarkList()

 
    
  },
};
</script>

<style lang="less" scoped></style>
