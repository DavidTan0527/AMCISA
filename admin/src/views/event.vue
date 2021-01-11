<template>
<div class="loader" v-if="is_loading"></div>
  <div id="_event" v-else>
    <div class="main-title">EVENTS</div>
    <div class="body">
      <div class="filter">
        <h1 class="title">Filter <i class="fe fe-search"></i></h1>
        <input type="text" placeholder="Search name..."
          v-model="filter_name" @keyup="filter_events">
        <input type="text" placeholder="Search location..."
          v-model="filter_venue" @keyup="filter_events">
        <!-- <div class="date">
          <i class="fe fe-calendar"></i>
          <input class="day" type="text" placeholder="DD"
            size="2" maxlength="2" minlength="2">/
          <input class="month" type="text" placeholder="MM"
            size="2" maxlength="2" minlength="2">/
          <input class="year" type="text" placeholder="YYYY"
            size="4" maxlength="4" minlength="4">
        </div> -->
      </div>
      <div class="events">
        <nav class="pagination">
          <section class="prev nav-btns">
            <i class="fe fe-chevrons-left"
              @click="current_page = 1"></i>
            <i class="fe fe-chevron-left"
              @click="current_page -= current_page > 1 ? 1 : 0"></i>
          </section>
          <section class="pages">
            <template v-for="i in range(-3, 3)">
              <div
                :key="i"
                :class="{
                  'current-page': i === 0,
                  'hide-page': is_hide_page(i)
                }"
                @click="current_page = is_hide_page(i) ? current_page : current_page + i">
                <span>{{ current_page + i }}</span>
              </div>
            </template>
          </section>
          <section class="next nav-btns">
            <i class="fe fe-chevron-right"
              @click="current_page += current_page < max_page ? 1 : 0"></i>
            <i class="fe fe-chevrons-right"
              @click="current_page = max_page"></i>
          </section>
        </nav>
        <button class="add-btn" @click="add_event"><i class="fe fe-plus"></i>Add Event</button>
        <div class="event-grid">
          <card
            v-for="event in events[current_page-1]"
            :key="event.id"
            :title="event.title"
            :subtitle="event.venue"
            :date="event.event_date"
            :image="event.picture"
            @click.native="$router.push(`/event/${event.id}`)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const card = () => import('@/components/card.vue');
export default {
  components: {
    card,
  },
  data: () => ({
    current_page: 0,
    max_page: 0,
    pagination_size: 0,
    original_events: [],
    events: [],
    filter_name: '',
    filter_venue: '',
    is_loading: true,
  }),
  created() {
    window.addEventListener('resize', this.get);
  },
  mounted() {
    this.get();
  },
  destroyed() {
    window.removeEventListener('resize', this.get);
  },
  methods: {
    add_event() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/event`, {
        title: '',
        picture: '',
        event_date: '',
        venue: '',
        author: '',
        created_date: this.current_date,
        content: '',
      }).then(({ data }) => {
        this.$notify({
          type: 'success',
          title: 'Created Event',
        });
        this.$router.push(`/event/${data.id}#new`);
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
        this.is_loading = false;
        this.get();
      });
    },
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
    },
    is_hide_page(index) {
      return this.current_page + index <= 0
          || this.current_page + index > this.max_page;
    },
    get(e) {
      const width = e?.target.innerWidth || window.innerWidth;
      this.pagination_size = width > 425 ? 12 : 6;
      this.api(`/${this.uni_type}/events/${this.pagination_size}`).then(({ data }) => {
        this.current_page = 1;
        this.max_page = data.length;
        this.original_events = data.flat();
        this.events = data;
        this.is_loading = false;
      }).catch((err) => {
        this.$notify({
          type: 'error',
          text: err.message,
        });
        this.loading = false;
      });
    },
    filter_events() {
      const filtered_data = this.original_events.filter((e) => e.title.includes(this.filter_name)
        && e.venue.includes(this.filter_venue));
      this.events = this.group_by(filtered_data, this.pagination_size);
    },
    group_by(arr, size) {
      const result = [];
      let child = [];
      arr.forEach((e) => {
        if (child.length === size) {
          result.push(child);
          child = [];
        }
        child.push(e);
      });
      result.push(child);
      return result;
    },
  },
  computed: {
    current_date() {
      const today = new Date();
      return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    },
  },
};
</script>

<style lang="scss">
#_event {
  padding-top: 2rem;
  .body {
    display: flex;
    padding: 1rem 4rem 0;
    margin: 0 auto;
    .filter {
      display: flex;
      flex-direction: column;
      color: $text-gray-light;
      margin-right: 2rem;
      width: 25%;
      .title {
        margin-top: 0;
        font-weight: 400;
        text-align: left;
      }
      input {
        font-size: 1.2rem;
        border: none;
        border-radius: .5rem;
        border-bottom: solid 1.5px $text-gray-light;
        margin-bottom: 2rem;
        padding: .1rem .6rem;
        transition: 300ms;
        &:focus, &:focus-within, &:active {
          outline: none;
          border: none;
          border-bottom: solid 1.5px;
          &::placeholder { transition: 300ms; }
        }
      }
      .date {
        display: flex;
        align-items: center;
        i {
          font-size: 1.8rem;
          margin-right: .2rem;
        }
        input {
          border-radius: 0;
          padding: .1rem;
          margin: 0 .5rem;
          &:placeholder-shown { text-align: center; }
          &::placeholder { font-size: 1rem; }
        }
      }
    }
    .events {
      box-sizing: border-box;
      padding: 0 2rem;
      width: 75%;
      .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 600px;
        margin: 0 auto;
        .nav-btns i {
          font-size: 1.2rem;
          margin: 0 .5rem;
          cursor: pointer;
        }
        .pages {
          display: flex;
          & > div {
            position: relative;
            margin: 0 .5rem;
            padding: 1rem;
            cursor: pointer;
            border-radius: 50%;
            span {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .hide-page {
            filter: opacity(0);
            cursor: default;
          }
          .current-page { color: #fff; }
        }
      }
      .add-btn {
        display: block;
        width: 80%;
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
      .event-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: row;
        gap: 2rem;
        box-sizing: border-box;
        width: 100%;
        margin: 0 auto;
        padding-top: 1rem;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    .body {
      padding: 1rem 2rem;
      .filter {
        margin-right: 1rem;
        .title {
          font-size: 1.8rem;
        }
        input {
          font-size: 1rem;
        }
        .date {
          i {
            font-size: 1.5rem;
          }
          input::placeholder { font-size: .7rem; }
        }
      }
      .events {
        padding: 0 1rem;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .body {
      .filter {
        .title { font-size: 1.5rem; }
        input { font-size: .8rem; }
        .date {
          i { font-size: 1.2rem; }
          input::placeholder { font-size: .7rem; }
        }
      }
      .events {
        .pagination {
          .nav-btns i { font-size: 1rem; }
          .pages > div {
            font-size: .8rem;
            margin: 0 .3rem;
            padding: .8rem;
            &:first-of-type, &:last-of-type {
              display: none;
            }
          }
        }
        .event-grid { grid-template-columns: repeat(2, 1fr); }
      }
    }
  }
  @media screen and (max-width: 425px) {
    .body {
      flex-direction: column;
      .filter {
        width: 100%;
        margin-bottom: 2rem;
      }
      .events {
        width: 100%;
        .pagination {
          .nav-btns i { margin: 0 .3rem; }
          .pages > div { margin: 0 .3rem; }
        }
        .add-btn {
          font-size: .8rem;
        }
        .event-grid { grid-template-columns: 1fr; }
      }
    }
  }
}
.nus #_event .body {
  .filter input {
    &:focus, &:focus-within, &:active {
     border-color: $primary-orange;
      &::placeholder {
        color: $primary-orange;
      }
    }
  }
  .events .pagination .current-page {
    background-color: $primary-orange;
  }
}
.ntu #_event .body {
  .filter input {
    &:focus, &:focus-within, &:active {
     border-color: $primary-red;
      &::placeholder {
        color: $primary-red;
      }
    }
  }
  .events .pagination .current-page {
    background-color: $primary-red;
  }
}
</style>
