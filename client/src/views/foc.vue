<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_foc" v-else>
    <div class="banner"
      :style="{
        'background-image': `url(${picture})`,
      }">
      <div class="title">
        <!-- <div class="name">《贰迁〇亿》</div>
        <div class="event">AMCISA FOC 20/21</div> -->
        <div v-for="(str, index) in title" :key="index">{{ str }}</div>
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
            :editable="editable"
            :content="content"
            @update="update_text"></editor>
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
      <div class="title">Camp Activites</div>
      <editor
        class="activities"
        :editable="editable"
        :content="activities"
        @update="update_text"></editor>
    </div>
  </div>
</template>

<script>
// import content from '@/mock/foc_intro.json';
// import activities from '@/mock/foc_activities.json';

const editor = () => import('@/components/editor/editor.vue');
export default {
  metaInfo: {
    title: this.$route.params.uni.toUpperCase().concat(' | Freshman Orientation Camp'),
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'FOC 是 Freshmen Orientation Camp 的简称，而 AMCISA FOC 是为来新加坡国立大学深造的大马独中生所办的新生营。',
      },
    ],
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
      editable: false,
      is_loading: true,
    };
  },
  mounted() {
    this.api(`/${this.$route.params.uni}/foc`).then(({ data }) => {
      const {
        picture, intro_video, content, activities, title, registration,
      } = data;
      this.picture = picture;
      this.title = title.split('\n');
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
    update_text(data) {
      console.log(data);
      this.editable = false;
    },
    navigate(url) {
      window.open(`${url.startsWith('http') ? '' : 'http://'}${url}`);
    },
  },
};
</script>
