import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'Login' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  saveScrollPosition: true,
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login'
  && !window.localStorage.getItem('jwt-token')) {
    next('/login');
  } else {
    next();
  }
});

export default router;
