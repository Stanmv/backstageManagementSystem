import $axios from "../http";
import $api from "../http/api";
export default {
  menuAsyncAdd(context) {
    return new Promise((resolve, reject) => {
      $axios.get($api.menulistUrl, {
          params: {
            istree: 1
          }
        })
        .then(res => {
          context.commit('setmenulist', res.data.list);
          resolve(res)
        })
    })
  },
  adminAsyncAdd(context, data) { //管理员编辑异步添加角色列表
    return new Promise((resolve, reject) => {
      $axios.get($api.memberlistUrl)
        .then(res => {
          context.commit('setadminlist', res.data.list);
          resolve(res)
        })
    })
  },
  userinfoAsyncAdd(context, data) { //data登录存储账户名密码
    return new Promise((resolve, reject) => {
      $axios.post($api.userloginUrl, data)
        .then(res => {
        
          if (res.data.code == 200) {
            // 请求到的用户信息存储到store  commit调用mutations中  设置
            // console.log(res.data.list);
            context.commit('setusername', res.data.list);
            // 将token存储到sessionStorage中
            sessionStorage.setItem("token", res.data.list.token);
            resolve(res)
          }
        })
    })
  },
}
