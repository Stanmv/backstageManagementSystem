//引入vue
import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);
//配置路由 var router=[{path:'./文件路径',component:子组件名}]
//引用url路由所需组件 import 子组件名 from ‘子组件路径’，便于后期引用url
var routes = [{
    path: '/',
    component: () => import('../components/Home'),
    redirect: '/index',
    children: [{
        path: '/index',
        component: () => import('../components/view/Index'),
        beforeEnter: (to, from, next) => {
          next()
        }
      },
      //meta 元信息，记录进入该页面是否需要进行身份验证
      {
        path: '/car',
        meta: {
          reqiresAuth: true
        },
        component: () => import('../components/view/Car')
      },
      {
        path: '/my',
        meta: {
          reqiresAuth: true
        },
        component: () => import('../components/view/My')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('../components/Login')
  },
  {
    path: '/register',
    component: () => import('../components/Register'),
  },
  {
    path: '/itemmsg',
    component: () => import('../components/Itemmsg'),
  },
  {
    path: '*',
    component: () => import('../components/Notfound')
  }
]
var router = new VueRouter({
  routes: routes,
  mode: 'history',
});
router.beforeEach((to, from, next) => {
  // 设置路由拦截
  // to.matched是一个数组.数组.some()可用来判断数组中是否有元信息，返回布尔值，可用判断每切换一次路由，如果有元信息，就需要拦截判断
  // if(to.matched.some(record=>record.meta.reqiresAuth)){
  if (to.matched.some(record => record.meta.reqiresAuth)) {
    //  console.log(111);
    if (localStorage.getItem('userInfo')) {
      // console.log(localStorage.getItem('userInfo'));// 判断是否已经登录过,判断依据是userinfo是否有值
      // 有值则通过
      next();
    } else {
      // 无值返回到登录页面
      next('./login');
    }
  } else {
    // 不需要登录身份验证的放行

    next()
  }

})


export default router;
