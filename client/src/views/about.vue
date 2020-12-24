<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_about" v-else>
    <div class="main-title">{{ year }} MAIN COMM</div>
    <div class="president">
      <div class="quote-section">
        <div class="quote">
          {{ caption }}
        </div>
        <div class="name">会长 {{ president_name }}</div>
      </div>
      <img :src="president_picture" alt="president picture">
    </div>
    <div class="committee">
      <div class="member" v-for="member in members" :key="member.id">
        <img :src="member.picture" alt="" class="avatar">
        <div class="pos">{{ member.position }}</div>
        <div class="name">{{ member.name }}</div>
        <div class="year">{{ member.course_year }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'About',
  },
  data() {
    return {
      year: '',
      caption: '',
      president_name: '',
      members: [],
      is_loading: true,
    };
  },
  mounted() {
    this.api('/maincomm').then(({ data }) => {
      const {
        year, caption, president_name, president_picture, members,
      } = data;
      this.year = year;
      this.caption = caption;
      this.president_name = president_name;
      this.president_picture = president_picture;
      this.members = members;
      this.is_loading = false;
    }).catch(console.log);
  },
};
</script>
