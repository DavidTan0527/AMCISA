<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_event_details" v-else>
    <div class="info">
      <div class="image">
        <img :src="picture" :alt="title">
        <img :src="picture" class="shadow">
      </div>
      <div class="date-section">
        <i class="fe fe-calendar"></i>
        <div class="date">{{ event_date }}</div>
      </div>
      <div class="location-section">
        <i class="fe fe-map-pin"></i>
        <div class="location">{{ venue }}</div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        {{ title }}
      </div>
      <small class="subtitle">{{ author }}, {{ created_date }}</small>
      <editor
        class="article"
        :content="content"></editor>
    </div>
  </div>
</template>

<script>
const editor = () => import('@/components/editor/editor.vue');
export default {
  metaInfo() {
    return {
      title: this.$route.params.uni.toUpperCase().concat(` AMCISA | ${this.title}`),
      meta: [
        {
          vmid: 'og:title',
          name: 'og:title',
          content: this.$route.params.uni.toUpperCase().concat(` AMCISA | ${this.title}`),
        },
        {
          vmid: 'og:image',
          name: 'og:image',
          content: this.picture || 'img/logo.jpg',
        },
      ],
    };
  },
  components: {
    editor,
  },
  data: () => ({
    event_date: '',
    venue: '',
    title: '',
    author: '',
    created_date: '',
    content: '',
    picture: null,
    is_loading: true,
  }),
  mounted() {
    this.api(`/${this.$route.params.uni}/event/${this.$route.params.id}`).then(({ data }) => {
      const {
        author, content, created_date, event_date, picture, title, venue,
      } = data;
      this.author = author;
      this.content = content;
      this.created_date = created_date;
      this.event_date = event_date;
      this.picture = picture;
      this.title = title;
      this.venue = venue;
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
