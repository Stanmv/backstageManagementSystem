<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/goodsmanage'}">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="ruleForm.first_cateid" placeholder="选择分类" @change="catechange">
          <el-option
            v-for="item in firstarr"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >{{item.catename}}</el-option>
          <!-- 插入顶级列表内容 -->
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="ruleForm.second_cateid" placeholder="选择分类">
          <el-option label="请选择" value="nothing"></el-option>
          <el-option
            v-for="item in secondarr"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >{{item.catename}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model="ruleForm.market_price" placeholder="请输入*市场*价格"></el-input>
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

      <el-form-item label="商品规格">
        <el-select v-model="ruleForm.specsid" placeholder="请选择规格类型" @change="sizechange">
          <el-option
            v-for="item in sizelist"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格属性">
        <template>
          <el-select v-model="ruleForm.specsattr" multiple placeholder="请选择">
            <el-option v-for="(item,index) in sizelist2" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </template>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item label="是否新品">
        <template>
          <el-radio v-model="ruleForm.isnew" label="1">是</el-radio>
          <el-radio v-model="ruleForm.isnew" label="2">否</el-radio>
        </template>
      </el-form-item>

      <el-form-item label="是否热卖">
        <template>
          <el-radio v-model="ruleForm.ishot" label="1">是</el-radio>
          <el-radio v-model="ruleForm.ishot" label="2">否</el-radio>
        </template>
      </el-form-item>

      <el-form-item label="商品描述">
        <div id="desc"></div>
        <!-- 富文本插入~~~~~ -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  data() {
    return {
      tip: "添加",
      dialogImageUrl: "",
      dialogVisible: false,
      img: "",
      editor: null,
      filearr: [], //图片文件
      firstarr: [], //一级下拉列表数据
      secondarr: [], //二级下拉列表数据
      getclasslist: [], //获取到顶级列表的数据
      sizelist: [], //规格一级列表
      sizelist2: [],
      ruleForm: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: "1",
        ishot: "1",
        status: true,
      },
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        first_cateid: [
          { required: true, message: "请选择商品一级类型", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择商品二级类型", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    //挂载阶段将富文本在页面中渲染
    this.editor = new E("#desc");
    this.editor.create();
  },
  methods: {
    catechange(vid) {
      //一级分类改变
      // this.ruleForm.first_cateid = vid;
      this.ruleForm.second_cateid = '';
      this.$axios
        .get(this.$api.catelistUrl, { params: { pid: vid } })
        .then((res) => {
          this.secondarr = res.data.list;
        });
    },
    sizechange(vid) {
      this.ruleForm.specsattr = "";
      this.sizelist.forEach((item) => {
        if (item.id == vid) {
          this.sizelist2 = item.attrs;
        }
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let uid = this.$route.params.id;
          let url = this.$api.goodsaddUrl;
          if (uid) {
            url = this.$api.goodseditUrl;
            this.ruleForm.id = Number(uid);
          }
          this.ruleForm.description = this.editor.txt.html();
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          data.status = data.status ? 1 : 2;
          data.isnew = Number(data.isnew);
          data.ishot = Number(data.ishot);
          let from = new FormData();
          for (let i in data) {
            from.append(i, data[i]);
          }
          if (this.img) {
            from.append("img", this.img);
          }
          this.$axios.post(url, from).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: this.tip + "成功!",
              });
              this.$router.push("/goodsmanage");
            } else {
              this.$message({
                type: "info",
                message: this.tip + "失败!",
              });
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
      .get(this.$api.catelistUrl, { params: { istree: 1, pid: 0 } })
      .then((res) => {
        this.firstarr = res.data.list;
      });
    let sizenum;
    this.$axios.get(this.$api.goodssizecountUrl).then((res) => {
      sizenum = res.data.list[0].total;
      this.$axios
        .get(this.$api.goodssizelistUrl, { pramas: { size: sizenum, page: 1 } })
        .then((res) => {
          this.sizelist = res.data.list;
        });
    });
    if (uid) {
      this.tip = "编辑";
      url = this.$api.goodsinfoUrl;
      this.$axios.get(url, { params: { id: uid } }).then((res) => {
        // console.log(res.data.list.specsid);
        let sss = res.data.list.specsid;
        this.ruleForm = res.data.list;
        this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
        this.filearr = [{ url: this.$api.caseUrl + this.ruleForm.img }];
        this.ruleForm.isnew = this.ruleForm.isnew == 1 ? "1" : "2";
        this.ruleForm.ishot = this.ruleForm.ishot == 1 ? "1" : "2";
        this.$axios
          .get(this.$api.catelistUrl, { params: { pid: this.ruleForm.first_cateid } })
          .then((res) => {
            this.secondarr = res.data.list;
            this.ruleForm.specsattr = res.data.list[0].catename;
          });

        let sizenum;
        this.$axios.get(this.$api.goodssizecountUrl).then((res) => {
          sizenum = res.data.list[0].total;
          this.$axios
            .get(this.$api.goodssizelistUrl, {
              pramas: { size: sizenum, page: 1 },
            })
            .then((res) => {
              this.sizelist = res.data.list;
              this.sizelist.forEach((item) => {
                if (item.id == sss) {
                  this.ruleForm.specsattr = item.attrs;
                }
              });
            });
        });

        // 富文本内容渲染
        this.editor.txt.html(this.ruleForm.description);
      });
    }
  },
};
</script>