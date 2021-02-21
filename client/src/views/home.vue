<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_home" v-else>
    <header class="navbar">
      <h1 style="display:none;">AMCISA</h1>
      <section class="navbar-title">
        <img src="@/assets/logo.png" alt="AMCISA">
      </section>
    </header>

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
      <article class="info-section">
        <header>About Us</header>
        <editor
          class="body"
          :content="about"></editor>
      </article>
      <img class="svg" src="@/assets/svg/around_the_world.svg" loading="lazy">
    </div>

    <article class="explore">
      <header>Explore</header>
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
    </article>

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
  metaInfo() {
    return {
      title: 'AMCISA',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.about,
        },
      ],
    };
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
