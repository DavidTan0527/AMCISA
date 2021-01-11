<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_home" v-else>
    <nav class="navbar">
      <section class="navbar-title">
        <img src="@/assets/logo.png" alt="AMCISA">
      </section>
    </nav>

    <div class="main-card">
      <img class="svg" src="@/assets/svg/having_fun.svg" loading="lazy">
      <div class="slogan-section">
        <div class="slogan-1">
          "Where no one
        </div>
        <div class="slogan-2">
          is left behind"
        </div>
        <span class="quote">––Amcisa</span>
      </div>
    </div>

    <div class="about-card">
      <div class="info-section">
        <header>About Us</header>
        <!-- <p>{{ about }}</p> -->
        <editor
          class="body"
          :content="about"></editor>
      </div>
      <img class="svg" src="@/assets/svg/around_the_world.svg" loading="lazy">
    </div>

    <div class="explore">
      <header>Explore</header>
      <!-- <div class="body">
        {{ explore }}
      </div> -->
      <editor
        class="body"
        :content="explore"></editor>
      <div class="btns">
        <div class="btn-nus" @click="$router.push('/nus')">
          <div class="img"></div>
        </div>
        <div class="btn-ntu" @click="$router.push('/ntu')">
          <div class="img"></div>
        </div>
      </div>
    </div>

    <footer>
      <!-- <div class="icons">
        <i class="fe fe-facebook"></i>
        <i class="fe fe-instagram"></i>
        <i class="fe fe-youtube"></i>
      </div> -->
      <!-- <div class="logo">
        <img src="@/assets/logo.png" alt="">
      </div> -->
      2020 © AMCISA
    </footer>
    <div class="background-rect"></div>
  </div>
</template>

<script>
import editor from '@/components/editor/editor.vue';

export default {
  metaInfo: {
    title: 'AMCISA',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'AMCISA 是 Association of Malaysian Chinese Independent School Alumni 的简称，中文名为留新大马独中生联谊会。Find out more about us today!',
      },
    ],
  },
  components: {
    editor,
  },
  data: () => ({
    quote: '',
    about: '',
    explore: '',
    is_loading: true,
  }),
  mounted() {
    this.api('/main').then(({ data }) => {
      const { quote, about, explore } = data;
      this.quote = quote;
      this.about = about;
      this.explore = explore;
      this.is_loading = false;
    }).catch((err) => {
      this.$notify({
        type: 'error',
        text: err.message,
      });
      this.loading = false;
    });
  },
};
</script>
