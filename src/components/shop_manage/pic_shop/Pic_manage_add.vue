<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/pic' }">轮播图列表</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="changeimg"
          :file-list="filearr"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
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
      dialogImageUrl: "",
      dialogVisible: false,
      tip: "添加",
      filelist: [],
      img: "",
      filearr: [],
      ruleForm: {
        title: "",
        status: true,
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleRemove(file, fileList) {
      //图片添加附带的不用管
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //图片添加附带的不用管
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeimg(file) {
      this.img = file.raw;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            let data = JSON.parse(JSON.stringify(this.ruleForm));
          let uid = this.$route.params.id;
          let url = this.$api.picaddUrl;
          if (uid) {
            url = this.$api.piceditUrl;
            data.id= Number(this.$route.params.id)
          }
          
          data.status = data.status ? 1 : 2;
          let from = new FormData();
          for (let i in data) {
            from.append(i, data[i]);
          }
          if (this.img) {
            from.append("img", this.img);
          }
          console.log(url);
          this.$axios.post(url, from).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: this.tip + "成功!",
              });
              this.$router.push('/pic');
            } else {
                this.$message({
                type: "info",
                message: res.data.msg,
              });
            }
          });
        }else{
            return false;
        }
      });
    },
  },
  created() {
    let uid = this.$route.params.id;
    if (uid) {
      this.tip = "修改";
      this.$axios
        .get(this.$api.picinfoUrl, { params: { id: uid } })
        .then((res) => {
          this.ruleForm = res.data.list;
          this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
          this.filearr = [{ url: this.$api.caseUrl + this.ruleForm.img }];
        });
    }
  },
};
</script>