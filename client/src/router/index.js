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
    component: () => import('@/layout/default'),
    children: [
      {
        path: '',
        name: 'Main',
        component: () => import('@/views/main'),
      },
      {
        path: 'event',
        name: 'Event',
        component: () => import('@/views/event'),
      },
      {
        path: 'event/:id',
        name: 'EventDetails',
        component: () => import('@/views/event_details'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  // saveScrollPosition: true,
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && !['nus', 'ntu'].includes(to.params.uni)) {
    next('/');
  } else {
    next();
  }
});

export default router;
