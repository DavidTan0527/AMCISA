<template>
  <div id="_default">
    <header>
      <section class="title vert-divider" >
        <span class="uni" @click="$router.push(`/${$route.params.uni}`)">
          {{ $route.params.uni === 'nus' ? 'NUS' : 'NTU' }}
        </span>
        <span class="amcisa" @click="$router.push('/')">Amcisa</span>
      </section>
      <section class="links">
        <i class="fe fe-menu"></i>
        <ul class="vert-divider">
          <li
            v-for="link in links"
            :key="link.name"
            @click="$router.push(`/${$route.params.uni}/${link.to}`)">
            {{ link.name }}
          </li>
        </ul>
      </section>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="background-logo"></div>
    <footer>
      <div class="links">
        <div v-for="section in sections" :key="section.name">
          <div :class="section.name.replace(/ /g,'-')">
            {{ section.name.toUpperCase() }}
          </div>
          <ul>
            <li
              v-for="link in section.links"
              :key="link.name"
              @click="$router.push(`/${$route.params.uni}/${link.to}`)">
              {{ link.name }}
            </li>
          </ul>
        </div>
        <!-- Contact section -->
        <div class="contact">
          <div class="contact-us">CONTACT US</div>
          <ul>
            <li v-for="(info, media) in contacts" :key="media"
            @click="navigate(info.to)">
              <i :class="`fe fe-${media}`"></i>
              <span>{{ info.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <small>{{ current_year }} © {{ $route.params.uni === 'nus' ? 'NUS' : 'NTU' }}</small>
    </footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    // header links
    links: [
      { name: 'Orientation', to: 'freshman-orientation' },
      { name: 'Events', to: 'event' },
      { name: 'Admission', to: '#admission' },
      { name: 'About', to: 'about' },
    ],
    // footer links
    sections: [
      {
        name: 'info',
        links: [
          { name: 'Board of Committee', to: 'about' },
          // { name: 'Our Mission', to: '' },
          { name: 'FAQ', to: 'faq' },
        ],
      },
      {
        name: 'activities',
        links: [
          { name: 'Freshman Orientation', to: 'freshman-orientation' },
          { name: 'Events', to: 'event' },
        ],
      },
    ],
    contacts: {},
  }),
  mounted() {
    this.api(`/${this.$route.params.uni}/contact`).then(({ data }) => {
      this.contacts = data;
    }).catch((err) => {
      this.$notify({
        type: 'error',
        text: err.message,
      });
      this.loading = false;
    });
  },
  methods: {
    navigate(url) {
      window.location.href = `${url.startsWith('http') ? '' : 'http://'}${url}`;
    },
  },
  computed: {
    current_year() {
      return new Date().getFullYear();
    },
  },
};
</script>
