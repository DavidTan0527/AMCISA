<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_faq" v-else>
    <div class="main-title">FAQ</div>
    <div class="speech-section" v-for="(qna, index) in data" :key="index">
      <div class="speechbubble">
        <p>
          <editor :content="qna.question"></editor>
        </p>
      </div>
      <div class="speechbubble">
        <p>
          <editor :content="qna.answer"></editor>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import editor from '@/components/editor/editor.vue';

export default {
  components: {
    editor,
  },
  metaInfo() {
    return {
      title: this.$route.params.uni.toUpperCase().concat(' AMCISA | FAQ'),
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Frequently asked questions by students before departing for university in Singapore. Get your questions answered here.',
        },
        {
          vmid: 'og:title',
          name: 'og:title',
          content: this.$route.params.uni.toUpperCase().concat(' AMCISA | FAQ'),
        },
        {
          vmid: 'og:description',
          name: 'og:description',
          content: 'Frequently asked questions by students before departing for university in Singapore. Get your questions answered here.',
        },
      ],
    };
  },
  data() {
    return {
      data: [],
      is_loading: true,
    };
  },
  mounted() {
    this.api(`/${this.$route.params.uni}/qna`).then(({ data }) => {
      this.data = data;
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
