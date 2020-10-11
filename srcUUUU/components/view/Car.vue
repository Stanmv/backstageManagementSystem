<template>
  <div>
    <header class="header">
      <div class="top">
        <a href="#">
          <img src="../../assets/images/jiantl_01.jpg" />
        </a>
        <p>购物车</p>
        <a href="#">
          <img src="../../assets/images/jiantr_02.jpg" />
        </a>
      </div>
    </header>
    <!-- main部分 -->
    <div class="main">
      <div class="content_01box" v-for="(item,index) in carlist" :key="item.goodsid">
        <div class="content_01">
          <div class="leftbox">
            <div class="left">
              <input type="checkbox" :id="'check_1'+index" />
              <label :for="'check_1'+index">
                <span @click="goNo(index)"></span>
              </label>
              <img :src="$api.caseUrl+item.img"/>
            </div>
            <ul>
              <li>{{item.goodsname}}</li>
              <li>规格：50g</li>
              <li>￥{{item.price}}</li>
            </ul>
          </div>
          <div class="right">
            <i @click="del(index)">-</i>
            <input type="text" :value="item.num" />
            <i @click="add(index)">+</i>
          </div>
        </div>
      </div>
    </div>
    <!-- ankle的部分 -->
    <div class="ankle">
      <div class="left">
        <input type="checkbox" id="check_4" />
        <label for="check_4">
          <span></span>
          <i>全选</i>
        </label>
      </div>
      <div class="right">
        <div class="all">
          <b>
            总价：
            <i>{{allprice}}.00</i>
          </b>
          <p>不含运费, 已优惠￥0.00</p>
        </div>
        <input type="submit" name="pay" value="去结算(2件)" />
      </div>
    </div>
  </div>
</template>
<script>
import { SwipeCell } from 'vant';
// Vue.use(SwipeCell);
export default {
  data(){
    return{
      carlist:[],
    }
  },
  created(){
    var uid=JSON.parse(localStorage.getItem('userInfo')).uid;
    this.$axios.get(this.$api.carUrl+"?uid="+uid)
    .then(res=>{
      if(res.data.code===200){
        res.data.list.forEach(item=>{
          item.flag=false
        })
        this.carlist = res.data.list
        console.log(this.carlist);
      }
    })
  },
  methods:{
    del(ind){
      // console.log(111);
      // console.log(this.carlist[ind]);
      this.carlist[ind].num--;
      if(this.carlist[ind].num<1){
        this.carlist[ind].num=1;
      }
    },
    add(ind){
      // console.log(222);
      this.carlist[ind].num++;
    },
    goNo(ind){
      this.carlist[ind].flag=!this.carlist[ind].flag;
    }
  },
  computed:{
    allprice(){
      var a = 0;
      this.carlist.forEach(item=>{
        if(item.flag==true){
          a+=item.num*item.price
        }
      })
      return a;
    }
  }
}
</script>
<style>
  /* .goods-card {
    margin: 0;
    background-color: white;
  }
  .delete-button {
    height: 100%;
  } */
@import url('../../assets/css/shopcar');
</style>