<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_foc" v-else :class="{ is_editing }">
    <div class="banner"
      :style="{
        'background-image': `url(${picture})`,
      }">
      <div class="title">
        <textarea name="title" id="title" cols="30" rows="2"
          v-model="title" v-if="is_editing"></textarea>
        <div v-for="(str, index) in display_title" :key="index"
          v-else>{{ str }}</div>
      </div>
    </div>
    <div class="content">
      <div class="title">What is FOC?</div>
      <div class="intro">
          <div v-if="is_editing || intro_video">
            <iframe
              width="560"
              height="315"
              :src="intro_video"
              frameborder="0"
              allow="
                accelerometer; autoplay;
                clipboard-write; encrypted-media;
                gyroscope; picture-in-picture"
              allowfullscreen
              v-if="intro_video"></iframe>
            <div class="form-group" v-if="is_editing">
              <input type="text" id="intro_video" class="form-input"
                :class="{'filled': intro_video}" v-model="intro_video">
              <label for="intro_video" class="form-label">Video URL</label>
            </div>
          </div>
          <editor
            class="body"
            ref="content"
            hidebutton
            :editable="is_editing"
            :content="content"></editor>
      </div>
      <div class="ticket" @click="is_editing ? () => {} : navigate(registration.form_link)">
        <div class="details">
          <div class="date">
            <div class="title">Date</div>
            <input class="text" type="text" v-if="is_editing" v-model="registration.date">
            <div class="text" v-else>{{ registration.date }}</div>
          </div>
          <div class="venue">
            <div class="title">Venue</div>
            <input class="text" type="text" v-if="is_editing" v-model="registration.venue">
            <div class="text" v-else>{{ registration.venue }}</div>
          </div>
          <div class="fees">
            <div class="title">Fees</div>
            <input class="text" type="text" v-if="is_editing" v-model="registration.fees">
            <div class="text" v-else>{{ registration.fees }}</div>
          </div>
          <small class="deadline">
            报名截止日期：
            <input class="text" type="text" v-if="is_editing" v-model="registration.deadline">
            <span v-else>{{ registration.deadline }}</span>
          </small>
        </div>
        <div class="arrow">
          <i class="fe fe-arrow-right-circle"></i>
        </div>
      </div>
      <div class="form-group" v-if="is_editing">
        <input type="text" id="form_link" class="form-input"
          :class="{'filled': registration.form_link}" v-model="registration.form_link">
        <label for="form_link" class="form-label">Form Link</label>
      </div>
      <div class="title">Camp Activites</div>
      <editor
        class="activities"
        ref="activities"
        hidebutton
        :editable="is_editing"
        :content="activities"></editor>
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
  </div>
</template>

<script>
const editor = () => import('@/components/editor/editor.vue');
export default {
  components: {
    editor,
  },
  data() {
    return {
      picture: '',
      title: '',
      intro_video: '',
      content: {
        type: 'doc',
        content: [],
      },
      activities: {
        type: 'doc',
        content: [],
      },
      registration: {
        date: '',
        venue: '',
        fees: '',
        deadline: '',
        form_link: '',
      },
      is_editing: false,
      is_loading: true,
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/foc`).then(({ data }) => {
        const {
          picture, intro_video, content, activities, title, registration,
        } = data;
        this.picture = picture;
        this.title = title;
        this.intro_video = intro_video;
        this.content = content;
        console.log(this.content);
        this.activities = activities;
        this.registration = registration;
        this.is_loading = false;
      }).catch((err) => {
        this.$notify({
          type: 'error',
          text: err.message,
        });
        this.loading = false;
      });
    },
    save() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/foc`, {
        picture: this.picture,
        intro_video: this.intro_video,
        content: this.$refs.content.json,
        activities: this.$refs.activities.json,
        registration: this.registration,
        title: this.title,
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
    cancel() {
      this.get();
      this.is_editing = false;
    },
    navigate(url) {
      window.open(`${url.startsWith('http') ? '' : 'http://'}${url}`);
    },
  },
  computed: {
    display_title() {
      return this.title.split('\n');
    },
  },
};
</script>

<style lang="scss">
#_foc {
  &.is_editing .editor {
    border: solid 1px #ddd;
  }
  .form-group {
    position: relative;
    margin: 1.8rem 0;
    * { transition: 300ms; }
    .form-label {
      position: absolute;
      top: 50%;
      left: .8rem;
      font-size: 1.2rem;
      transform: translateY(-50%);
      color: $gray-color;
      background-color: white;
    }
    .form-input {
      box-sizing: border-box;
      width: 100%;
      border: solid 1px $gray-color;
      border-radius: .1rem;
      padding: .8rem;
      font-size: 1rem;
      line-height: 1.2rem;
      letter-spacing: 1.5px;
      &:active, &:focus, &:focus-within, &.filled {
        outline: none;
        border-color: $primary-color;
        border-radius: .4rem;
        &+.form-label {
          top: 0;
          color: $primary-color;
          font-size: .8rem;
          padding: .2rem;
          transform: translateY(-50%);
        }
      }
      &:active, &:focus, &:focus-within {
        border-color: $primary-color !important;
        &+.form-label {
          color: $primary-color !important;
        }
      }
      &.filled {
        border-color: unset;
        &+.form-label {
          color: unset;
        }
      }
    }
  }
  .banner {
    position: relative;
    height: 60vh;
    max-height: 90vw;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#000, .38);
    }
    img {
      position: absolute;
      height: 60vh;
      max-height: 90vw;
      width: 100vw;
    }
    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      max-width: 100vw;
      transform: translate(-50%, -50%);
      div, textarea {
        font-size: 3rem;
        line-height: 3.5rem;
        color: #fff;
        font-weight: 800;
        background: inherit;
        text-align: center;
        max-width: 98vw !important;
      }
    }
  }
  .content {
    padding: 1rem 10rem 0;
    .title {
      font-size: 2.5rem;
      letter-spacing: 1px;
      color: $primary-orange;
      margin: 2rem 0;
    }
    .intro {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 4rem;
      iframe {
        width: 100%;
        max-height: 20vw;
      }
    }
    .ticket {
      display: flex;
      width: 100%;
      box-shadow: 0 2px 8px rgba(#000, .18);
      margin: 3rem 0;
      transition: 300ms;
      cursor: pointer;
      &:hover {
        .arrow { background-color: $primary-orange; }
        .details .title { color: $primary-orange; }
        box-shadow: 0 8px 18px rgba(#000, .18);
      }
      .details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 2rem;
        align-items: center;
        text-align: left;
        padding: 2rem 4rem;
        box-sizing: border-box;
        background-color: #fff;
        width: 70%;
        box-sizing: border-box;
        overflow: scroll;
        .title {
          font-size: 1.2rem;
          font-weight: 800;
          color: $text-gray;
          margin: 0;
          transition: 300ms;
        }
        .text {
          font-size: 1.8rem;
          color: $text-gray-light;
        }
        .deadline {
          font-weight: 600;
          color: #F52827;
        }
        input {
          // padding: .3rem .6rem;
          border: solid 1px $gray-color;
          border-radius: .2rem;
          &:focus {
            outline: none;
            border: solid 1px $primary-color;
          }
        }
      }
      .arrow {
        position: relative;
        width: 30%;
        color: #fff;
        background-color: #000;
        transition: 300ms;
        padding: 0 1rem;
        i {
          position: absolute;
          top: 50%;
          left: 50%;
          font-size: 13rem;
          transform: translate(-50%, -50%);
        }
      }
    }
    .activities {
      max-width: unset;
      width: 100%;
    }
  }
  @media screen and (max-width: 1024px) {
    .content {
      padding: 1rem 6rem 0;
      .ticket {
        .details {
          grid-gap: 1.5rem;
          padding: 2rem 3rem;
          .title { font-size: 1rem; }
          .text { font-size: 1.6rem; }
          .deadline { font-size: .7rem; }
        }
        .arrow i { font-size: 10rem; }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .banner .title {
      font-size: 2.5rem;
      line-height: 2.8rem;
    }
    .content {
      padding: 1rem 4rem 0;
      .title { font-size: 2.3rem; }
      .intro {
        grid-template-columns: 1fr;
        iframe {
          max-height: 40vw;
        }
      }
      .ticket {
        .details {
          grid-gap: 1rem;
          padding: 2rem 2.5rem;
          .title { font-size: .8rem; }
          .text { font-size: 1.2rem; }
          .deadline { font-size: .6rem; }
        }
        .arrow i { font-size: 8rem; }
      }
    }
  }
  @media screen and (max-width: 425px) {
    .banner .title {
      width: 90vw;
      font-size: 2rem;
      line-height: 2.3rem;
    }
    .content {
      padding: 1rem 2rem 0;
      .title { font-size: 2rem; }
      .intro {
        font-size: .9rem;
      }
      .ticket {
        flex-direction: column;
        .details {
          width: 100%;
          padding: 1rem 2rem;
          .title { font-size: .7rem; }
          .text { font-size: 1rem; }
          .deadline { font-size: .5rem; }
        }
        .arrow {
          width: 100%;
          padding: 1rem 0;
          i {
            position: unset;
            font-size: 6rem;
          }
        }
      }
      .activities {
        font-size: .9rem;
      }
    }
  }
}
.ntu #_foc {
  .content {
    .title {
      color: $primary-red;
    }
    .ticket:hover {
      .arrow { background-color: $primary-red; }
      .details .title { color: $primary-red; }
    }
  }
}
</style>
