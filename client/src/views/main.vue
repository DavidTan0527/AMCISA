<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_main" v-else>
    <div class="foc" v-if="notify_foc">
      <div class="main-title">ORIENTATION</div>
      <editor
        class="body"
        :content="foc_announcement"></editor>
      <button class="btn-round" @click="goto('freshman-orientation')">
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
        <div class="step" v-for="(step, index) in admission" :key="index">
          <div class="title">{{ step.title }}</div>
          <editor
            class="content"
            :content="step.content"></editor>
        </div>
      </div>
      <button class="btn-round" @click="goto('faq')">
        Details & FAQ
      </button>
    </div>
  </div>
</template>

<script>
import editor from '@/components/editor/editor.vue';
import timeline from '@/components/timeline.vue';

export default {
  metaInfo() {
    return {
      title: this.$route.params.uni.toUpperCase().concat(' | AMCISA'),
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `${this.$route.params.uni.toUpperCase()} Freshman Orientation • Events • Admission Details & FAQ`,
        },
        {
          vmid: 'og:title',
          name: 'og:title',
          content: `${this.$route.params.uni.toUpperCase()} | AMCISA`,
        },
        {
          vmid: 'og:description',
          name: 'og:description',
          content: `${this.$route.params.uni.toUpperCase()} Freshman Orientation • Events • Admission Details & FAQ`,
        },
      ],
    };
  },
  components: {
    timeline,
    editor,
  },
  data: () => ({
    notify_foc: false,
    foc_annnouncement: '',
    events: [],
    admission: [],
    is_loading: true,
  }),
  mounted() {
    this.api(`/${this.$route.params.uni}/landing`).then(({ data }) => {
      const {
        notify_foc, foc_announcement, events, admission,
      } = data;
      this.notify_foc = notify_foc;
      this.foc_announcement = foc_announcement;
      this.events = events;
      this.admission = admission;
      this.is_loading = false;
      if (this.$route.hash) {
        setTimeout(() => {
          window.scrollTo({ top: document.querySelector(this.$route.hash).offsetTop, behavior: 'smooth' });
        }, 100);
      }
    }).catch((err) => {
      this.$notify({
        type: 'error',
        text: err.message,
      });
      this.loading = false;
    });
  },
  methods: {
    goto(path) {
      this.$router.push(`/${this.$route.params.uni}/${path}`);
    },
  },
};
</script>
