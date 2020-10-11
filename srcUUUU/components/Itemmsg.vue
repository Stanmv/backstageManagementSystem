<template>
    <div>
        <header class="header">
        <div class="top">
            <a href="#"><img src="../assets/images/jiantl_01.jpg"></a>
            <p>商品详情</p>
            <a href="#"><img src="../assets/images/jiantr_02.jpg"></a>
        </div>
    </header>
    <!-- banner部分 -->
    <div class="banner">
        <img :src="$api.caseUrl+msg.img">
    </div>
    <div class="titlebox">
        <div class="title">
            <p>{{msg.goodsname}}</p>
            <i>￥{{msg.market_price}}</i><span>(此价格不予优惠套餐同时享受)</span>
        </div>
    </div>
    <!-- content1部分 -->
    <div class="content_1">
        <div class="onebox">
            <div class="one">
                <div class="one_left">
                    <span>促销：</span><a href="#">满减</a><span>满2件9折 ; 3件8折</span>
                </div>
                <div class="one_right"><span class="iconfont">&#xe63c;</span></div>
            </div>
        </div>
        <div class="twobox">
            <div class="two">
                <p>购买数量</p>
                <div class="right">
                    <i @click="delnum">-</i>
                    <input type="text" :value="num">
                    <i @click="addnum">+</i>
                </div>
            </div>
        </div>
        <div class="three">
            <div class="top">
                <div class="left">
                    <p>商品属性</p>
                </div>
                <div class="right"><span class="iconfont">&#xe63c;</span></div>
            </div>
            <div class="bottom">
                <p>{{msg.specsname}}</p>
                <a href="#" v-for="(item,index) in msg.specsattr" :key="index">{{item}}</a>
            </div>
        
        </div>
    </div>
    <!-- content2部分 -->
    <div class="content_2">
        <div class="content">
            <p>商品详情</p>
        </div>
    </div>
    <!-- bigpic部分 -->
    {{msg.goodsname}}
    {{msg.goodsname}}
    {{msg.goodsname}}
    {{msg.goodsname}}
    {{msg.goodsname}}
    
    <!-- content3部分 -->
    <div class="content_3">
        <div class="title">
            <p>商品评价</p>
        </div>
        <div class="evaluate">
            <p>1235668fg</p>
            <p>效果很好 , 物流到位 , 下次继续来!</p>
            <div class="picbox">
                <img src="../assets/images/pic-01.jpg">
                <img src="../assets/images/pic-02.jpg">
                <img src="../assets/images/pic-03.jpg">
            </div>
            
            <p class="time">2020-01-13</p>
            
        </div>
        <div class="all">
            <p>共1000+条评论</p>
            <a href="#">查看更多 ></a>
        </div>
    </div>

    <!-- footer部分 -->

    <footer class="footer">
        <a href="#" class="car">
            <img src="../assets/images/car-01.jpg">
            <p>购物车</p>
        </a>
        <input type="submit" value="加入购物车" @click="addtocar">
        <input type="submit" value="立即购买">
    </footer>
    </div>
</template>
<script>
import { Notify } from "vant";
export default {
    data(){
        return{
            msg:[],
            num:1,
        }
    },
    created(){
        let id = this.$route.query.id;
        this.$axios.get(this.$api.itemmsgUrl + "?id=" + id).then((res) => {
        console.log(res.data.list[0]);
        this.msg=res.data.list[0];
        this.msg.specsattr = this.msg.specsattr.split(',');
      });
    },
    methods:{
        delnum(){
            this.num--;
            if(this.num<=1){
                this.num=1
            };
        },
        addnum(){
            this.num++; 
        },
        addtocar(){
            this.$axios.post(this.$api.addcarUrl,{
                uid:JSON.parse(localStorage.getItem('userInfo')).uid,
                goodsid:this.$route.query.id,
                num:this.num,
            }).then(res=>{
                if(res.data.code===200){
                    Notify(res.data.msg);
                    this.$router.push('/car');
                }
            })
        }
    }

}
</script>
<style scoped>
@import url('../assets/css/prodetails.css');
</style>