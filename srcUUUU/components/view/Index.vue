<template>
  <div>
    <div class="titlebox">
      <div class="title">
        <img src="../../assets/images/logo-01.jpg" />
        <input type="text" placeholder="寻找商品" />
        <img src="../../assets/images/logo-02.jpg" />
      </div>
    </div>
    <!-- nav -->
    <nav>
      <div class="nav layout">
        <a class="one" href="#">推荐</a>
        <strong></strong>
        <div class="contentbox">
          <a href="#" v-for="item in arr" :key="item.id">{{item.catename}}</a>
        </div>
        <div class="right">
          <a href="#">
            <span class="iconfont">&#xe63c;</span>
          </a>
        </div>
      </div>
    </nav>
    <!-- banner -->
    <van-swipe class="my-swipe banner" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerarr" :key="item.id">
        <img :src="$api.caseUrl+item.img" alt />
      </van-swipe-item>
    </van-swipe>

    <ul class="content_01">
      <li>
        <img src="../../assets/images/logo-03.jpg" alt />
        <span>积分抢购</span>
      </li>
      <li>
        <img src="../../assets/images/logo-03.jpg" alt />
        <span>积分抢购</span>
      </li>
      <li>
        <img src="../../assets/images/logo-03.jpg" alt />
        <span>积分抢购</span>
      </li>
      <li>
        <img src="../../assets/images/logo-03.jpg" alt />
        <span>积分抢购</span>
      </li>
    </ul>
    <div class="content_02">
      <div class="left">
        <div class="top">
          <img src="../../assets/images/首页-(2)_16.jpg" />
          <p>每天零点场 好货秒不停</p>
          <div class="time">
            <span>{{hour}}</span> :
            <span>{{min}}</span> :
            <span>{{sec}}</span>
            <i>
              <img src="../../assets/images/首页-(2)_23.jpg" alt />
            </i>
          </div>
        </div>
        <div class="bottom">
          <img :src="$api.caseUrl+kill.img" alt />
        </div>
      </div>
      <div class="rightbox">
        <div class="right">
          <div class="one">
            <img src="../../assets/images/首页-(2)_18.jpg" />
            <p>每日9点 抢大牌</p>
            <img src="../../assets/images/首页-(2)_25.jpg" />
          </div>
          <div class="two">
            <img src="../../assets/images/首页-(2)_13.jpg" />
          </div>
        </div>
        <div class="down">
          <div class="left">
            <div class="title">
              <img src="../../assets/images/首页-(2)_30.jpg" />
              <i>只为你选好货</i>
            </div>
            <div class="picbox">
              <img src="../../assets/images/首页-(2)_30_40.jpg" />
            </div>
          </div>
          <div class="right">
            <div class="title">
              <img src="../../assets/images/首页-(2)_32.jpg" />
              <i>超级好价拼团</i>
            </div>
            <div class="picbox">
              <img src="../../assets/images/首页-(2)_30_43.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- banner2部分 -->
    <div class="picbox_01">
      <img src="../../assets/images/banner_03.jpg" />
    </div>
    <div class="content_03">
      <van-tabs type="card">
        <van-tab title="热门推荐">
          <div class="goods" v-for="item in hot" :key="item.id">
            <img :src="$api.caseUrl+item.img" />
            <div class="right">
              <p>{{item.goodsname}}</p>
              <i>
                <em>￥</em>
                {{item.price}}
              </i>
              <span>已售800件</span>
              <a href="#" @click="buy(item.id)">立即抢购</a>
            </div>
          </div>
        </van-tab>
        <van-tab title="全部商品">
          <div class="goods" v-for="item in all" :key="item.id">
            <img :src="$api.caseUrl+item.img" />
            <div class="right">
              <p>{{item.goodsname}}</p>
              <i>
                <em>￥</em>
                {{item.price}}
              </i>
              <span>已售800件</span>
              <a href="#" @click="buy(item.id)">立即抢购</a>
            </div>
          </div>
        </van-tab>
        <van-tab title="发现好货">
          <div class="goods" v-for="item in goods" :key="item.id">
            <img :src="$api.caseUrl+item.img" />
            <div class="right">
              <p>{{item.goodsname}}</p>
              <i>
                <em>￥</em>
                {{item.price}}
              </i>
              <span>已售800件</span>
              <a href="#" @click="buy(item.id)">立即抢购</a>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
// 引入数据请求的插件
import axios from "axios";
// 引入选项卡插件
import { Tab, Tabs } from "vant";
//引入倒计时插件
import { CountDown } from "vant";
export default {
  data() {
    return {
      arr: [],
      bannerarr: [],
      kill: [],
      goods: [],
      all: [],
      hot: [],
      time: 30 * 60 * 60 * 1000,
      hour: "",
      min: "",
      sec: "",
    };
  },
  methods: {
    getarr() {
      return axios.get("/api/api/getcate");
    },
    getbanner() {
      return axios.get("/api/api/getbanner");
    },
    getkill() {
      return axios.get("/api/api/getseckill");
    },
    getgoods() {
      return axios.get("/api/api/getindexgoods");
    },
    buy(id) {
      this.$axios.get(this.$api.itemmsgUrl + "?id=" + id).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.$router.push("/itemmsg" + "?id=" + id);
        }
      });
    },
  },
  created() {
    // console.log(this.$api.caseUrl+this.$api.goodsUrl);
    axios
      .all([this.getarr(), this.getbanner(), this.getkill(), this.getgoods()])
      .then(
        axios.spread((arr, brr, kill, goods) => {
          this.arr = arr.data.list;
          this.bannerarr = brr.data.list;
          this.hot = goods.data.list[0].content;
          this.all = goods.data.list[1].content;
          this.goods = goods.data.list[2].content;
          /* this.kill = kill.data.list[0];
          setInterval(() => {
            this.hour = parseInt(
              ((kill.data.list[0].endtime - new Date().getTime()) %
                (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );
            this.min = parseInt(
              ((kill.data.list[0].endtime - new Date().getTime()) %
                (1000 * 60 * 60)) /
                (1000 * 60)
            );
            this.sec = parseInt(
              ((kill.data.list[0].endtime - new Date().getTime()) %
                (1000 * 60)) /
                1000
            );
          }, 1000); */
        })
      );
  },
};
</script>
<style>
@import url("../../assets/css/index");
</style>