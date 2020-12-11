<template>
  <div id="app" :class="$route.params.uni">
    <default-layout v-if="$route.name !== 'Home'">
      <router-view/>
    </default-layout>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import defaultLayout from './layout/default.vue';

export default {
  name: 'App',
  metaInfo: {
    title: 'AMCISA',
    titleTemplate: '%s | AMCISA',
  },
  components: {
    defaultLayout,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Noto Sans SC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
