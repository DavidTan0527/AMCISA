import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home'),
  },
  {
    path: '/:uni',
    name: 'Main',
    component: () => import('@/views/main'),
    beforeEnter: (to, from, next) => {
      if (!['nus', 'ntu'].includes(to.params.uni)) {
        next({ name: 'Home' });
      }
      next(); // always call next
    },
    children: [],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
