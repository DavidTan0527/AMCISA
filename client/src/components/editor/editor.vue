<template>
  <div id="_editor" class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }" v-if="editable">
      <div class="menubar">

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon name="bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon name="italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <icon name="strike" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon name="underline" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <icon name="code" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <icon name="paragraph" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
        >
          <icon name="image" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <icon name="ul" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <icon name="ol" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <icon name="quote" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <icon name="code" />
        </button>

        <button
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          <icon name="hr" />
        </button>

        <button
          class="menubar__button"
          @click="commands.undo"
        >
          <icon name="undo" />
        </button>

        <button
          class="menubar__button"
          @click="commands.redo"
        >
          <icon name="redo" />
        </button>

        <button
          class="menubar__button"
          @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
        >
          <icon name="table" />
        </button>

        <span v-if="isActive.table()">
          <button
            class="menubar__button"
            @click="commands.deleteTable"
          >
            <icon name="delete_table" />
          </button>
          <button
            class="menubar__button"
            @click="commands.addColumnBefore"
          >
            <icon name="add_col_before" />
          </button>
          <button
            class="menubar__button"
            @click="commands.addColumnAfter"
          >
            <icon name="add_col_after" />
          </button>
          <button
            class="menubar__button"
            @click="commands.deleteColumn"
          >
            <icon name="delete_col" />
          </button>
          <button
            class="menubar__button"
            @click="commands.addRowBefore"
          >
            <icon name="add_row_before" />
          </button>
          <button
            class="menubar__button"
            @click="commands.addRowAfter"
          >
            <icon name="add_row_after" />
          </button>
          <button
            class="menubar__button"
            @click="commands.deleteRow"
          >
            <icon name="delete_row" />
          </button>
          <button
            class="menubar__button"
            @click="commands.toggleCellMerge"
          >
            <icon name="combine_cells" />
          </button>
        </span>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />

    <button class="btn-done" @click="save_changes" v-if="editable">Done</button>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  Image,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Strike,
  Underline,
  History,
  Placeholder,
  TrailingNode,
} from 'tiptap-extensions';
import Icon from './icon.vue';

export default {
  components: {
    EditorMenuBar,
    EditorContent,
    Icon,
  },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Object],
      default: '',
    },
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Image(),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Enter something...',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
          new TrailingNode({
            node: 'paragraph',
            notAfter: ['paragraph'],
          }),
          new Table({
            resizable: true,
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
        ],
        content: '',
        onUpdate: ({ getJSON }) => { this.json = getJSON(); },
      }),
      json: '',
    };
  },
  mounted() {
    this.editor.setOptions({ editable: this.editable });
    this.editor.setContent(this.content, true);
  },
  methods: {
    clear_content() {
      this.editor.clearContent();
    },
    save_changes() {
      this.$emit('update', this.json);
    },
    showImagePrompt(command) {
      // eslint-disable-next-line
      const src = prompt('Enter the url of your image here');
      if (src !== null) {
        command({ src });
      }
    },
  },
  watch: {
    editable() {
      this.editor.setOptions({
        editable: this.editable,
      });
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
#_editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
</style>
