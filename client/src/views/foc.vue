<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_foc" v-else>
    <div class="banner"
      :style="{
        'background-image': `url(${picture})`,
      }">
      <div class="title">
        <div v-for="(str, index) in display_title" :key="index">{{ str }}</div>
      </div>
    </div>
    <div class="content">
      <div class="title">What is FOC?</div>
      <div class="intro">
          <iframe
            width="560"
            height="315"
            :src="intro_video"
            frameborder="0"
            allow="
              accelerometer; autoplay;
              clipboard-write; encrypted-media;
              gyroscope; picture-in-picture"
            allowfullscreen></iframe>
          <editor
            class="body"
            :content="content"></editor>
      </div>
      <div class="ticket" @click="navigate(registration.form_link)">
        <div class="details">
          <div class="date">
            <div class="title">Date</div>
            <div class="text">{{ registration.date }}</div>
          </div>
          <div class="venue">
            <div class="title">Venue</div>
            <div class="text">{{ registration.venue }}</div>
          </div>
          <div class="fees">
            <div class="title">Fees</div>
            <div class="text">{{ registration.fees }}</div>
          </div>
          <small class="deadline">报名截止日期：{{ registration.deadline }}</small>
        </div>
        <div class="arrow">
          <i class="fe fe-arrow-right-circle"></i>
        </div>
      </div>
      <div class="title">Camp Activities</div>
      <editor
        class="activities"
        :content="activities"></editor>
    </div>
  </div>
</template>

<script>
import editor from '@/components/editor/editor.vue';

export default {
  metaInfo() {
    return {
      title: this.$route.params.uni.toUpperCase().concat(' | Freshman Orientation Camp'),
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'FOC 是 Freshmen Orientation Camp 的简称，而 AMCISA FOC 是为来新加坡国立大学深造的大马独中生所办的新生营。',
        },
      ],
    };
  },
  components: {
    editor,
  },
  data() {
    return {
      picture: '',
      title: '',
      intro_video: '',
      content: {
        type: 'doc',
        content: [],
      },
      activities: {
        type: 'doc',
        content: [],
      },
      registration: {
        date: '',
        venue: '',
        fees: '',
        deadline: '',
        form_link: '',
      },
      is_loading: true,
    };
  },
  mounted() {
    this.api(`/${this.$route.params.uni}/foc`).then(({ data }) => {
      const {
        picture, intro_video, content, activities, title, registration,
      } = data;
      this.picture = picture;
      this.title = title;
      this.intro_video = intro_video;
      this.content = content;
      this.activities = activities;
      this.registration = registration;
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
    navigate(url) {
      window.open(`${url.startsWith('http') ? '' : 'http://'}${url}`);
    },
  },
  computed: {
    display_title() {
      return this.title.split('\n');
    },
  },
};
</script>
