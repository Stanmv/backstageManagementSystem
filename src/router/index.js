//引入vue
import Vue from 'vue'
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);
//配置路由 var router=[{path:'./文件路径',component:子组件名}]
//引用url路由所需组件 import 子组件名 from ‘子组件路径’，便于后期引用url
var routes = [{
    path: '/',
    component: () => import('../components/Home'),
    redirect: '/index',
    children: [{ //主页
        path: '/index',
        meta: {
          // reqiresAuth: true
          select:'/'
        }, //meta 元信息，记录进入该页面是否需要进行身份验证
        component: () => import('../components/view/Index'),
        beforeEnter: (to, from, next) => {
          next()
        }
      },

      { //商品分类
        path: '/goodsclass',
        meta: {
          // reqiresAuth: true
          select:'/goodsclass'
        },
        component: () => import('../components/shop_manage/goods_class/Goods_class')
      }, { //商品分类--添加
        path: '/goodsclass/add',
        meta: {
          // reqiresAuth: true
          select:'/goodsclass'
        },
        component: () => import('../components/shop_manage/goods_class/Goods_class_add')
      }, { //商品分类--编辑
        path: '/goodsclass/:id',
        meta: {
          // reqiresAuth: true
          select:'/goodsclass'
        },
        component: () => import('../components/shop_manage/goods_class/Goods_class_add')
      }, { //商品规格
        path: '/goodssize',
        meta: {
          // reqiresAuth: true
          select:'/goodssize'
        },
        component: () => import('../components/shop_manage/goods_size/Goods_size')
      }, { //商品规格--添加
        path: '/goodssize/add',
        meta: {
          // reqiresAuth: true
          select:'/goodssize'
        },
        component: () => import('../components/shop_manage/goods_size/Goods_size_add')
      }, { //商品规格--修改
        path: '/goodssize/:id',
        meta: {
          // reqiresAuth: true
          select:'/goodssize'
        },
        component: () => import('../components/shop_manage/goods_size/Goods_size_add')
      }, { //商品管理
        path: '/goodsmanage',
        meta: {
          // reqiresAuth: true
          select:'/goodsmanage'
        },
        component: () => import('../components/shop_manage/goods_manage/Goods_manage')
      }, { //商品管理--添加
        path: '/goodsmanage/add',
        meta: {
          // reqiresAuth: true
          select:'/goodsmanage'
        },
        component: () => import('../components/shop_manage/goods_manage/Goods_manage_add')
      }, { //商品管理--修改
        path: '/goodsmanage/:id',
        meta: {
          // reqiresAuth: true
          select:'/goodsmanage'
        },
        component: () => import('../components/shop_manage/goods_manage/Goods_manage_add')
      }, { // 轮播图管理
        path: '/pic',
        meta: {
          // reqiresAuth: true
          select:'/pic'
        },
        component: () => import('../components/shop_manage/pic_shop/Pic_manage')
      }, { // 轮播图管理--添加
        path: '/pic/add',
        meta: {
          // reqiresAuth: true
          select:'/pic'
        },
        component: () => import('../components/shop_manage/pic_shop/Pic_manage_add')
      }, { // 轮播图管理--修改
        path: '/pic/:id',
        meta: {
          // reqiresAuth: true
          select:'/pic'
        },
        component: () => import('../components/shop_manage/pic_shop/Pic_manage_add')
      }, { //会员管理
        path: '/vip',
        meta: {
          // reqiresAuth: true
          select:'/vip'
        },
        component: () => import('../components/shop_manage/vip/Vip_shop')
      }, { //会员管理--修改
        path: '/vip/:id',
        meta: {
          // reqiresAuth: true
          select:'/vip'
        },
        component: () => import('../components/shop_manage/vip/Vip_shop_add')
      }, { //秒杀活动
        path: 'kill',
        meta: {
          // reqiresAuth: true
          select:'/kill'
        },
        component: () => import('../components/shop_manage/kill/Kill')
      }, { //秒杀活动--添加
        path: '/kill/add',
        meta: {
          // reqiresAuth: true
          select:'/kill'
        },
        component: () => import('../components/shop_manage/kill/Kill_add')
      }, { //秒杀活动--修改
        path: '/kill/:id',
        meta: {
          // reqiresAuth: true
          select:'/kill'
        },
        component: () => import('../components/shop_manage/kill/Kill_add')
      }, { //管理员管理
        path: '/admin',
        meta: {
          // reqiresAuth: true
          select:'/admin'
        },
        component: () => import('../components/system_manage/admin/Admin_sys')
      }, { //管理员管理--添加
        path: '/admin/add',
        meta: {
          // reqiresAuth: true
          select:'/admin'
        },
        component: () => import('../components/system_manage/admin/Admin_sys_add')
      }, { //管理员管理--修改
        path: '/admin/:id',
        meta: {
          // reqiresAuth: true
          select:'/admin'
        },
        component: () => import('../components/system_manage/admin/Admin_sys_add')
      }, { //人员管理
        path: '/member',
        meta: {
          // reqiresAuth: true
          select:'/member'
        },
        component: () => import('../components/system_manage/member/Member_sys')
      }, { //人员管理--添加
        path: '/member/add',
        meta: {
          // reqiresAuth: true
          select:'/member'
        },
        component: () => import('../components/system_manage/member/Member_sys_add')
      }, { //人员管理--编辑
        path: '/member/:id',
        meta: {
          // reqiresAuth: true
          select:'/member'
        },
        component: () => import('../components/system_manage/member/Member_sys_add')
      }, { //菜单管理
        path: '/menu',
        meta: {
          // reqiresAuth: true
          select:'/menu'
        },
        component: () => import('../components/system_manage/menu/Menu_sys')
      }, { //菜单管理--添加
        path: '/menu/add',
        meta: {
          // reqiresAuth: true
          select:'/menu'
        },
        component: () => import('../components/system_manage/menu/Menu_sys_add')
      }, { //菜单管理--编辑
        path: '/menu/:id',
        meta: {
          // reqiresAuth: true
          select:'/menu'
        },
        component: () => import('../components/system_manage/menu/Menu_sys_add')
      }
    ]
  },
  { // 登录
    path: '/login',
    component: () => import('../components/Login')
  },
  { // 输入其他网址报错
    path: '*',
    component: () => import('../components/Notfound')
  }
]
var router = new VueRouter({
  routes: routes,
  mode: 'history',
});
// 全局守卫
router.beforeEach((to, from, next) => {
  // 设置路由拦截
  if (to.path == "/login") {
    next();
    return;
  }
  // 判断当前有无用户信息
  // 执行store中getters中的getusername方法
  if (!store.getters.getusername) {
    next('/login');
  }
  next();
})

export default router;
