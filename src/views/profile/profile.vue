<template>
  <div>
    <scroll class="content">
    </scroll>
  </div>
</template>

<script>
  import scroll from "components/common/scroll/scroll";

  export default {
    name: "profile",
    components:{
      scroll
    }
  }
</script>

<style scoped>
  .content{
    height: 300px;
    background-color: red;
    overflow: hidden;
  }
</style>
