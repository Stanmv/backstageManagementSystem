<template>
  <div>
    <!-- model 绑定的数据 rules 验证规则 label-width 表单域标签的宽度 -->
    <el-form ref="ruleform" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleform')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // mapActions
    ...mapActions(["userinfoAsyncAdd"]),
    submitForm(formName) {
      //登录按钮
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userinfoAsyncAdd(this.form)
          .then(res=>{
            if(res.data.code==200){
              this.$router.push("/")
              console.log(res.data);
            }
          })

        }
      });
    },
  },
};
</script>
