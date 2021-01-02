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
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/users.vue'),
  },
  {
    path: '/landing',
    name: 'Landing',
    component: () => import('@/views/landing.vue'),
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/main.vue'),
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('@/views/generator.vue'),
  },
  {
    path: '/*',
    redirect: { name: 'Login' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
