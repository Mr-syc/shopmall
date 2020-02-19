<template>
  <div class="wrapper" ref="aaaa">

  </div>

</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "category",
    data(){
      return {
        scroll:null
      }
    },
    //组件创建完之后调用
    created() {
    },
    mounted() {
      console.log(this.$refs.aaaa);
      console.log(document.querySelector('.wrapper'));
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        pullUpLoad:true
    })
      this.scroll.on('scroll', (position) => {
        console.log(position);
      })
      this.scroll.on('pullingUp',() => {
        console.log('上拉加载更多');
      })
    }
  }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: red;

    /*overflow: hidden;*/
    /*overflow-y: scroll;*/
  }

</style>
