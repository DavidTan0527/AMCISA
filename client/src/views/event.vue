<template>
  <div id="_event">
    <div class="main-title">EVENTS</div>
    <div class="body">
      <div class="filter">
        <h1 class="title">Filter <i class="fe fe-search"></i></h1>
        <input type="text" placeholder="Search by name...">
        <input type="text" placeholder="Search by location...">
        <div class="date">
          <i class="fe fe-calendar"></i>
          <input class="day" type="text" placeholder="DD"
            size="2" maxlength="2" minlength="2">/
          <input class="month" type="text" placeholder="MM"
            size="2" maxlength="2" minlength="2">/
          <input class="year" type="text" placeholder="YYYY"
            size="4" maxlength="4" minlength="4">
        </div>
      </div>
      <div class="events">These are events</div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Event',
  },
  data: () => ({
  }),
};
</script>
