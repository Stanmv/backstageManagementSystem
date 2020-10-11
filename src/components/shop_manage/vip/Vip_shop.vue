<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑 -->
    <hr />
    <el-table
      :data="vip"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="用户编号" width="100"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else effect="dark" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="300">
        <template slot-scope="item">
          <el-button type="primary" @click="change(item.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
    data(){
        return{
            vip:[],

        }
    },
    methods:{
        change(val){
            this.$router.push('/vip/'+val);
        }
    },
    created(){
        this.$axios.get(this.$api.viplistUrl).then(res=>{
            this.vip=res.data.list;
            
        })
    }
}
</script>