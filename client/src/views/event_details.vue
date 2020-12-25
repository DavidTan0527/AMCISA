<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_event_details" v-else>
    <div class="info">
      <div class="image">
        <img :src="picture" alt="activity">
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
        <!-- <i class="fe fe-edit" v-if="!editable" @click="editable = true"></i> -->
      </div>
      <small class="subtitle">{{ author }}, {{ created_date }}</small>
      <editor
        class="article"
        :editable="editable"
        :content="content"
        @update="update_text"></editor>
    </div>
  </div>
</template>

<script>
const editor = () => import('@/components/editor/editor.vue');
export default {
  metaInfo: {
    title: 'Event',
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
    editable: false,
    is_loading: true,
  }),
  mounted() {
    this.api(`/event/${this.$route.params.id}`).then(({ data }) => {
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
  methods: {
    update_text(data) {
      this.editable = false;
      this.content = data;
    },
  },
};
</script>
