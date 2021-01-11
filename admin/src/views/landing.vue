<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_home" v-else>
    <nav class="navbar">
      <section class="navbar-title">
        <img src="@/assets/logo.png" alt="AMCISA">
      </section>
    </nav>

    <div class="main-card">
      <img class="svg" src="@/assets/svg/having_fun.svg" loading="lazy">
      <div class="slogan-section">
        <div class="slogan-1">
          "Where no one
        </div>
        <div class="slogan-2">
          is left behind"
        </div>
        <span class="quote">––Amcisa</span>
      </div>
    </div>

    <div class="about-card">
      <div class="info-section">
        <header>About Us</header>
        <editor
          class="body"
          :class="{ is_editing }"
          ref="about"
          hidebutton
          :editable="is_editing"
          :content="about"></editor>
        <!-- <textarea name="about" id="about" cols="20" rows="6"
          class="body edit" v-if="is_editing" v-model="about"></textarea>
        <p class="body" v-else>{{ about }}</p> -->
      </div>
      <img class="svg" src="@/assets/svg/around_the_world.svg" loading="lazy">
    </div>

    <div class="explore">
      <header>Explore</header>
      <editor
        class="body"
        ref="explore"
        hidebutton
        :editable="is_editing"
        :content="explore"></editor>
      <!-- <textarea name="explore" id="explore" cols="60" rows="3"
        class="body" v-if="is_editing" v-model="explore"></textarea>
      <div class="body" v-else>
        {{ explore }}
      </div> -->
      <div class="btns">
        <div class="btn-nus" @click="$router.push('/main')">
          <div class="img"></div>
        </div>
        <div class="btn-ntu" @click="$router.push('/main')">
          <div class="img"></div>
        </div>
      </div>
    </div>

    <footer>
      2020 © AMCISA
    </footer>
    <div class="background-rect"></div>
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
import editor from '@/components/editor/editor.vue';

export default {
  components: {
    editor,
  },
  data: () => ({
    quote: '',
    about: '',
    explore: '',
    is_editing: false,
    is_loading: true,
  }),
  mounted() {
    this.get();
  },
  methods: {
    get() {
      this.is_loading = true;
      this.api('/main').then(({ data }) => {
        const { quote, about, explore } = data;
        this.quote = quote;
        this.about = about;
        this.explore = explore;
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
      this.api('/main', {
        quote: this.quote,
        about: this.$refs.about.json,
        explore: this.$refs.explore.json,
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
  },
};
</script>

<style lang="scss">
#_home {
  position: relative;
  width: 100%;
  overflow: hidden;
  .navbar {
    display: flex;
    margin-bottom: 1rem;
    padding: 0 3rem;
    .navbar-title {
      img {
        height: 10rem;
      }
    }
  }
  .main-card, .about-card {
    border-radius: .6rem;
    box-shadow: 0 3px 18px rgba(#001C5A, .18);
    display: flex;
    .svg {
      max-width: 40%;
    }
  }
  .main-card {
    background-color: #fff;
    width: 70%;
    max-height: 300px;
    overflow: visible;
    margin-left: 10%;
    padding: 3rem 2rem;
    z-index: 1;
    .slogan-section {
      display: flex;
      flex-direction: column;
      width: 60%;
      margin-bottom: 300px;
      .slogan-1, .slogan-2 {
        align-self: flex-start;
        font-size: 3.5rem;
        letter-spacing: 2.5px;
        font-family: 'Noteworthy';
      }
      .slogan-2 {
        margin-top: -.5rem;
        margin-left: 2ch;
      }
      .quote {
        align-self: flex-end;
        margin-right: 1rem;
        font-size: 1.5rem;
        letter-spacing: 1.2px;
        color: $text-gray-light;
      }

    }
  }
  .about-card {
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(#204278, #61c7d0);
    width: 50%;
    max-height: 500px;
    margin-left: 40%;
    margin-top: -100px;
    padding: 1rem 2rem 1.2rem;
    z-index: 2;
    overflow: auto;
    .info-section {
      text-align: left;
      margin-right: .8rem;
      min-width: 50%;
      header {
        color: #fff;
        font-size: 3rem;
        font-weight: 300;
      }
      .body {
        color: #fff;
        font-size: 1.2rem;
        background-color: inherit;
        &.is_editing {
          border: solid 1px rgba(#fff, .5);
        }
      }
    }
    .svg {
      align-self: flex-start;
    }
  }
  .explore {
    margin-top: 300px;
    header {
      font-size: 3rem;
      font-weight: 300;
      letter-spacing: 2px;
    }
    .body {
      color: $text-gray-light;
      font-size: 1.8rem;
      font-weight: 300;
      max-width: 70%;
      margin: 0 auto;
      * {
        text-align: center;
      }
    }
    .btns {
      display: flex;
      justify-content: space-evenly;
      margin-top: 2rem;
      padding: 0 5%;
      .btn-nus, .btn-ntu {
        border-radius: 1.5rem;
        box-shadow: 0 10px 16px rgba(#000, .18);
        width: 35%;
        max-width: 500px;
        height: auto;
        padding: 5rem 2rem;
        cursor: pointer;
        transition: 300ms;
        &:hover {
          box-shadow: 0 24px 26px rgba(#000, .18);
        }
        .img {
          height: 150px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          margin: 0 auto;
        }
      }
      .btn-nus {
        background-color: #F4EAE4;
        .img {
          background-image: url('../assets/nus.png');
        }
      }
      .btn-ntu {
        background-color: #E4E4E9;
        .img {
          background-image: url('../assets/ntu.png');
        }
      }
    }
  }
  footer {
    width: 100%;
    background-color: $primary-blue;
    color: #fff;
    margin-top: 2rem;
    padding: 7rem 0 2rem;
    clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 55%);
  }
  .background-rect {
    background-color: rgba(#61c7d0, .4);
    z-index: -99;
    position: absolute;
    top: 150px;
    transform: translateX(-25%) rotate(-15deg);
    height: 550px;
    width: 200%;
    overflow: auto;
  }
  // Responsive
  @media screen and (max-width: 1024px) {
    .explore {
      margin-top: 200px;
      .btns {
        .btn-nus, .btn-ntu {
          .img {
            height: 100px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .navbar {
      padding: 0 2rem;
      .navbar-title {
        img {
          height: 8rem;
        }
      }
    }
    .main-card {
      max-height: 200px;
      padding: 2rem;
      .slogan-section {
        .slogan-1, .slogan-2 {
          font-size: 2.8rem;
          letter-spacing: 2px;
        }
        .quote {
          font-size: 1.2rem;
          letter-spacing: 1px;
        }
      }
    }
    .about-card {
      margin-top: -50px;
      .info-section {
        margin-right: .8rem;
        header {
          font-size: 2.5rem;
          font-weight: 300;
        }
        .body {
          font-size: 1rem;
        }
      }
    }
    .explore {
      margin-top: 150px;
      header {
        font-size: 2.6rem;
        letter-spacing: 1.5px;
      }
      .body {
        font-size: 1rem;
      }
      .btns {
        flex-direction: column;
        align-items: center;
        .btn-nus, .btn-ntu {
          width: 50%;
          padding: 4rem 2rem;
          .img {
            height: 120px;
          }
        }
        .btn-nus {
          margin-bottom: 1.5rem;
        }
        .btn-ntu {
          margin-top: 1.5rem;
        }
      }
    }
    footer {
      padding: 5rem 0 1.5rem;
      .icons {
        .fe {
          font-size: 1.5rem;
        }
      }
    }
    .background-rect {
      height: 450px;
    }
  }
  @media screen and (max-width: 625px) {
    .navbar {
      .navbar-title {
        img {
          height: 6rem;
        }
      }
    }
    .main-card {
      width: 80%;
      margin: 0 auto;
      padding: 1.8rem 1rem;
      max-height: 200px;
      .slogan-section {
        margin-bottom: 0;
        .slogan-1, .slogan-2 {
          font-size: 1.3rem;
          letter-spacing: 1.5px;
        }
        .quote {
          font-size: 1rem;
        }
      }
    }
    .about-card {
      width: 80%;
      margin: 2rem auto 0;
      padding: 1rem 1rem 1.2rem;
      .info-section {
        margin-right: .8rem;
        header {
          font-size: 2rem;
          font-weight: 300;
        }
        .body {
          font-size: .9rem;
        }
      }
    }
    .explore {
      margin-top: 100px;
      .btns {
        .btn-nus, .btn-ntu {
          width: 50%;
          padding: 2rem;
          .img {
            height: 80px;
          }
        }
        .btn-nus {
          .img {
            background-image: url('../assets/nus_name.png');
          }
        }
        .btn-ntu {
          .img {
            background-image: url('../assets/ntu_name.png');
          }
        }
      }
    }
    footer {
      padding: 3rem 0 1.5rem;
      clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 30%);
      .icons {
        margin: 1.5rem 0 1rem;
        .fe {
          border-width: 1.8px;
          font-size: 1.2rem;
        }
      }
    }
    .background-rect {
      height: 400px;
    }
  }
}
</style>
