<template>
  <div id="_modal" class="modal"
  :class="{ 'active': active }">
    <div class="modal-container">
      <span class="close" @click="active = false">&times;</span>
      <slot></slot>
    </div>
    <a class="modal-overlay" @click="active = false"></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    };
  },
};
</script>

<style lang="scss">
#_modal {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 98;
  &.active {
    display: block;
  }
  .modal-overlay {
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.12);
    backdrop-filter: blur(.5px);
  }
  .modal-container {
    box-sizing: border-box;
    background-color: #fefefe;
    position: absolute;
    top: 50vh;
    left: 50vw;
    padding: 1rem 3rem;
    transform: translate(-50%, -50%);
    border: 1px solid #ccc;
    border-radius: .3rem;
    box-shadow: 1px 2px 12px 0 rgba(0,0,0,0.1);
    width: 40%;
    min-width: 250px;
    max-width: 95vw;
    max-height: 80vh;
    z-index: 100;
    overflow: inherit;
    .close {
      color: #aaa;
      float: right;
      font-size: 2rem;
      font-weight: bold;
      &:hover,
      &:focus {
        color: #898989;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }
}
</style>
