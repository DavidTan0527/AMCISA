<template>
  <div id="_about">
    <div class="main-title">20/21 MAIN COMM</div>
    <div class="president">
      <div class="quote-section">
        <div class="quote">
          外面的世界无论有多难闯多坎坷，AMCISA终究是我们的归宿，是我们的避风港。
        </div>
        <div class="name">会长 戴良根</div>
      </div>
      <img src="@/mock/ter.png" alt="">
    </div>
    <div class="committee">
      <div class="member" v-for="i in 11" :key="i">
        <img src="@/mock/ter.png" alt="" class="avatar">
        <div class="pos">副会长</div>
        <div class="name">陈慧琪</div>
        <div class="year">Y2 化学系</div>
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
    };
  },
};
</script>
