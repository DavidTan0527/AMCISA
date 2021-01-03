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
          <input type="text" class="title" v-if="is_editing" v-model="step.title">
          <div class="title" v-else>{{ step.title }}</div>
          <!-- <div class="content">{{ step.content }}</div> -->
          <editor
            class="content"
            ref="articles"
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
import timeline from '@/components/timeline.vue';

export default {
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
    this.get();
  },
  methods: {
    goto(path) {
      this.$router.push(`/nus/${path}`);
    },
    get() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/landing`).then(({ data }) => {
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
    save() {
      this.is_loading = true;
      this.admission = this.admission.map((el, index) => ({
        ...el,
        content: this.$refs.articles[index].json,
      }));
      this.api(`/${this.uni_type}/landing`, {
        notify_foc: this.notify_foc,
        events: this.events,
        admission: this.admission,
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
          color: #fff;
          background: inherit;
          margin-bottom: .5rem;
        }
        input.title {
          border: none;
          border-bottom: solid 2px #eee;
          &:focus {
            outline: none;
          }
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
