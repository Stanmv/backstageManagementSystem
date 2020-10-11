<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑 -->
    <hr />
    <el-button type="primary" @click="add()">添加</el-button>
    <el-table
      :data="admin"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="用户编号" width="100"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="roleid" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else effect="dark" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="300">
        <template slot-scope="item">
          <el-button type="primary" @click="change(item.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(item.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="numchange"
    ></el-pagination>
    <!-- :current-page="cp" -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      admin: [],
      size: 1, //
      page: 1,
      total: 0,
      // cp:1,
    };
  },
  methods: {
    ...mapActions(["adminAsyncAdd"]),
    add() {
      this.$router.push("/admin/add");
    },
    change(uid) {
      this.$router.push("/admin/" + uid);
    },
    del(ind) {
      this.$confirm("此操作将永久删除该成员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(this.$api.userdeleteUrl, { uid: ind })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });

                //  重新获取总数量   每页的条数   重新计算当前是第几页
                this.gettotal().then((res) => {
                  this.total = res.data.list[0].total;
                  this.page = Math.ceil(this.total / this.size);
                  this.gettotal().then((res) => {
                    this.total = res.data.list[0].total;
                  });
                  this.$axios
                    .get(this.$api.userlistUrl, {
                      params: {
                        size: this.size,
                        page: this.page,
                      },
                    })
                    .then((res) => {
                      this.admin = res.data.list;
                    });
                  this.adminAsyncAdd();
                });
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
    numchange(num) {
      this.$axios
        .get(this.$api.userlistUrl, {
          params: {
            size: this.size,
            page: num,
          },
        })
        .then((res) => {
          this.admin = res.data.list;
        });
    },
    gettotal() {
      return this.$axios.get(this.$api.usercountUrl);
    },
  },
  created() {
    this.gettotal().then((res) => {
      this.total = res.data.list[0].total;
    });
    this.$axios
      .get(this.$api.userlistUrl, {
        params: {
          size: this.size,
          page: this.page,
        },
      })
      .then((res) => {
        this.admin = res.data.list;
      });
    this.adminAsyncAdd();
  },
};
</script>