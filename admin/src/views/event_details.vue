<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_event_details" v-else>
    <div class="info">
      <div class="image"
        :class="{ is_editing }"
        v-if="picture"
        @click="image_upload">
        <img :src="picture" :alt="title">
        <img :src="picture" class="shadow">
      </div>
      <div class="image-upload" v-else-if="is_editing" @click="image_upload"></div>
      <div class="date-section">
        <i class="fe fe-calendar"></i>
        <input type="text" class="date" placeholder="Date"
          v-if="is_editing" v-model="event_date">
        <div class="date" v-else>{{ event_date }}</div>
      </div>
      <div class="location-section">
        <i class="fe fe-map-pin"></i>
        <input type="text" class="location" placeholder="Location"
          v-if="is_editing" v-model="venue">
        <div class="location" v-else>{{ venue }}</div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <input type="text" class="title" placeholder="Title"
          v-if="is_editing" v-model="title">
        <template v-else>{{ title }}</template>
      </div>
      <small class="subtitle">
        <input type="text" placeholder="Author" v-if="is_editing" v-model="author">
        <template v-else>{{ author }}</template>, {{ created_date }}
      </small>
      <editor
        class="article"
        ref="article"
        hidebutton
        :editable="is_editing"
        :content="content"></editor>
    </div>
    <div class="toggle-container">
      <button class="view" v-if="is_editing" @click="save">
        <i class="fe fe-save"></i>
      </button>
      <button class="cancel" v-if="is_editing" @click="cancel">
        <i class="fe fe-slash"></i>
      </button>
      <!-- <button class="edit" v-else @click="is_editing = true">
        <i class="fe fe-edit"></i>
      </button> -->
      <template v-else>
        <button class="edit" @click="is_editing = true">
          <i class="fe fe-edit"></i>
        </button>
        <button class="delete" @click="delete_event">
          <i class="fe fe-trash-2"></i>
        </button>
      </template>
    </div>
    <modal class="image-modal" ref="image_upload">
      <label class="file">
        <input type="file" id="file"
          aria-label="Upload Image"
          accept="image/png, image/jpeg"
          @change="file_upload_handler">
        <span class="file-custom"></span>
      </label>
      <div class="filename" v-if="image_filename">{{ image_filename }}</div>
      <br>
      <img :src="image_data" alt="">
      <div class="confirm" @click="confirm_image_upload">Confirm</div>
    </modal>
    <confirm-modal title="Confirm delete?" ref="delete_modal"
      @confirm="confirm_delete"></confirm-modal>
  </div>
</template>

<script>
import editor from '@/components/editor/editor.vue';
import confirmModal from '@/components/confirm_modal.vue';
import modal from '@/components/modal.vue';
import { file_upload } from '@/api';

const file_reader = new FileReader();
export default {
  components: {
    editor,
    confirmModal,
    modal,
  },
  data() {
    return {
      event_date: '',
      venue: '',
      title: '',
      author: '',
      created_date: '',
      content: '',
      picture: null,
      is_editing: false,
      is_loading: true,
      // image upload
      image_data: null,
      image_file: null,
      image_filename: '',
    };
  },
  mounted() {
    if (this.$route.hash) {
      this.is_editing = true;
    }
    this.get();
  },
  methods: {
    get() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/event/${this.$route.params.id}`).then(({ data }) => {
        const {
          author, content, created_date, event_date, picture, title, venue,
        } = data;
        this.author = author;
        this.content = content;
        this.created_date = created_date;
        this.event_date = event_date;
        this.picture = picture;
        this.title = title;
        this.venue = venue;
      }).catch((err) => {
        this.$notify({
          type: 'error',
          text: err.message,
        });
      }).finally(() => {
        this.is_loading = false;
      });
    },
    save() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/event`, {
        id: this.$route.params.id,
        author: this.author,
        content: this.$refs.article.json,
        created_date: this.created_date,
        event_date: this.event_date,
        picture: this.picture,
        title: this.title,
        venue: this.venue,
      }, 'put').then(() => {
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
        }
      }).finally(() => {
        this.is_editing = false;
        this.is_loading = false;
        this.get();
      });
    },
    delete_event() {
      this.$refs.delete_modal.active = true;
    },
    confirm_delete() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/event`, { id: this.$route.params.id }, 'delete')
        .then(() => {
          this.$notify({
            type: 'success',
            title: 'Deleted',
          });
          this.$router.push('/event');
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
          this.is_editing = false;
          this.is_loading = false;
          this.get();
        });
    },
    image_upload(event) {
      if (!this.is_editing) {
        return;
      }
      this.$refs.image_upload.active = true;
      this.image_data = event.target.src;
      this.image_file = null;
      this.image_filename = '';
    },
    confirm_image_upload() {
      file_upload(this.image_file).then(({ data }) => {
        this.picture = data.path;
        this.$forceUpdate();
      }).catch(() => {
        this.$notify({
          type: 'error',
          title: 'File Upload Failed',
          text: 'Try again',
        });
      }).finally(() => {
        this.$refs.image_upload.active = false;
      });
    },
    file_upload_handler(event) {
      file_reader.addEventListener('load', () => {
        this.image_data = file_reader.result;
      });
      const file = event.target.files[0];
      this.image_file = file;
      this.image_filename = file.name;
      file_reader.readAsDataURL(file);
    },
    cancel() {
      this.get();
      this.is_editing = false;
    },
  },
};
</script>

<style lang="scss">
#_event_details {
  display: flex;
  padding: 3rem 6rem 0;
  input {
    border: solid 1px $gray-color;
    border-radius: .2rem;
    &:focus {
      outline: none;
      border: solid 1px $primary-color;
    }
  }
  .info {
    width: 25%;
    .image {
      position: relative;
      margin-bottom: 1.5rem;
      transition: 300ms;
      &::before {
        content: 'Upload image';
        padding: .2rem .5rem;
        border-radius: .2rem;
        background-color: #eee;
        opacity: 0;
        transition: 300ms;
        z-index: 10;
      }
      &.is_editing {
        cursor: pointer;
        &:hover {
          &::before {
            opacity: 1;
          }
          img {
            filter: blur(1px);
          }
        }
      }
      img {
        width: 100%;
        height: auto;
        &.shadow {
          position: absolute;
          top: 2px;
          left: 0;
          filter: blur(6px);
          z-index: -1;
        }
      }
    }
    .image-upload {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e0e0e0;
      height: 200px;
      cursor: pointer;
      &::before {
        content: 'Upload image';
        padding: .2rem .5rem;
        border-radius: .2rem;
        background-color: #eee;
        opacity: 0;
        transition: 300ms;
      }
      &:hover::before {
        opacity: 1;
      }
    }
    .date-section, .location-section {
      display: flex;
      align-items: center;
      margin: .8rem 0;
      * {
        font-size: 1.2rem;
        color: $text-gray;
      }
      i { margin-right: .5rem; }
    }
  }
  .main {
    box-sizing: border-box;
    width: 75%;
    padding-left: 5rem;
    text-align: left;
    .title {
      margin-bottom: 0;
      font-size: 2.6rem;
      i {
        font-size: 1.5rem;
        color: $text-gray-light;
        cursor: pointer;
        transition: 300ms;
        &:hover { color: darken($color: $text-gray-light, $amount: 12%); }
      }
    }
    .subtitle, .subtitle * { color: $text-gray-light; }
    .article {
      font-size: 1.2rem;
      margin-top: 2rem;
    }
  }
  .image-modal {
    .modal-container {
      display: block;
      min-width: 280px;
      box-sizing: border-box;
      padding-bottom: 3rem;
      .file {
        position: relative;
        height: 2rem;
        width: 100%;
        cursor: pointer;
        input {
          opacity: 0;
          width: 100%;
        }
        .file-custom {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2rem;
          width: calc(100% - 1px - 2rem);
          // width: 200px;
          margin-top: 2rem;
          padding: .5rem 1rem;
          line-height: 1.8;
          border: solid 1px #ddd;
          border-radius: .3rem;
          z-index: 2;
          &::before {
            content: 'Browse';
            position: absolute;
            top: -1px;
            bottom: -1px;
            right: -1px;
            height: calc(2rem + 2px);
            line-height: 1.8;
            padding: .5rem .8rem;
            background-color: $primary-color-dark;
            color: #fff;
            border-top-right-radius: .3rem;
            border-bottom-right-radius: .3rem;
            z-index: 3;
          }
          &::after {
            content: 'Choose image...';
          }
        }
      }
      .filename {
        display: inline-block;
        margin-top: 4rem;
        background-color: $primary-color-dark;
        color: #fff;
        border-radius: .5rem;
        padding: .5rem .8rem;
      }
      img {
        max-width: 100%;
        max-height: 400px;
        margin-top: 5rem;
      }
      .confirm {
        background-color: $primary-color;
        color: #fff;
        margin-top: 2rem;
        padding: .5rem .8rem;
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
        border: none;
        border-radius: .2rem;
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 2rem 4rem 0;
    .main { padding-left: 4rem; }
  }
  @media screen and (max-width: 768px) {
    .info {
      .date-section, .location-section {
        margin: .5rem 0;
        * {
          font-size: 1rem;
        }
      }
    }
    .main {
      padding-left: 3rem;
      .title {
        font-size: 2rem;
        i { display: none; }
      }
    }
  }
  @media screen and (max-width: 425px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem 2rem 0;
    .info {
      width: 70%;
      margin-bottom: 1rem;
      .image { margin-bottom: 1rem; }
      .date-section, .location-section {
        margin: .3rem 0;
        * {
          font-size: .8rem;
        }
      }
    }
    .main {
      width: 100%;
      padding-left: 0;
    }
  }
}
</style>
