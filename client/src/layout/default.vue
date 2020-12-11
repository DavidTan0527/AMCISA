<template>
  <div id="_default">
    <header>
      <section class="title vert-divider" @click="$router.push(`/${$route.params.uni}`)">
        <span class="uni">{{ $route.params.uni === 'nus' ? 'NUS' : 'NTU' }}</span>
        <span class="amcisa">Amcisa</span>
      </section>
      <section class="links">
        <i class="fe fe-menu"></i>
        <ul class="vert-divider">
          <li
            v-for="link in links"
            :key="link.name"
            @click="$router.push(`/${$route.params.uni}/${link.to}`)">{{ link.name }}</li>
        </ul>
      </section>
    </header>
    <div class="content">
      <slot />
    </div>
    <footer>
      <div class="links">
        <div v-for="section in sections" :key="section.name">
          <div :class="section.name.replace(/ /g,'-')">
            {{ section.name.toUpperCase() }}
          </div>
          <ul>
            <li v-for="link in section.links" :key="link.name">
              {{ link.name }}
            </li>
          </ul>
        </div>
        <!-- Contact section -->
        <div class="contact">
          <div class="contact-us">CONTACT US</div>
          <ul>
            <li v-for="(info, media) in contacts" :key="media">
              <i :class="`fe fe-${media}`"></i>
              <span>{{ info.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <small>2020 © {{ $route.params.uni === 'nus' ? 'NUS' : 'NTU' }} AMCISA</small>
    </footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    // header links
    links: [
      { name: 'FOC', to: '' },
      { name: 'Events', to: 'event' },
      { name: 'Admission', to: '' },
      { name: 'About', to: '' },
    ],
    // footer links
    sections: [
      {
        name: 'about',
        links: [
          { name: 'Board of Committee', to: '' },
          { name: 'Our Mission', to: '' },
        ],
      },
      {
        name: 'activities',
        links: [
          { name: 'Freshman Orientation Camp', to: '' },
          { name: 'Events', to: '' },
        ],
      },
      {
        name: 'help',
        links: [
          { name: 'FAQ', to: '' },
          { name: 'Admission', to: '' },
        ],
      },
    ],
    contacts: {
      mail: { name: 'nusamcisa@gmail.com', to: '' },
      instagram: { name: '@nusamcisa', to: '' },
      facebook: { name: '@amcisanusntu', to: '' },
      youtube: { name: 'NUSAMCISA FOCCOM', to: '' },
    },
  }),
};
</script>
