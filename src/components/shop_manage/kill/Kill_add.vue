<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/kill' }">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-form
      :model="kill"
      label-width="100px"
      class="demo-dynamic demo-ruleForm"
      :rules="rules"
      text-align="right"
      ref="ruleForm"
    >
      <el-form-item prop="tittle" label="活动名">
        <el-input v-model="kill.title"></el-input>
      </el-form-item>

      <el-form-item prop="time" label="活动期限">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value1"
            value-format="timestamp"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timechange"
          ></el-date-picker>
        </div>
        <p>(当前若未在活动期限内，则无法启用)</p>
      </el-form-item>

      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="kill.first_cateid" placeholder="选择分类" @change="catechange">
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
        <el-select v-model="kill.second_cateid" placeholder="选择分类" @change="catechange2">
          <el-option label="请选择" value="nothing"></el-option>
          <el-option
            v-for="item in secondarr"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >{{item.catename}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品" prop="goodsid">
        <el-select v-model="kill.goodsid" placeholder="选择分类">
          <el-option label="请选择" value="nothing"></el-option>
          <el-option
            v-for="item in thirdarr"
            :key="item.id"
            :label="item.goodsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" width="200" prop="status">
        <el-switch v-model="kill.status"></el-switch>
        <p>(当前若未在活动期限内，则无法启用)</p>
      </el-form-item>

      <el-form-item>
        <el-button @click="submitForm('ruleForm')" type="primary">{{tip}}活动</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      firstarr: [], //一级下拉列表数据
      secondarr: [], //二级下拉列表数据
      thirdarr: [], //三级下拉列表数据
      kill: {
        status: true,
      },
      tip: "添加",
      //   value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value1: [],
      first_chose: "",
      second_chose: "",
      rules: {
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    catechange(vid) {
      this.$axios
        .get(this.$api.catelistUrl, { params: { pid: vid } })
        .then((res) => {
          this.secondarr = res.data.list;
        });
      this.first_chose = vid;
    },
    catechange2(vid) {
      let sizenum;
      this.$axios.get(this.$api.goodscountUrl).then((res) => {
        sizenum = res.data.list[0].total;
        this.$axios
          .get(this.$api.goodslistUrl, { pramas: { size: sizenum, page: 1 } })
          .then((res) => {
            // console.log(res.data.list);
            this.second_chose = vid;
            // console.log(this.first_chose,this.second_chose);
            this.thirdarr = [];
            res.data.list.forEach((item) => {
              if (
                item.first_cateid == this.first_chose &&
                item.second_cateid == this.second_chose
              ) {
                this.thirdarr.push(item);
              }
            });
          });
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let uid = this.$route.params.id;
        let url = this.$api.seckaddUrl;
        if (valid) {
          var data = JSON.parse(JSON.stringify(this.kill));
          var now = new Date().getTime();
          if (
            this.kill.status == true &&
            now > this.kill.begintime &&
            now < this.kill.endtime
          ) {
            data.status = 1;
          } else {
            data.status = 2;
          }
          if (uid) {
            url = this.$api.seckeditUrl;
            data.id = uid;
          }
          this.$axios.post(url, data).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: this.tip + "成功!",
              });
              this.$router.push("/kill");
            } else {
              this.$message({
                type: "info",
                message: res.data.msg,
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    timechange(tim) {
      //   console.log(Number(tim[0]));
      let killtime = tim[1] - tim[0]; //获取到选定的开始时间和结束时间:Sun Aug 23 2020 00:00:00 GMT+0800 (中国标准时间),可获取到相差的时间戳
      let date = new Date().getTime();
      this.kill.begintime = Number(tim[0]);
      this.kill.endtime = Number(tim[1]);
      //   console.log(date + (tim[1] - tim[0]));
    },
  },
  created() {
    let uid = this.$route.params.id;
    this.$axios
      .get(this.$api.catelistUrl, { params: { istree: 1, pid: 0 } })
      .then((res) => {
        this.firstarr = res.data.list;
      });
    if (uid) {
      this.tip = "编辑";
      this.$axios
        .get(this.$api.seckinfoUrl, { params: { id: uid } })
        .then((res) => {
          this.kill = res.data.list;
          this.value1 = [this.kill.begintime, this.kill.endtime];
          this.$axios
            .get(this.$api.catelistUrl, {
              params: { pid: this.kill.first_cateid },
            })
            .then((res) => {
              this.secondarr = res.data.list;
              console.log();
            });
          let sizenum;
          this.$axios.get(this.$api.goodscountUrl).then((res) => {
            sizenum = res.data.list[0].total;
            this.$axios
              .get(this.$api.goodslistUrl, {
                pramas: { size: sizenum, page: 1 },
              })
              .then((res) => {
                this.second_chose = this.kill.second_cateid;
                this.first_chose = this.kill.first_cateid;
                this.thirdarr = [];
                res.data.list.forEach((item) => {
                  if (
                    item.first_cateid == this.first_chose &&
                    item.second_cateid == this.second_chose
                  ) {
                    this.thirdarr.push(item);
                  }
                });
              });
          });
        });
    }
  },
};
</script>