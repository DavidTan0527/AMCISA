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
        path: 'foc',
        name: 'Foc',
        component: () => import('@/views/foc'),
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
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about'),
      },
      {
        path: 'faq',
        name: 'Faq',
        component: () => import('@/views/faq'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  // saveScrollPosition: true,
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    if (to.hash) {
      return window.scrollTo({
        top: document.querySelector(to.hash).offsetTop,
        behavior: 'smooth',
      });
    }
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  routes,
});

router.beforeEach((to, from, next) => {
  window.localStorage.setItem('uni', to.params.uni);
  if (to.path !== '/' && !['nus', 'ntu'].includes(to.params.uni)) {
    next('/');
  } else {
    next();
  }
});

export default router;
