import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import About from './views/About.vue';
import Dashboard from './views/Dashboard.vue';
import Login from './views/Login.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,

      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
          //局部路由守卫
          // beforeEnter(to, from, next) {
          //   console.log('局部路由！！！');
          //   next();
          // }
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('./views/About.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
//全局路由守卫
router.beforeEach((to, from, next) => {
  // console.log('全局路由！！！');
  //顺序：全局=》局部 =》页面
  if (to.path !== '/login') {
    if (!store.state.isLogin) {
      next(`/login?redirect=${to.path}`);
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
