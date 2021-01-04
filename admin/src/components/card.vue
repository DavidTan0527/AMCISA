<template>
  <div id="_card">
    <div class="card-image">
      <img :src="image" :alt="title" loading="lazy">
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
};
</script>

<style lang="scss">
#_card {
  display: flex;
  flex-direction: column;
  min-height: 250px;
  border-radius: 1rem;
  border: solid 1px #eee;
  box-shadow: 0 2px 8px rgba(#000, .18);
  background-color: #fff;
  overflow: hidden;
  transition: 300ms;
  cursor: pointer;
  &:hover, &:focus-within {
    transform: translateY(-15px);
    box-shadow: 0 18px 16px rgba(#000, .2);
  }
  .card-image {
    position: relative;
    overflow: hidden;
    min-height: 50%;
    flex-grow: 1;
    img {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
      object-fit: cover;
    }
  }
  .card-info {
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 1rem;
    text-align: left;
    color: $text-gray;
    .card-title {
      font-size: 1.2rem;
      font-weight: 500;
    }
    .card-subtitle {
      font-size: .7rem;
      margin-bottom: .5rem;
    }
    .card-date {
      font-size: 1rem;
      margin-top: auto;
    }
  }
}
</style>
