<template>
  <div id="_timeline">
    <template v-for="index in data_count">
      <div class="item" :key="index">
        <div class="circle"></div>
        <div
          class="date"
          :class="[index % 2 === 0 ? 'right' : 'left']">
          {{ data[index-1].event_date }}
        </div>
        <img
          class="image"
          :class="[index % 2 === 1 ? 'right' : 'left']"
          :src="data[index-1].picture"
          :alt="data[index-1].title">
      </div>
      <div class="line" :key="'line-'+index" v-if="index !== count"></div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    count: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    data_count() {
      return Math.min(this.count, this.data.length);
    },
  },
};
</script>
