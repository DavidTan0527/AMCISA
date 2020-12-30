<template>
  <div id="app">
    <router-view v-if="$route.name === 'Login'"></router-view>
    <layout v-else>
      <router-view/>
    </layout>
  </div>
</template>

<script>
import layout from './layout/default.vue';

export default {
  components: {
    layout,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700;900&display=swap');
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Noto Sans SC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
