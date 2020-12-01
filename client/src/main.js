import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/scss/index.scss'; // main scss file
import '@/assets/icons/feather/feather.css'; // feather icons

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
