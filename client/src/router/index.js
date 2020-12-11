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
  },
  {
    path: '/:uni/event',
    name: 'Event',
    component: () => import('@/views/event'),
  },
];

const router = new VueRouter({
  mode: 'history',
  saveScrollPosition: true,
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && !['nus', 'ntu'].includes(to.params.uni)) {
    next('/');
  }
  next(); // always call next
});

export default router;
