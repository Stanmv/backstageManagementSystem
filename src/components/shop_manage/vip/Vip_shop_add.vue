<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/vip' }">会员列表</el-breadcrumb-item>
      <el-breadcrumb-item>会员{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-form :model="vip" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="vip.phone"></el-input>
      </el-form-item>

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="vip.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="vip.password"></el-input>
        <br />此行留空则密码不修改
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="vip.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tip: "编辑",
      vip: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: true,
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入您喜欢的昵称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
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
          var data = JSON.parse(JSON.stringify(this.vip));
          data.status = data.status ? 1 : 2;
          this.$axios.post(this.$api.vipeditUrl, data).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.$router.push('/vip');
            }
          });
        } else {
          this.$message({
            type: "info",
            message: this.tip + "失败!",
          });
        }
      });
    },
  },
  created() {
    this.$axios
      .get(this.$api.vipinfoUrl, {
        params: {
          uid: this.$route.params.id,
        },
      })
      .then((res) => {
        console.log(res);
        this.vip = res.data.list;
        this.vip.status = this.vip.status == 1 ? true : false;
      });
  },
};
</script>