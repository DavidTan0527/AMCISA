<template>
  <div id="app">
    <notifications />
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
body {
  padding: 0;
  margin: 0;
}

input, textarea {
  font-family: inherit;
}

#app {
  font-family: 'Noto Sans SC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
