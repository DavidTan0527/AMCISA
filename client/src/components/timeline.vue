<template>
  <div id="_timeline">
    <template v-for="index in count">
      <div class="item" :key="index">
        <div class="circle"></div>
        <div
          class="date"
          :class="[index % 2 === 0 ? 'right' : 'left']">
          5th November 2020
        </div>
        <img
          class="image"
          :class="[index % 2 === 1 ? 'right' : 'left']"
          src="@/mock/activity_1.jpg">
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
};
</script>
