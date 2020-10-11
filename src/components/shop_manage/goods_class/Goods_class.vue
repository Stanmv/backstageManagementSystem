<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-row>
      <router-link to="/goodsclass/add">
        <el-button type="primary">添加</el-button>
      </router-link>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="240"></el-table-column>
      <el-table-column prop="img" label="图片" width="240">
        <template slot-scope="item">
          <img :src="$api.caseUrl+item.row.img" alt width="100" v-if="item.row.img?true:false"/>
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
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.$axios
      .get(this.$api.catelistUrl, { params: { istree: 1 } })
      .then((res) => {
        // console.log(res);
        this.tableData = res.data.list;
      });
  },
  methods: {
    change(ind) {
      this.$router.push("/goodsclass/" + ind);
    },
    del(ind) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(this.$api.catedeleteUrl, { id: ind })
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
    },
  },
};
</script>
