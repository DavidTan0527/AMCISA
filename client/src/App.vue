<template>
  <div id="app" :class="$route.params.uni">
    <div class="progress-container" v-if="$route.name !== 'Home'">
      <div class="progress-bar" ref="scroll_progress"></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: 'AMCISA',
    titleTemplate: null,
  },
  mounted() {
    this.scroll_callback();
    window.onscroll = this.scroll_callback;
  },
  methods: {
    scroll_callback() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (this.$refs.scroll_progress !== undefined) {
        this.$refs.scroll_progress.style.width = `${scrolled}%`;
      }
    },
  },
  watch: {
    $route() {
      this.$nextTick(this.scroll_callback);
    },
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
