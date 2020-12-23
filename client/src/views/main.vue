<template>
  <div id="_main">
    <div class="foc" v-if="notify_foc">
      <div class="main-title">FOC</div>
      <div class="body">
        Freshman Orientation Camp 21/22 is open for registration!!!
      </div>
      <button class="btn-round" @click="goto('foc')">
        Check It Out!!! <i class="fe fe-arrow-right"></i>
      </button>
    </div>
    <div class="events">
      <div class="main-title">EVENTS</div>
      <div class="body">
        <timeline :data="events" />
      </div>
      <button class="btn-round" @click="goto('event')">
        View All Events
      </button>
    </div>
    <div class="admission" id="admission">
      <div class="main-title">ADMISSION</div>
      <div class="body">
        <div class="step">
          <div class="title">Step 1</div>
          <ul>
            <li>Choose your course of study</li>
            <li>Complete online application form</li>
            <li>Apply for tuition grant</li>
          </ul>
        </div>
        <div class="step">
          <div class="title">Step 2</div>
          <ul>
            <li>Choose your course of study</li>
            <li>Complete online application form</li>
            <li>Apply for tuition grant</li>
          </ul>
        </div>
        <div class="step">
          <div class="title">Step 3</div>
          <ul>
            <li>Choose your course of study</li>
            <li>Complete online application form</li>
            <li>Apply for tuition grant</li>
          </ul>
        </div>
      </div>
      <button class="btn-round" @click="goto('faq')">
        Details & FAQ
      </button>
    </div>
  </div>
</template>

<script>
const timeline = () => import('@/components/timeline.vue');
export default {
  metaInfo() {
    return {
      title: this.$route.params.uni.toUpperCase().concat(' | AMCISA'),
    };
  },
  components: {
    timeline,
  },
  data: () => ({
    notify_foc: false,
    events: [],
    admission: [],
  }),
  mounted() {
    this.api('/nus-landing').then(({ data }) => {
      const { notify_foc, events, admission } = data;
      this.notify_foc = notify_foc;
      this.events = events;
      this.admission = admission;
      setTimeout(() => {
        window.scrollTo({ top: document.querySelector(this.$route.hash).offsetTop, behavior: 'smooth' });
      }, 100);
    }).catch(console.log);
  },
  methods: {
    goto(path) {
      this.$router.push(`/${this.$route.params.uni}/${path}`);
    },
  },
};
</script>
