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
    // Using methods and not computed due to reactivity issues (not updated when token changes)
    current_username() {
      const token = window.localStorage.getItem('jwt-token');
      const payload = token ? token.split('.')[1] : '';
      const user = payload ? JSON.parse(atob(payload)) : null;
      return user ? user.username : null;
    },
  },
  computed: {
    uni_type() {
      const token = window.localStorage.getItem('jwt-token');
      const payload = token ? token.split('.')[1] : '';
      const user = payload ? JSON.parse(atob(payload)) : null;
      return user ? user.uni : null;
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
