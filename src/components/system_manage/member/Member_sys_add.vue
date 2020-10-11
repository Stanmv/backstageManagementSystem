<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/member' }">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>角色{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-form :model="info" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="info.rolename"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" prop="prop">
        <el-tree
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :default-checked-keys="defaultkeys"
          :props="defaultProps"
        ></el-tree>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tip: "添加",
      defaultkeys: [],
      info: {
        rolename: "",
        menus: "",
        status: true,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters(["getmenulist"]),
  },
  created() {
    this.$axios
      .get(this.$api.menulistUrl, { params: { istree: 1 } })
      .then((res) => {
        console.log(res.data.list);
        this.data = res.data.list;
        // console.log(this.data);
      });
    if (this.$route.params.id) {
      this.tip = "修改";
      // console.log(Number(this.$route.params.id));
      this.$axios.get(this.$api.memberinfoUrl,{params:{id:this.$route.params.id}}).then(res=>{
        this.info.rolename = res.data.list.rolename;
        this.info.menus = res.data.list.menus.split(',');
        this.info.status = res.data.list.status==1?true:false;
        this.defaultkeys = this.info.menus;
      })
    }
  },
  methods: {
    submitForm(formName) {
      //提交按钮
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.$api.memberUrl;
          let data = JSON.parse(JSON.stringify(this.info));
          data.status = data.status ? 1 : 2;
          if (this.$route.params.id) {
            url = this.$api.membereditUrl;
            data.id = this.$route.params.id;
          }
          // console.log(data, this.data);
          // console.log(this.$refs.tree.getCheckedKeys());//获取到的是已被选中的选项的id
          data.menus = this.$refs.tree.getCheckedKeys()?this.$refs.tree.getCheckedKeys().join(','):'';
          this.$axios.post(url, data).then(res=>{
            if (res.data.code == 200) {
              this.$router.push('/member');
            }else{
              alert(res.data.msg);
            }
          })
        }
      });
    },
  },
};
</script>