<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_faq" v-else>
    <div class="main-title">FAQ</div>
    <button class="add-btn" @click="add"><i class="fe fe-plus"></i>Add QNA</button>
    <div class="speech-section" v-for="(qna, index) in data" :key="index">
      <div class="speechbubble">
        <p>
          <editor
            class="question"
            ref="questions"
            hidebutton
            :editable="is_editing[index]"
            :content="qna.question"></editor>
        </p>
        <!-- <p>{{ qna.question }}</p> -->
      </div>
      <div class="speechbubble">
        <p>
          <editor
            class="answer"
            ref="answers"
            hidebutton
            :editable="is_editing[index]"
            :content="qna.answer"></editor>
        </p>
        <!-- <p>{{ qna.answer }}</p> -->
      </div>
      <div class="control-container">
        <template v-if="!is_editing[index]">
          <i class="fe fe-edit" @click="edit(index, true)"></i>
          <i class="fe fe-trash-2" @click="delete_qna(index)"></i>
        </template>
        <template v-else>
          <i class="fe fe-save" @click.prevent="confirm_edit(index)"></i>
          <i class="fe fe-slash" @click="edit(index, false)"></i>
        </template>
      </div>
    </div>
    <confirm-modal title="Confirm delete?" ref="delete_modal"
      @confirm="confirm_delete_qna"></confirm-modal>
  </div>
</template>

<script>
import editor from '@/components/editor/editor.vue';
import confirmModal from '@/components/confirm_modal.vue';

export default {
  components: {
    editor,
    confirmModal,
  },
  data() {
    return {
      data: [],
      is_editing: [],
      selected_qna_index: null,
      is_loading: true,
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/qna`).then(({ data }) => {
        this.data = data;
        this.is_editing = data.map(() => false);
        this.is_loading = false;
      }).catch((err) => {
        this.$notify({
          type: 'error',
          text: err.message,
        });
        this.loading = false;
      });
    },
    add() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/qna`, {
        question: 'Question',
        answer: 'Answer',
      }).then(() => {
        this.$notify({
          type: 'success',
          title: 'FAQ Created',
        });
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$notify({
            type: 'error',
            title: 'Unauthorized',
            text: 'Please login and try again',
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'An Error Occurred',
            text: err.message,
          });
        }
      }).finally(() => {
        this.is_loading = false;
        setTimeout(this.get, 500);
      });
    },
    edit(index, state) {
      this.is_editing[index] = state;
      this.$forceUpdate();
    },
    confirm_edit(index) {
      const data = {
        ...this.data[index],
        question: JSON.parse(JSON.stringify(this.$refs.questions[index].json)),
        answer: JSON.parse(JSON.stringify(this.$refs.answers[index].json)),
      };
      this.is_loading = true;
      this.api(`/${this.uni_type}/qna`, data, 'put').then(() => {
        this.$notify({
          type: 'success',
          title: 'Updated',
        });
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$notify({
            type: 'error',
            title: 'Unauthorized',
            text: 'Please login and try again',
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'An Error Occurred',
            text: 'Please try again later.',
          });
          this.get();
        }
      }).finally(() => {
        this.is_loading = false;
        this.is_editing[index] = false;
        this.data[index] = { ...data };
        this.$forceUpdate();
      });
    },
    delete_qna(index) {
      this.selected_qna_index = index;
      this.$refs.delete_modal.active = true;
    },
    confirm_delete_qna() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/qna`, { id: this.data[this.selected_qna_index].id }, 'delete')
        .then(() => {
          this.$notify({
            type: 'success',
            title: 'Deleted',
          });
        }).catch((err) => {
          if (err.response.status === 401) {
            this.$notify({
              type: 'error',
              title: 'Unauthorized',
              text: 'Please login and try again',
            });
          } else {
            this.$notify({
              type: 'error',
              title: 'An Error Occurred',
              text: 'Please try again later.',
            });
          }
        }).finally(() => {
          this.is_loading = false;
          this.get();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#_faq {
  width: 60%;
  margin: 0 auto;
  .add-btn {
    display: block;
    width: 100%;
    border-radius: .2rem;
    border: none;
    margin: 1.5rem auto;
    padding: .6rem .2rem;
    color: #fff;
    font-weight: 500;
    font-size: 1.2rem;
    background-color: $primary-color;
    cursor: pointer;
    &:hover {
      background-color: darken($primary-color, 8%);
    }
    &:active, &:focus {
      outline: none;
    }
    i {
      margin-right: .5rem;
    }
  }
  .speech-section {
    position: relative;
    margin-bottom: 8rem;
    .control-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 50%;
      left: 0;
      background-color: #fff;
      border-radius: .2rem;
      box-shadow: 0 2px 6px rgba(#000, .12);
      padding: .5rem;
      transform: translate(-100%, -50%) translateX(-1.2rem);
      i {
        font-size: 1.5rem;
        transition: 300ms;
        cursor: pointer;
        &:hover {
          color: $primary-color;
        }
        &:not(:first-child) {
          margin-top: 1rem;
        }
      }
    }
    .speechbubble {
      $color: #e5e9ed;
      background-color: $color;
      color: $text-gray;
      font-size: 1rem;
      line-height: 1.75;
      border-radius: 5px;
      max-height: 1000px;
      padding: 15px 25px;
      margin-bottom: 50px;
      text-align: left;
      overflow-y: scroll;
      cursor: default;
      //  Border and arrow left
      &:nth-child(2n+1) {
        border-left: 5px solid #db3939;
      }
      &:nth-child(2n+1):after {
        content: '';
        margin-top: -30px;
        padding-top: 0px;
        position: relative;
        bottom: -45px;
        left: 20px;
        border-width: 30px 0 0 30px;
        border-style: solid;
        border-color: $color transparent;
        display: block;
        width: 0;
      }
      //  Border and arrow right
      &:nth-child(2n) {
        border-right: 5px solid #50b842;
      }
      &:nth-child(2n):after {
        content: '';
        margin-top: -30px;
        padding-top: 0px;
        position: relative;
        bottom: -45px;
        left: calc(100% - 50px);
        border-width: 30px 30px 0 0;
        border-style: solid;
        border-color: $color transparent;
        display: block;
        width: 0;
      }
      & > p {
        &:before {
          content: '“';
          font-family: 'Georgia';
          font-size: 2.8rem;
          line-height: 0;
          display: inline-block;
          display: -webkit-inline-box;
        }
        .editor {
          display: inline-block;
          min-width: 100%;
        }
      }
    }
  }
  @media screen and (max-width: 425px) {
    width: 80%;
    .speech-section {
      margin-bottom: 6rem;
      .control-container {
        flex-direction: row;
        top: 100%;
        left: 50%;
        transform: unset;
        transform: translate(-50%, 1.2rem);
        i:not(:first-child) {
          margin-top: 0;
          margin-left: 1rem;
        }
      }
      .speechbubble {
        font-size: .8rem;
        margin-bottom: 40px;
        p:before {
          font-size: 2.3rem;
        }
      }
    }
  }
}
</style>
