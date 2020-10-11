<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-row>
      <router-link to="/kill/add">
        <el-button type="primary">添加</el-button>
      </router-link>
    </el-row>
    <el-table :data="kill" border style="width: 100%">
      <el-table-column fixed prop="title" label="活动名称" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" width="70">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else effect="dark" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
      kill: [],
    };
  },
  methods: {
    change(ind) {
      this.$router.push("/kill/" + ind);
    },
    del(ind) {
      this.$confirm("此操作将永久删除该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(this.$api.seckdeleteUrl, { id: ind })
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
  created() {
    this.$axios.get(this.$api.secklistUrl).then((res) => {
      this.kill = res.data.list;
    });
  },
};
</script>