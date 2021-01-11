<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_about" v-else>
    <div class="main-title">
      <input type="text" v-if="is_editing" v-model="title">
      <template v-else>{{ title }}</template>
    </div>
    <div class="president">
      <div class="quote-section">
        <textarea name="quote" id="quote" rows="3" class="quote"
          v-if="is_editing" v-model="caption"></textarea>
        <div class="quote" v-else>{{ caption }}</div>
        <div class="name">
          会长
          <input type="text" v-if="is_editing" v-model="president_name">
          <template v-else>{{ president_name }}</template>
        </div>
      </div>
      <img :src="JSON.parse(JSON.stringify(president_picture))"
        :class="{ is_editing }"
        @error="set_alt_img"
        @click="image_upload($event, -1)">
    </div>
    <template v-if="is_editing">
      <draggable class="committee" v-model="members" group="committee">
        <div class="member is_editing" v-for="(member, index) in members" :key="member.id">
          <img :src="JSON.parse(JSON.stringify(member.picture))"
            class="avatar"
            @error="set_alt_img"
            @click="image_upload($event, index)">
          <input type="text" class="pos" v-model="member.position">
          <input type="text" class="name" v-model="member.name">
          <input type="text" class="year" v-model="member.course_year">
          <i class="fe fe-trash-2" @click="delete_member(index)"></i>
        </div>
      </draggable>
      <div class="add-member" @click="add_member">
        <i class="fe fe-plus"></i> Add committee
      </div>
    </template>
    <div class="committee" v-else>
      <div class="member" v-for="member in members" :key="member.id">
        <img :src="member.picture" @error="set_alt_img" class="avatar">
        <div class="pos">{{ member.position }}</div>
        <div class="name">{{ member.name }}</div>
        <div class="year">{{ member.course_year }}</div>
      </div>
    </div>
    <div class="toggle-container">
      <button class="view" v-if="is_editing" @click="save">
        <i class="fe fe-save"></i>
      </button>
      <button class="cancel" v-if="is_editing" @click="cancel">
        <i class="fe fe-slash"></i>
      </button>
      <button class="edit" v-else @click="is_editing = true">
        <i class="fe fe-edit"></i>
      </button>
    </div>
    <div class="undo-container" :class="{ is_show_undo }">
      <span class="dismiss" @click="is_show_undo = false">Dismiss</span>
      <span class="undo" @click="undo_delete">Undo</span>
    </div>
    <modal ref="image_upload">
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
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import modal from '@/components/modal.vue';
import { file_upload } from '@/api';
import avatar from '@/assets/avatar.jpg';

const file_reader = new FileReader();
export default {
  components: {
    draggable,
    modal,
  },
  data() {
    return {
      title: '',
      caption: '',
      president_name: '',
      members: [],
      selected_member_index: null,
      // image upload
      image_data: null,
      image_file: null,
      image_filename: '',
      // undo delete
      undo_timeout: null,
      show_undo_duration: 5000, // ms
      last_member: {
        index: null,
        data: {},
      },
      is_editing: false,
      is_loading: true,
      is_show_undo: false,
      avatar,
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/maincomm`).then(({ data }) => {
        const {
          title, caption, president_name, president_picture, members,
        } = data;
        this.title = title.toUpperCase();
        this.caption = caption;
        this.president_name = president_name;
        this.president_picture = president_picture;
        this.members = members;
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
      const president_picture = this.president_picture.startsWith('data:image')
        ? this.president_picture.split(',')[1]
        : this.president_picture;
      const members = this.members.map((e) => {
        const picture = e.picture.startsWith('data:image') ? e.picture.split(',')[1] : e.picture;
        return { ...e, picture };
      });
      this.is_loading = true;
      this.api(`/${this.uni_type}/maincomm`, {
        title: this.title.toUpperCase(),
        caption: this.caption,
        president_name: this.president_name,
        president_picture,
        members,
      }).then(() => {
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
        } else if (err.response.status === 413) {
          this.$notify({
            type: 'error',
            title: 'File too large',
            text: 'Choose a smaller sized image and try again',
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
    add_member() {
      this.members.push({
        position: '',
        name: '',
        course_year: '',
      });
    },
    delete_member(index) {
      if (this.undo_timeout) {
        clearTimeout(this.undo_timeout);
      }
      this.is_show_undo = true;
      this.last_member.index = index;
      [this.last_member.data] = this.members.splice(index, 1);
      this.undo_timeout = setTimeout(() => {
        this.is_show_undo = false;
        this.last_member = {
          index: null,
          data: {},
        };
        this.undo_timeout = null;
      }, this.show_undo_duration);
    },
    image_upload(event, index) {
      if (!this.is_editing) {
        return;
      }
      this.selected_member_index = index;
      this.$refs.image_upload.active = true;
      this.image_data = event.target.src;
      this.image_filename = '';
    },
    confirm_image_upload() {
      file_upload(this.image_file).then(({ data }) => {
        if (this.selected_member_index === -1) {
          // president
          this.president_picture = data.path;
        } else {
          this.members[this.selected_member_index].picture = data.path;
        }
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
    undo_delete() {
      this.is_show_undo = false;
      this.members.splice(this.last_member.index, 0, this.last_member.data);
    },
    cancel() {
      this.get();
      this.is_editing = false;
    },
    set_alt_img(event) {
      // eslint-disable-next-line
      event.target.src = this.avatar;
    },
  },
};
</script>

<style lang="scss">
#_about {
  padding-top: 2rem;
  padding-bottom: 5rem;
  input, textarea {
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }
  .main-title {
    input {
      text-align: center;
      border: solid 1px $gray-color;
      border-radius: .2rem;
      &:focus {
        outline: none;
        border: solid 1px $primary-color;
      }
    }
  }
  .president, .committee {
    max-width: 80%;
    margin: 0 auto;
  }
  .president {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: 0 3px 12px rgba(#000, .18);
    margin-top: 1rem;
    .quote-section {
      align-self: center;
      width: 65%;
      padding: 2rem 5rem;
      .quote {
        text-align: center;
        font-style: italic;
        font-size: 1.8rem;
        font-weight: 500;
        width: 100%;
      }
      .name {
        text-align: right;
        font-size: 1.2rem;
        font-weight: 500;
        color: $text-gray-light;
        margin-top: 2rem;
        input {
          max-width: 80px;
        }
      }
    }
    img {
      max-width: 35%;
      max-height: 50vh;
      &.is_editing {
        cursor: pointer;
        &:hover {
          filter: brightness(90%) blur(.8px);
        }
      }
    }
  }
  .committee {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 6rem;
    .member {
      position: relative;
      width: 25%;
      min-width: calc(120px + 2 * 1.2rem);
      box-sizing: border-box;
      padding: 1.2rem;
      font-size: 1.2rem;
      &.is_editing {
        border: solid 1px #eee;
        margin: 3px;
        cursor: move;
        .avatar {
          cursor: pointer;
          &:hover {
            filter: brightness(90%) blur(.8px);
          }
        }
        input {
          margin: .2rem 0;
          width: 100%;
          border: solid 1px $gray-color;
          border-radius: .2rem;
          text-align: inherit;
          &:focus {
            outline: none;
            border: solid 1px $primary-color;
          }
        }
        i {
          position: absolute;
          top: 5px;
          right: 5px;
          font-size: 2rem;
          color: $error-color;
          &:hover {
            color: darken($error-color, 12%);
            cursor: pointer;
          }
        }
      }
      .avatar {
        height: 180px;
        width: 180px;
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid #ddd;
        margin-bottom: .5rem;
      }
      .pos {
        font-weight: 500;
        color: $text-gray;
      }
      .name, .year {
        color: $text-gray-light;
      }
    }
  }
  .add-member {
    background-color: $primary-color;
    color: #fff;
    margin: 2rem auto 0;
    padding: .5rem;
    font-size: 1.2rem;
    font-weight: 500;
    border-radius: .2rem;
    width: 50%;
    max-width: 600px;
    cursor: pointer;
    &:hover {
      background-color: darken($primary-color, 8%);
    }
  }
  .undo-container {
    position: absolute;
    top: 0;
    left: 50%;
    background-color: #fff;
    padding: 1rem;
    border: solid 1px #eee;
    border-radius: .2rem;
    box-shadow: 0 2px 6px rgba(#000, .16);
    transform: translate(-50%, -100%);
    transition: 300ms;
    &.is_show_undo {
      top: 50px;
      transform: translate(-50%, 0);
    }
    span {
      margin: 0 1rem;
      font-weight: 500;
      color: $primary-color;
      cursor: pointer;
    }
  }
  .modal {
    .modal-container {
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
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2rem;
          width: 90%;
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
    .president {
      .quote-section {
        padding: 1rem 3rem;
        .quote {
          font-size: 1.6rem;
        }
        .name {
          font-size: 1rem;
        }
      }
    }
    .committee {
      .member {
        font-size: 1rem;
        .avatar {
          height: 120px;
          width: 120px;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .president {
      .quote-section {
        .quote {
          font-size: 1.2rem;
        }
        .name {
          font-size: .9rem;
          margin-top: 1.2rem;
        }
      }
    }
    .committee {
      margin-top: 3rem;
      .member {
        min-width: calc(100px + 2 * 1.2rem);
        font-size: .9rem;
        &.is_editing {
          i {
            font-size: 1.5rem;
          }
        }
        .avatar {
          height: 100px;
          width: 100px;
          overflow: hidden;
        }
      }
    }
    .add-member {
      padding: .2rem;
      font-size: 1rem;
    }
    .modal {
      .modal-container {
        padding: 1rem 2rem;
        .file {
          .file-custom {
            margin-top: 1rem;
          }
        }
      }
    }
  }
  @media screen and (max-width: 425px) {
    padding-top: 4rem;
    .main-title {
      font-size: 1.6rem;
      letter-spacing: 1px;
    }
    .president, .committee {
      max-width: 90%;
    }
    .president {
      margin-top: 0;
      .quote-section {
        padding: 1rem;
        .quote {
          font-size: .8rem;
        }
        .name {
          font-size: .6rem;
          margin-top: 1rem;
          input {
            max-width: 50px;
          }
        }
      }
    }
    .committee {
      margin-top: 2rem;
      .member {
        width: 50%;
        min-width: calc(80px + 2 * 1.2rem);
        font-size: .8rem;
        &.is_editing {
          i {
            font-size: 1.2rem;
          }
        }
        .avatar {
          height: 80px;
          width: 80px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
