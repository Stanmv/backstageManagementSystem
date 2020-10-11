<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-form :model="admin" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="admin.roleid" placeholder="请选择">
          <el-option label="请选择" :value="0">请选择</el-option>
          <!-- getmenulist 获取到state里存放的的所有菜单数据（第一层） -->
          <el-option
            v-for="item in getadminlist"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          >{{item.rolename}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="admin.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="admin.password"></el-input>
        <br />此行留空则密码不修改
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="admin.status"></el-switch>
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
      admin: {
        // rolename: "",
        roleid: "",
        password: "",
        status: true,
      },
      rules: {
        roleid: [
          { required: true, message: "选择管理员类型", trigger: "blur" },
        ],
        username: [
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
        label: "label",
      },
    };
  },
  computed: {
    ...mapGetters(["getadminlist"]),
  },
  created() {
    let uid = this.$route.params.id;
    if (uid) {
      this.tip = "编辑";
      this.$axios
        .get(this.$api.userinfoUrl, { params: { uid } })
        .then((res) => {
          this.admin = res.data.list;
          this.admin.status = this.admin.status == 1 ? true : false;
        });
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.admin));
          data.status = data.status ? 1 : 2;
          let url = this.$api.useraddUrl;
          if (this.$route.params.id) {
            url = this.$api.usereditUrl;
          }
          this.$axios.post(url, data).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: this.tip + "成功!",
              });
              this.$router.push('/admin');
            }
          });
        }
      });
    },
  },
};
</script>