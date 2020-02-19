<template>
  <div>
    <swiper class="swiperItem">
      <swiper-item  v-for="item in topImages">
        <img :src="item" alt="" >
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper';
  export default {
    name: "detailSwiper",
    data() {
      return {
        flag: true
      }
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },

  }
</script>

<style scoped>
  .swiperItem{
    height: 300px;
    overflow: hidden;
  }

</style>
