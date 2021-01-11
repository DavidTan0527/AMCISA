<template>
  <modal class="confirm-modal" ref="modal">
    <div class="modal-body">
      <h2>{{ title }}</h2>
      <button class="button button-error" @click="confirm"
      style="float: right; margin-top: 3rem;">
        {{ text }}
      </button>
    </div>
  </modal>
</template>

<script>
import modal from './modal.vue';

export default {
  components: {
    modal,
  },
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    text: {
      type: String,
      default: 'Confirm',
    },
  },
  data() {
    return {
      active: false,
    };
  },
  mounted() {
    this.$watch(() => this.$refs.modal.active, (val) => {
      this.active = val;
    });
  },
  methods: {
    confirm() {
      this.active = false;
      this.$emit('confirm');
    },
  },
  watch: {
    active(value) {
      this.$refs.modal.active = value;
    },
  },
};
</script>

<style lang="scss">
.confirm-modal {
  h2 {
    margin-bottom: 0;
  }
  .button {
    // width: 4rem;
    border-radius: .2rem;
    border: none;
    margin: 1.5rem 0 0;
    padding: .4rem .6rem;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    background-color: $primary-color;
    cursor: pointer;
    &:hover {
      background-color: darken($primary-color, 8%);
    }
    &:active, &:focus {
      outline: none;
    }
  }
}
</style>
