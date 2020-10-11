<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-row>
      <router-link to="/goodssize/add">
        <el-button type="primary">添加</el-button>
      </router-link>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="规格编号" width="150"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="150"></el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="300">
        <template slot-scope="items">
          <el-tag type="primary" plain v-for="(item,index) in items.row.attrs" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else effect="dark" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="245">
        <template slot-scope="item">
          <el-button type="primary" @click="change(item.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created(){
    let sizenum;
    this.$axios.get(this.$api.goodssizecountUrl).then(res=>{
      sizenum = res.data.list[0].total
      this.$axios.get(this.$api.goodssizelistUrl,{pramas:{size:sizenum,page:1}}).then(res=>{
        this.tableData = res.data.list;
        console.log(this.tableData);
      })
    })
  },
  methods:{
    change(ind){
      this.$router.push('/goodssize/'+ind)
    },
    del(ind){
      console.log(ind);
      this.$confirm("此操作将永久删除该规格, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(this.$api.goodssizedeleteUrl, { id: ind })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.tableData = res.data.list;
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  }
};
</script>
<style scoped>
  .el-tag{
    margin-right: 10px;
  }
</style>