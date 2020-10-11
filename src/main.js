import Vue from 'vue';
import App from './App';
import router from './router/index';
import './bus';
import store from './store/index';
import $axios from "./http/index";
import $api from "./http/api"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);
Vue.prototype.$axios = $axios;
Vue.prototype.$api = $api;

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,

  render: h => h(App),
})
