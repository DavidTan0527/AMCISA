<template>
  <div id="_event_details">
    <div class="info">
      <div class="image">
        <img src="@/mock/activity_2.jpg" alt="activity">
        <img src="@/mock/activity_2.jpg" class="shadow">
      </div>
      <div class="date-section">
        <i class="fe fe-calendar"></i>
        <div class="date">{{ date }}</div>
      </div>
      <div class="location-section">
        <i class="fe fe-map-pin"></i>
        <div class="location">{{ location }}</div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        {{ title }}
        <i class="fe fe-edit" v-if="!editable" @click="editable = true"></i>
      </div>
      <small class="subtitle">{{ author }}, {{ created_at }}</small>
      <editor
        class="article"
        :editable="editable"
        :content="content"
        @update="update_text"></editor>
    </div>
  </div>
</template>

<script>
import editor from '@/components/editor/editor.vue';

export default {
  metaInfo: {
    title: 'Event',
  },
  components: {
    editor,
  },
  data: () => ({
    date: '21/10/2020',
    location: 'Ameens',
    title: 'Supper Night',
    author: 'Author',
    created_at: '24/10/2020',
    content: 'Some text',
    editable: false,
  }),
  methods: {
    update_text(data) {
      this.editable = false;
      this.content = data;
    },
  },
};
</script>
