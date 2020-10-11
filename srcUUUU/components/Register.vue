<template>
  <div>
    <img src="../assets/images/logo-01.jpg"  style=" display:block;margin:2rem auto;" alt />
    <van-cell-group>
      <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="txt" label="昵称" placeholder="请输入昵称" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
    </van-cell-group>
    <van-button type="primary" block @click="reg">注册</van-button>
  </div>
</template>
<script>
import Vue from "vue";
import { Field } from "vant";
import { Button } from "vant";
import { Notify } from "vant";
Vue.use(Field);
Vue.use(Button);
export default {
  data() {
    return {
      phone: "",
      txt: "",
      password: "",
    };
  },
  methods:{
    reg(){
      var data = {
        phone:this.phone,nickname:this.txt,password:this.password
      }
      this.$axios.post(
        this.$api.registerUrl,data
      ).then((res)=>{
        if(res.data.code===200){
          if(data.phone==''||data.nickname==''||data.password==""){
            Notify('您有信息未填入');
            return;
          }else{
            Notify({ type: 'primary', message: '注册成功' });
            this.$router.push('/login');
          }
        }else{
          Notify(res.data.msg);
        }
      })  
    }
  }
};
</script>