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
        <div class="event-grid">
          <card
            v-for="event in events[current_page-1]"
            :key="event.id"
            :title="event.title"
            :subtitle="event.venue"
            :date="event.event_date"
            :image="event.picture"
            @click.native="$router.push(`/${$route.params.uni}/event/${event.id}`)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const card = () => import('@/components/card.vue');
export default {
  metaInfo() {
    return {
      title: this.$route.params.uni.toUpperCase().concat(' | Events'),
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Recent events held by AMCISA. Find out what fun we had recently!',
        },
      ],
    };
  },
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
    window.addEventListener('resize', this.resize_handler);
  },
  mounted() {
    this.resize_handler();
  },
  destroyed() {
    window.removeEventListener('resize', this.resize_handler);
  },
  methods: {
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
    },
    is_hide_page(index) {
      return this.current_page + index <= 0
          || this.current_page + index > this.max_page;
    },
    resize_handler(e) {
      const width = e?.target.innerWidth || window.innerWidth;
      this.pagination_size = width > 425 ? 12 : 6;
      this.api(`/${this.$route.params.uni}/events/${this.pagination_size}`).then(({ data }) => {
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
      const filtered_data = this.original_events.filter((e) => (this.filter_name === '' || e.title.includes(this.filter_name))
        && (this.filter_venue === '' || e.venue.includes(this.filter_venue)));
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
};
</script>
