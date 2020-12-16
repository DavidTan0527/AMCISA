<template>
  <div id="_foc">
    <div class="banner">
      <div class="title">
        <div class="name">《贰迁〇亿》</div>
        <div class="event">AMCISA FOC 20/21</div>
      </div>
    </div>
    <div class="content">
      <div class="title">What is FOC?</div>
      <div class="intro">
        <iframe
          src=""
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen></iframe>
          <editor
            class="body"
            :editable="editable"
            :content="content"
            @update="update_text"></editor>
      </div>
      <div class="ticket"></div>
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
import editor from '@/components/editor/editor.vue';
import content from '@/mock/foc_intro.json';
import activities from '@/mock/foc_activities.json';

export default {
  components: {
    editor,
  },
  data() {
    return {
      editable: false,
      content,
      activities,
    };
  },
  methods: {
    update_text(data) {
      console.log(data);
      this.editable = false;
    },
  },
};
</script>
