<template>
  <div id="_faq">
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
  metaInfo: {
    title: 'FAQ',
  },
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.api('/qna').then(({ data }) => {
      this.data = data;
    }).catch(console.log);
  },
};
</script>
