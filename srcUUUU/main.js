import Vue from 'vue';
import App from './App';
import router from './router/index';
import './bus';
import store from './store/index';
import "./assets/css/reset.css"
import "./assets/fonticon/iconfont.css"
import "./assets/js/devicewidth"
import $axios from "./http/index";
import Vant from "vant";
import 'vant/lib/index.css';
import $api from "./http/api"
Vue.prototype.$axios = $axios;
Vue.prototype.$api = $api;
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
