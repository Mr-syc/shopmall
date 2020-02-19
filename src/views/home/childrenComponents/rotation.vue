<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper';


  export default {
    name: "rotation",
    data() {
      return {
        flag: true
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imageLoad() {
        if (this.flag) {
          this.$emit('swiperImageLoad')
          this.flag = false
        }
      },
    },

    components: {
      Swiper,
      SwiperItem
    },
  }

</script>

<style scoped>

</style>
