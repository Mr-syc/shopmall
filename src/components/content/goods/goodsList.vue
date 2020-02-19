<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods="item"></goods-list-item>

  </div>
</template>

<script>
  import goodsListItem from "./goodsListItem";

  export default {
    name: "goodsList",
    components:{
      goodsListItem
    },
    props:{
      goods: {
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }


</style>
