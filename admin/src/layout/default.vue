<template>
  <div id="_default_layout">
    <div class="sidebar" :class="{'open': is_sidebar_open}">
      <div class="title">Admin Panel</div>
      <nav class="navbar">
        <section class="navbar-section"
          v-for="item in nav_items" :key="item.name"
          @click="$router.push(item.to)">
          <i class="fe fe-chevron-right"
            :style="{
              'opacity': $route.path === item.to ? '1' : '0'
            }" />
           {{ item.name }}
         </section>
      </nav>
      <span class="nav-button" @click="is_sidebar_open = !is_sidebar_open">
        <i class="fe fe-menu"></i>
      </span>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_sidebar_open: false,
      nav_items: [
        { name: 'Users', to: '/users', icon: 'user' },
        { name: 'Landing', to: '/landing', icon: 'user' },
        { name: 'Main', to: '/events', icon: 'user' },
        { name: 'FOC', to: '/foc', icon: '' },
        { name: 'Events', to: '/faq', icon: 'user' },
        { name: 'FAQ', to: '/faq', icon: 'user' },
        { name: 'Committee', to: '/faq', icon: 'user' },
      ],
    };
  },
};
</script>

<style lang="scss">
#_default_layout {
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    padding: 2rem 3rem;
    background-color: $primary-color-dark;
    color: #fff;
    overflow-x: visible;
    transform: translateX(-100%);
    transition: 300ms;
    &.open {
      transform: translateX(0);
    }
    .title {
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 1rem;
    }
    .navbar {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .navbar-section {
        margin: .5rem 0;
        color: #f7fa5b;
        cursor: pointer;
      }
    }
    .nav-button {
      position: absolute;
      top: 2rem;
      left: 100%;
      font-size: 1.8rem;
      font-weight: 500;
      border-top-right-radius: .5rem;
      border-bottom-right-radius: .5rem;
      padding-left: .5rem;
      padding-right: .8rem;
      color: #fff;
      background-color: $primary-color-dark;
      z-index: 10;
      cursor: pointer;
    }
  }
  .content {
    padding: 2rem 4rem;
    overflow: auto;
  }
}
</style>
