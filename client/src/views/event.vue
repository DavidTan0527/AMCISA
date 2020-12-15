<template>
  <div id="_event">
    <div class="main-title">EVENTS</div>
    <div class="body">
      <div class="filter">
        <h1 class="title">Filter <i class="fe fe-search"></i></h1>
        <input type="text" placeholder="Search name...">
        <input type="text" placeholder="Search location...">
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
                @click="current_page = is_hide_page(i) ? current_pafe : current_page + i">
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
            v-for="i in 12"
            :key="i"
            title="Supper Night"
            subtitle="Ameens"
            date="12/10/2020"
            :image="image"
            @click.native="$router.push(`/${$route.params.uni}/event/${i}`)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card.vue';
import image from '@/mock/activity_1.jpg';

export default {
  metaInfo: {
    title: 'Event',
  },
  components: {
    card,
  },
  data: () => ({
    current_page: 1,
    max_page: 10,
    image,
  }),
  methods: {
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
    },
    is_hide_page(index) {
      return this.current_page + index <= 0
          || this.current_page + index > this.max_page;
    },
  },
};
</script>
