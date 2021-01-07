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
    <div class="committee">
      <div class="member" :class="{ is_editing }" v-for="member in members" :key="member.id">
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
  </div>
</template>

<script>
import avatar from '@/assets/avatar.jpg';

export default {
  metaInfo() {
    return {
      title: this.$route.params.uni.toUpperCase().concat(' | AMCISA'),
    };
  },
  data() {
    return {
      year: '',
      caption: '',
      president_name: '',
      members: [],
      is_editing: false,
      is_loading: true,
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
      // save
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
      width: 25%;
      min-width: calc(120px + 2 * 1.2rem);
      box-sizing: border-box;
      padding: 1.2rem;
      font-size: 1.2rem;
      &.is_editing {
        border: solid 1px #eee;
        .avatar {
          cursor: pointer;
          &:hover {
            filter: brightness(90%) blur(.8px);
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
