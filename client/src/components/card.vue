<template>
  <div id="_card">
    <div class="card-image">
      <img :src="image" :alt="title">
    </div>
    <div class="card-info">
      <div class="card-title">{{ title }}</div>
      <div class="card-subtitle">{{ subtitle }}</div>
      <div class="card-date">{{ date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: [ArrayBuffer, String],
    title: String,
    subtitle: String,
    date: String,
  },
  data: () => ({
  }),
};
</script>
