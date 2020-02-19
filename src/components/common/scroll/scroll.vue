<template>
<!--  //ref一般绑定给子组件-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }

    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建better-scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,//设置成3的时候会实时监听，函数会被一直回调，影响性能，这里不写死，根据情况赋值
        pullUpLoad: this.pullUpLoad,
        // cancelable:false
      })
      //2.监听滚动对象
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }
      //监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
      // console.log(this.scroll);


      methods:{
        scrollTo(x, y, time = 300) {
          this.scroll && this.scroll.scrollTo(x, y, time)
        },
        refresh() {
          this.scroll && this.scroll.refresh()
          console.log('---');
        },
        finishPullUp() {
          this.scroll && this.scroll.finishPullUp()
        },
        getScrollY(){
          return this.scroll ? this.scroll.y : 0
        }
      }

  }

</script>

<style scoped>
</style>
