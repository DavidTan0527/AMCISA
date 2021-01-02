import Notifications from 'vue-notification';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import api from './api';
import './assets/icons/feather/feather.css';

Vue.use(Notifications);

// Import API function globally as mixin
Vue.mixin({
  methods: {
    api,
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
