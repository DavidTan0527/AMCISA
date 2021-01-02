<template>
  <div id="_timeline">
    <template v-for="index in data_count">
      <div class="item" :key="index">
        <div class="circle"></div>
        <div
          class="date"
          :class="[index % 2 === 0 ? 'right' : 'left']">
          {{ data[index-1].event_date }}
        </div>
        <img
          class="image"
          :class="[index % 2 === 1 ? 'right' : 'left']"
          :src="data[index-1].picture"
          :alt="data[index-1].title">
      </div>
      <div class="line" :key="'line-'+index" v-if="index !== count"></div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    count: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    data_count() {
      return Math.min(this.count, this.data.length);
    },
  },
};
</script>

<style lang="scss">
#_timeline {
  .item {
    position: relative;
    height: .5rem;
    z-index: 2;
    * {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .left { right: calc(50% + 6rem); }
    .right { left: calc(50% + 6rem); }
    .circle {
      left: 50%;
      transform: translate(-50%, -50%);
      border: solid 2px $primary-blue;
      border-radius: 50%;
      background-color: #fff;
      height: .5rem;
      width: .5rem;
    }
    .date {
      font-size: 2rem;
      font-weight: 300;
      max-width: 35%;
    }
    .image {
      max-height: 300px;
      width: auto;
      max-width: 30%;
    }
  }
  .line {
    width: 0;
    height: 280px;
    margin: 0 auto;
    border: 1px dashed;
  }
  @media screen and (max-width: 768px) {
    .item {
      .left { right: calc(50% + 4rem); }
      .right { left: calc(50% + 4rem); }
      .date {
        font-size: 1.2rem;
      }
      .image {
        height: auto;
      }
    }
    .line {
      height: 250px;
    }
  }
  @media screen and (max-width: 425px) {
    .item {
      .left { right: calc(50% + 2rem); }
      .right { left: calc(50% + 2rem); }
      .date {
        font-size: 1rem;
      }
    }
    .line {
      height: 150px;
    }
  }
}
.nus #_timeline {
  .line {
    border-color: $primary-orange;
  }
}
.ntu #_timeline {
  .line {
    border-color: $primary-red;
  }
}
</style>
