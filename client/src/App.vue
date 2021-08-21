<template>
  <div id="app" :class="$route.params.uni">
    <!--
    <div class="progress-container" v-if="$route.name !== 'Home' && !is_phone">
      <div class="progress-bar" ref="scroll_progress"></div>
    </div>
    -->
    <notifications />
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'AMCISA',
  metaInfo: {
    title: 'AMCISA',
    titleTemplate: null,
  },
  mounted() {
    if (this.$workbox) {
      this.$workbox.addEventListener('waiting', () => {
        this.$notify({
          type: 'success',
          title: 'New content available',
          text: 'Reload the page to load new contents',
        });
      });
    }
    /*
    this.scroll_callback();
    let event_timeout = null;
    window.onscroll = () => {
      if (!event_timeout) {
        event_timeout = setTimeout(() => {
          event_timeout = null;
          this.scroll_callback();
        }, 30);
      }
    };
    */
  },
  methods: {
    scroll_callback() {
      if (!this.is_phone) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight
          - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (this.$refs.scroll_progress !== undefined) {
          this.$refs.scroll_progress.style.width = `${scrolled}%`;
        }
      }
    },
  },
  watch: {
    $route() {
      this.$nextTick(this.scroll_callback);
    },
  },
  computed: {
    is_phone() {
      return window.innerWidth < 425;
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
