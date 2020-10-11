<template>
  <div>
    <el-container class="outest">
      <el-aside width="180px">
        <h5><i class="el-icon-menu"></i>
          <a href="/" style="color:white;text-decoration:none">主页</a>
        </h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="item.id.toString()" v-for="(item,index) in getusername.menus" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <router-link v-for="(val,ind) in item.children" :key="ind" :to="val.url"><el-menu-item :index="val.id.toString()">{{val.title}}</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container style="margin-buttom:0;">
        <el-header>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{user}}</span>
    </el-header></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import index from "./view/Index";
import {mapGetters,mapActions} from "vuex";
export default {
  data(){
    return{
      user:'请登录',
    }
  },
  methods: {
    ...mapActions(['menuAsyncAdd']),
    loginOut(){

      this.$router.push('/login')
    }
  },
  computed:{
    ...mapGetters(['getmenulist','getusername']),
  },
  created(){
    this.user=this.getusername.username;
  }
};
</script>
<style>
body,.outest {
  width: 100%;
  height: 650px;
  overflow: hidden;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  background: darkslategray;
  color: aliceblue;
  height: 100%;
}

.el-main {
  background-color: #ffffff;
  color: #333;

}

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
} */
body,
html {
  margin: 0;
  padding: 0;
}
</style>