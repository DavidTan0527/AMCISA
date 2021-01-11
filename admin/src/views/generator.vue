<template>
  <div id="_editor_generator">
    <editor editable :content="content" @update="copy"></editor>
  </div>
</template>

<script>
import editor from '@/components/editor/editor.vue';

export default {
  components: {
    editor,
  },
  data() {
    return {
      content: '',
    };
  },
  methods: {
    copy(content) {
      navigator.clipboard
        .writeText(JSON.stringify(content))
        .then(() => {
          console.log(content);
          this.$notify({
            type: 'success',
            title: 'Data copied to clipboard',
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.editor {
  margin: 5rem auto 0;
}
</style>
