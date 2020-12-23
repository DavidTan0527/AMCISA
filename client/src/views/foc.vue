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
      <div class="ticket">
        <div class="details">
          <div class="date">
            <div class="title">Date</div>
            <div class="text">1/8 - 6/8/2021</div>
          </div>
          <div class="venue">
            <div class="title">Venue</div>
            <div class="text">NUS Campus</div>
          </div>
          <div class="fees">
            <div class="title">Fees</div>
            <div class="text">RM20</div>
          </div>
          <small class="deadline">报名截止日期：31/3/2021</small>
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
import content from '@/mock/foc_intro.json';
import activities from '@/mock/foc_activities.json';

const editor = () => import('@/components/editor/editor.vue');
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
