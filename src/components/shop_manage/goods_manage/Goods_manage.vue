<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-row>
      <router-link to="/goodsmanage/add">
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
      <el-table-column prop="id" label="商品编号" width="100"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="120"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="130"></el-table-column>
      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="item">
          <img :src="$api.caseUrl+item.row.img" alt width="100" v-if="item.row.img?true:false" />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" width="100">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.isnew==1">新品</el-tag>
          <el-tag v-else effect="dark" type="danger">非新品</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" width="100">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.ishot==1">热卖</el-tag>
          <el-tag v-else effect="dark" type="danger">非热卖</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else effect="dark" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="item">
          <el-button type="primary" @click="change(item.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(item.row.id)">删除</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      size: 2,
      page: 1,
      total: 0,
    };
  },
  created() {
    this.$axios.get(this.$api.goodscountUrl).then((res) => {
      // 获取到数据最大条数
      this.total = res.data.list[0].total;
    });
    this.$axios
      .get(this.$api.goodslistUrl, {
        params: { size: this.size, page: this.page },
      })
      .then((res) => {
        this.tableData = res.data.list;
        this.tableData.forEach((item) => {
          item.status = item.status == 1 ? true : false;
          item.ishot = item.ishot == 1 ? true : false;
          item.isnew = item.isnew == 1 ? true : false;
        });
        console.log(this.tableData);
      });
  },
  methods: {
    change(ind) {
      // console.log(ind);
      this.$router.push("/goodsmanage/" + ind);
    },
    del(ind) {//商品删除
      this.$confirm("此操作将永久删除该成员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(this.$api.goodsdeleteUrl, { id: uid })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.admin = res.data.list;
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
      this.page = num;
      this.$axios
        .get(this.$api.goodslistUrl, {
          params: {
            size: this.size,
            page: this.page,
          },
        })
        .then((res) => {
          this.tableData = res.data.list;
        });
    },
  },
};
</script>
<style>
img {
  width: 100px;
}
</style>