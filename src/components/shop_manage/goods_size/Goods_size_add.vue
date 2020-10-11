<template>
  <div class="add">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goodssize' }">规格列表</el-breadcrumb-item>
      <el-breadcrumb-item>规格{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-form
      :model="goodssize"
      label-width="100px"
      class="demo-dynamic demo-ruleForm"
      :rules="rules"
      text-align="right"
      ref="ruleForm"
    >
      <el-form-item prop="specsname" label="规格名">
        <el-input v-model="goodssize.specsname"></el-input>
      </el-form-item>

      <el-form-item label="规格属性名" prop="sizeattr" v-for="(item,index) in arr" :key="index">
        <el-input v-model="item.value"></el-input>
        <el-button @click="add" v-if="index==0" type="primary">添加规格属性名</el-button>
        <el-button @click="del(index)" v-else type="danger">删除</el-button>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="goodssize.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button @click="submitForm('ruleForm')" type="primary">{{tip}}此规格及属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tip:'添加',
      goodssize: {
        specsname: "",
        attrs: "",
        status: true,
      },
      arr: [
        {
          value: "",
        },
      ],
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    add() {
      this.arr.push({
        value: this.attrs,
      });
      this.attrs = "";
    },
    del(i) {
      this.arr.splice(i, 1);
    },
    submitForm(formName) {
      // console.log(this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.$api.goodssizeaddUrl;
          var data = JSON.parse(JSON.stringify(this.goodssize));
          let uid = this.$route.params.id;
          let kong = [];
          data.status = data.status ? 1 : 2;
          this.arr.forEach((item) => {
            kong.push(item.value)
          });
          let b = kong.join(",");
          data.attrs = b;
          if(uid){
            url = this.$api.goodssizeeditUrl;
            data.id = Number(uid);
          }
          this.$axios.post(url,data).then(res=>{
            console.log(res);
            if(res.data.code==200){
              this.$message({
                type: "success",
                message: this.tip + "成功!",
              });
              this.$router.push('/goodssize');
            }
          })
        }
      });
    },
  },
  created(){
    let uid = this.$route.params.id;
    if(uid){
      this.tip = '编辑';
      this.$axios.get(this.$api.goodssizeinfoUrl,{params:{id:uid}}).then(res=>{
        this.goodssize = res.data.list[0];
        this.goodssize.status = this.goodssize.status==1?true:false;
        this.arr = [];
        this.goodssize.attrs.forEach(item=>{
          this.arr.push({value:item})
        })
      })
    }
  }
};
</script>
<style scoped>
.add >>> .el-form-item__content {
  display: flex;
}
.add >>> .el-form-item__content .el-input {
  flex: 1;
}
.add >>> .el-form-item__content .el-button {
  width: auto;
}
</style>