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
            src="https://www.youtube.com/embed/S-UGdyBBPTs"
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
  components: {
    editor,
  },
  data() {
    return {
      picture: '',
      title: '',
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
    this.api('/foc').then(({ data }) => {
      const {
        picture, content, activities, title, registration,
      } = data;
      this.picture = picture;
      this.title = title.split('\n');
      this.content = content;
      this.activities = activities;
      this.registration = registration;
      this.is_loading = false;
    }).catch(console.log);
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
