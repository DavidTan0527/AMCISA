<template>
  <div id="_users">
    <h1 class="title">Users <i class="fe fe-plus-circle"></i></h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
#_users {
  .title {
    display: flex;
    align-items: center;
    i {
      margin-left: .8rem;
      color: $gray-color;
      cursor: pointer;
      &:hover {
        color: darken($gray-color, 8%);
      }
    }
  }
}
</style>
