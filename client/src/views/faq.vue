<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_faq" v-else>
    <div class="main-title">FAQ</div>
    <div class="speech-section" v-for="(qna, index) in data" :key="index">
      <div class="speechbubble">
        <p>{{ qna.question }}</p>
      </div>
      <div class="speechbubble">
        <p>{{ qna.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$route.params.uni.toUpperCase().concat(' | FAQ'),
      meta: [
        {
          vmid: 'description',
          name: 'description',
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
