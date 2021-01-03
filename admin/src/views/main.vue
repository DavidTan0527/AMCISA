<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_main" v-else>
    <div class="foc" :class="{
      'editing': is_editing,
      'hidden' : !notify_foc,
      }" v-if="notify_foc || is_editing">
      <div class="main-title">FOC</div>
      <div class="body">
        Freshman Orientation Camp 21/22 is open for registration!!!
      </div>
      <button class="btn-round" @click="$router.push('/foc')">
        Check It Out!!! <i class="fe fe-arrow-right"></i>
      </button>
      <span class="view-btn" v-if="is_editing">
        <i class="fe fe-eye" v-if="notify_foc" @click="notify_foc = false"></i>
        <i class="fe fe-eye-off" v-else @click="notify_foc = true"></i>
      </span>
    </div>
    <div class="events">
      <div class="main-title">EVENTS</div>
      <div class="body">
        <timeline :data="events" />
      </div>
      <button class="btn-round" @click="goto('event')">
        View All Events
      </button>
    </div>
    <div class="admission" id="admission">
      <div class="main-title">ADMISSION</div>
      <div class="body">
        <div class="step" v-for="(step, index) in admission" :key="index">
          <div class="title">{{ step.title }}</div>
          <!-- <div class="content">{{ step.content }}</div> -->
          <editor
            class="content"
            :key="`article-${index}`"
            hidebutton
            :editable="is_editing"
            :content="step.content"></editor>
          <!-- <ul class="content">
            <li>Choose your course of study</li>
            <li>Complete online application form</li>
            <li>Apply for tuition grant</li>
          </ul> -->
        </div>
      </div>
      <button class="btn-round" @click="goto('faq')">
        Details & FAQ
      </button>
    </div>
    <div class="toggle-container">
      <button class="view" v-if="is_editing" @click="save">
        <i class="fe fe-save"></i>
      </button>
      <button class="edit" v-else @click="is_editing = true">
        <i class="fe fe-edit"></i>
      </button>
    </div>
  </div>
</template>

<script>
import editor from '@/components/editor/editor.vue';
import timeline from '@/components/timeline.vue';

export default {
  metaInfo() {
    return {
      title: this.$route.params.uni.toUpperCase().concat(' | AMCISA'),
    };
  },
  components: {
    timeline,
    editor,
  },
  data: () => ({
    notify_foc: false,
    events: [],
    admission: [],
    is_editing: false,
    is_loading: true,
  }),
  mounted() {
    this.api('/nus/landing').then(({ data }) => {
      const { notify_foc, events, admission } = data;
      this.notify_foc = notify_foc;
      this.events = events;
      this.admission = admission;
      this.is_loading = false;
    }).catch((err) => {
      this.$notify({
        type: 'error',
        text: err.message,
      });
      this.loading = false;
    });
  },
  methods: {
    goto(path) {
      this.$router.push(`/nus/${path}`);
    },
    save() {
      console.log('saved');
      this.is_editing = false;
    },
  },
};
</script>

<style lang="scss">
#_main {
  padding-top: 2rem;
  & > div {
    &:not(:first-of-type) {
      margin-top: 10rem;
    }
    .btn-round {
      font-size: 1.2rem;
    }
  }
  .foc {
    position: relative;
    display: inline-block;
    width: 70%;
    &.editing {
      border: dashed 1px $primary-color;
      &.hidden {
        filter: opacity(50%);
      }
    }
    .body {
      max-width: 600px;
      font-size: 2.3rem;
      font-weight: 300;
      margin: 0 auto 2rem;
    }
    .view-btn {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 100%);
      font-size: 2.3rem;
    }
  }
  .events {
    .body {
      margin-top: 150px;
    }
    button {
      margin-top: 200px;
    }
  }
  .admission {
    .body {
      display: flex;
      .step {
        flex-grow: 1;
        color: #fff;
        min-height: 200px;
        padding: 3rem 2rem;
        text-align: left;
        &:nth-child(even) {
          background-color: $primary-blue;
        }
        .title {
          font-family: 'Source Code Pro';
          font-size: 2rem;
          font-weight: 500;
          margin-bottom: .5rem;
        }
        .content {
          line-height: 2rem;
        }
        ul {
          padding-inline-start: 20px;
        }
      }
    }
    .btn-round {
      margin-top: 5rem;
    }
  }
  @media screen and (max-width: 768px) {
    & > div {
      &:not(:first-of-type) {
        margin-top: 7rem;
      }
      .btn-round {
        font-size: 1rem;
      }
    }
    .foc .body {
      font-size: 1.8rem;
    }
    .events .body {
      margin-top: 100px;
    }
    .admission .body .step {
      .title {
        font-size: 1.6rem;
      }
      .content {
        font-size: .8rem;
      }
    }
  }
  @media screen and (max-width: 425px) {
    & > div {
      &:not(:first-of-type) {
        margin-top: 5rem;
      }
      .btn-round {
        font-size: .8rem;
      }
    }
    .foc .body {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
    .events {
      .body {
        margin-top: 60px;
      }
      .btn-round {
        margin-top: 100px;
      }
    }
    .admission {
      .body {
        flex-direction: column;
        .step {
          padding: 1rem 2rem;
          min-height: initial;
          .title {
            font-size: 1.2rem;
          }
          .content {
            font-size: .8rem;
          }
        }
      }
      .btn-round {
        margin-top: 3rem;
      }
    }
  }
}
.nus #_main {
  .admission .body .step:nth-child(odd) {
    background-color: $primary-orange;
  }
}
.ntu #_main {
  .admission .body .step:nth-child(odd) {
    background-color: $primary-red;
  }
}
</style>
