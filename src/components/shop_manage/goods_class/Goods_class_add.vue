<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goodsclass' }">商品分类列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类{{tip}}页面</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="顶级分类" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="选择分类">
          <!-- <el-option label="请选择" value="shanghai"></el-option> -->
          <el-option
            v-for="item in getclasslist"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >{{item.catename}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="ruleForm.catename" placeholder="请输入"></el-input>
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
      filearr: [], //图片路径集合
      getclasslist: [], //获取到顶级列表的数据
      ruleForm: {
        catename: "",
        pid: "",
        status: true,
      },

      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      //点击添加/修改
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let uid = this.$route.params.id;
          let url = this.$api.cateaddUrl;
          if (uid) {
            url = this.$api.cateeditUrl;
            this.ruleForm.id = Number(uid);
          }
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          // data.img = this.img;
          data.status = data.status ? 1 : 2;
          // console.log(data);
          let from = new FormData();
          for (let i in data) {
            from.append(i, data[i]);
            // console.log(i,data[i]);
          }
          // console.log(from);
          if (this.img) {
            from.append("img", this.img);
          }
          this.$axios.post(url, from).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: this.tip + "成功!",
              });
              this.$router.push("/goodsclass");
            }
          });
        } else {
          return false;
        }
      });
    },
    changeimg(file) {
      this.img = file.raw;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  created() {
    let uid = this.$route.params.id;
    let url = this.$api.catelistUrl;
    this.$axios
      .get(this.$api.catelistUrl, { params: { istree: 1 } })
      .then((res) => {
        this.getclasslist = res.data.list;
      });
    if (uid) {
      this.tip = "编辑";
      url = this.$api.cateinfoUrl;
      this.$axios.get(url, { params: { id: uid } }).then((res) => {
        this.ruleForm = res.data.list;
        this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
        this.filearr = [{ url: this.$api.caseUrl + this.ruleForm.img }];
      });
    }
  },
};
</script>
