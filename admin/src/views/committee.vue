<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_about" v-else>
    <div class="main-title">
      <input type="text" v-if="is_editing" v-model="year">
      <template v-else>{{ year }}</template> MAIN COMM
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
      <img :src="president_picture" @error="set_alt_img" :class="{ is_editing }">
    </div>
    <draggable class="committee" v-if="is_editing" v-model="members" group="committee">
      <div class="member is_editing" v-for="(member, index) in members" :key="member.id">
        <img :src="member.picture" @error="set_alt_img" class="avatar">
        <input type="text" class="pos" v-model="member.position">
        <input type="text" class="name" v-model="member.name">
        <input type="text" class="year" v-model="member.course_year">
        <i class="fe fe-trash-2" @click="delete_member(index)"></i>
      </div>
    </draggable>
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
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import avatar from '@/assets/avatar.jpg';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      year: '',
      caption: '',
      president_name: '',
      members: [],
      selected_member_index: null,
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
          year, caption, president_name, president_picture, members,
        } = data;
        this.year = year;
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
      this.is_loading = true;
      this.api(`/${this.uni_type}/maincomm`, {
        year: this.year,
        caption: this.caption,
        president_name: this.president_name,
        president_picture: this.president_picture,
        members: this.members,
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
    delete_member(index) {
      if (this.undo_timeout) {
        clearTimeout(this.undo_timeout);
      }
      this.is_show_undo = true;
      this.last_member.index = index;
      [this.last_member.data] = this.members.splice(index, 1);
      this.undo_timeout = setTimeout(() => {
        this.is_show_undo = false;
        this.undo_timeout = null;
      }, this.show_undo_duration);
    },
    undo_delete() {
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
  padding-bottom: 2rem;
  input, textarea {
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }
  .main-title {
    input {
      max-width: 160px;
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
  @media screen and (max-width: 1024px) {
    .president {
      .quote-section {
        padding: 1rem 3rem;
        .quote {
          font-size: 1.6rem;
        }
        .name {
          font-size: 1rem;
          input {
            max-width: 70px;
          }
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
          input {
            max-width: 60px;
          }
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
  }
  @media screen and (max-width: 425px) {
    padding-top: 4rem;
    .main-title {
      font-size: 1.6rem;
      letter-spacing: 1px;
      input {
        max-width: 80px;
      }
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
