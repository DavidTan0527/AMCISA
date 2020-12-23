<template>
  <div id="_faq">
    <div class="main-title">FAQ</div>
    <div class="speech-section" v-for="i in 6" :key="i">
      <div class="speechbubble">
        <p>
          Some random question that is very very long and
          sofisticated and doesn't really have any meaning
          to it. This should be long enough to see how it handles
          long paragraphs of text.
        </p>
      </div>
      <div class="speechbubble">
        <p>
          Some random answer that also does not make any sense at all
          but it is required to see how right aligned answers look for
          these speechbubbles. About this length should be sufficient to
          see how it turns out.
        </p>
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
    };
  },
};
</script>
