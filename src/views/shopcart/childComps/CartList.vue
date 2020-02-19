<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" >
      <Cart-list-item v-for="(item,index) in list" :item-info="item" :key="index"/>
    </scroll>

  </div>
</template>

<script>
  import scroll from "components/common/scroll/scroll";
  import CartListItem from "./CartListItem";
  import {mapGetters} from 'vuex'
  export default {
    name: "cartList",
    components:{
      scroll,
      CartListItem
    },
    computed:{
      ...mapGetters({
        list:'cartList'
      })
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100%- 44px - 49px - 40px);

  }
  .content{
    height: calc(100%- 44px - 49px - 40px);
    overflow: hidden;
    height: 100%;

  }
</style>
