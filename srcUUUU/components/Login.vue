<template>
  <div>
    <img src="../assets/images/logo-01.jpg"  style=" display:block;margin:2rem auto;" alt />
    <van-cell-group>
      <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
    </van-cell-group>
    <van-button type="primary" block @click="login">登录</van-button>
  </div>
</template>
<script>
import Vue from "vue";
import { Field, Info } from "vant";
import { Button } from "vant";
import { Notify } from "vant";
Vue.use(Field);
Vue.use(Button);
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  components: {
    [Notify.Component.name]: Notify.Component,
  },
  methods: {
    login() {
      this.$axios
        .post(this.$api.loginUrl, {
          phone: this.phone,
          password: this.password,
        })
        .then((res) => {
          // 当登录时的状态码是200时，能够获取到登录时服务端返回的token值
          if (res.data.code === 200) {
            // localStorage.getItem(key,val):将val的内容存储到key字段 localStorage中只能存储字符串  永久存储  除非手动删除  userInfo自定义的
            localStorage.setItem("userInfo", JSON.stringify(res.data.list));
            // console.log();
            this.$router.push('/');
            Notify({ type: 'primary', message: '登录成功' });
          } else {
            Notify(res.data.msg);
          }
          this.phone="";
          this.password="";
        });
    },
  },
};
</script>