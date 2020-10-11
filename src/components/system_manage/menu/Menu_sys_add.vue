<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <!-- 面包屑 -->
    <el-form :model="info" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="info.pid" placeholder="请选择">
          <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
          <!-- getmenulist 获取到state里存放的的所有菜单数据（第一层） -->
          <el-option 
          v-for="item in getmenulist" 
          :key="item.id"
          :label="item.title" :value="item.id"
          >{{item.title}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="info.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="info.type==1" label="菜单图标" prop="icon">
        <el-input v-model="info.icon"></el-input>
      </el-form-item>
      <el-form-item v-else label="菜单地址" prop="url">
        <el-input v-model="info.url"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      tip: "添加",
      info: {
        title: "",
        pid: "",
        icon: "",
        type: 1,
        status: true,
        url: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          let url=this.$api.menuaddUrl;
          if(this.$route.params.id){
               url=this.$api.menueditUrl;
               data.id=Number(this.$route.params.id);
          }
          data.status = data.status ? 1 : 2;
          this.$axios.post(url, data).then((res) => {
            alert(res.data.msg);
            this.$router.push("/menu");
            
          });
        } else {
          console.log(res.data.msg);
          return false;
        }
      });
    },
  },
  computed:{
    ...mapGetters(['getmenulist'])
  },
  created(){
    let menuid = this.$route.params.id;
    if(menuid){
      this.tip='编辑';
      this.$axios.get(this.$api.menuinfoUrl,{params:{id:menuid}}).then(res=>{
        this.info=res.data.list;
        this.info.status=this.info.status==1?true:false;
      })
    }
  }
};
</script>