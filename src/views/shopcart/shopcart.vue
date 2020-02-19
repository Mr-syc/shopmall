<template>
  <div class="cart">
<!--    //导航-->
    <nav-bar class="navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

<!--    //商品的列表-->
    <Cart-list/>
    <BottomBar/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import BottomBar from "./childComps/BottomBar";
  import {mapGetters} from 'vuex'
  export default {
    name: "shopcart",
    components:{
      NavBar,
      CartList,
      BottomBar
    },
    computed:{
      //mapetters的两种表达形式G
      //第一种
      ...mapGetters(['cartLength','cartList'])
      //2.第二种
      // ...mapGetters({
      //   length:'cartLength',
      //   list:'cartList'
      // })

    }

  }
</script>

<style scoped>
  .navbar{
    background-color: var(--color-high-text);
    color: white;
    position: relative;
    z-index: 9;
  }

</style>
