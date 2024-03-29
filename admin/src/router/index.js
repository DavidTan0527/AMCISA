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
    path: '/foc',
    name: 'Foc',
    component: () => import('@/views/foc.vue'),
  },
  {
    path: '/event',
    name: 'Event',
    component: () => import('@/views/event.vue'),
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: () => import('@/views/event_details.vue'),
  },
  {
    path: '/faq',
    name: 'Faq',
    component: () => import('@/views/faq.vue'),
  },
  {
    path: '/committee',
    name: 'committee',
    component: () => import('@/views/committee.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about.vue'),
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('@/views/contacts.vue'),
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
