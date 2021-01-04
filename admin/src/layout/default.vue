<template>
  <div id="_default_layout" :class="uni_type">
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
      <div class="logout" @click="logout">
        <i class="fe fe-log-out"></i> Logout
      </div>
      <span class="nav-button" @click="is_sidebar_open = !is_sidebar_open">
        <i class="fe fe-menu"></i>
      </span>
    </div>
    <div class="content" @click="is_sidebar_open = false">
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
        { name: 'Users', to: '/users' },
        { name: 'Landing', to: '/landing' },
        { name: 'Main', to: '/main' },
        { name: 'FOC', to: '/foc' },
        { name: 'Events', to: '/event' },
        { name: 'FAQ', to: '/faq' },
        { name: 'Committee', to: '/committee' },
        { name: 'Contacts', to: '/contacts' },
      ],
    };
  },
  methods: {
    logout() {
      window.localStorage.removeItem('jwt-token');
      this.$router.push('/login');
      this.$notify({
        type: 'success',
        title: 'Logout successful',
      });
    },
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    top: 0;
    left: 0;
    height: 100vh;
    padding: 2rem 3rem;
    background-color: $primary-color-dark;
    color: #fff;
    z-index: 999;
    overflow-x: visible;
    transform: translateX(-100%);
    transition: 300ms;
    box-sizing: border-box;
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
    .logout {
      position: absolute;
      bottom: 50px;
      color: #f7fa5b;
      cursor: pointer;
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
    box-sizing: border-box;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    overflow: auto;
  }
}
</style>
