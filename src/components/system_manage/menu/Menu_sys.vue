<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑 -->
    <hr />
    <el-button type="primary" @click="add()">添加</el-button>
    <el-table
      :data="menus"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="icon" label="菜单图标"></el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else effect="dark" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="item">
          <el-button type="primary" @click="change(item.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      menus: [],
    };
  },
  methods: {
      ...mapActions(['menuAsyncAdd']),
    add() {
      this.$router.push("/menu/add");
    },
    change(ind) {
      this.$router.push("/menu/" + ind);
    },
    del(ind) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.post(this.$api.menudeleteUrl, { id:ind }).
          then((res) => {
              console.log(res,ind);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.menus = res.data.list;
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
      this.menuAsyncAdd().then(res=>{
          this.menus = res.data.list;
      })
  },
};
</script>