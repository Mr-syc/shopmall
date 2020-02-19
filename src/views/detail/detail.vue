<template>
  <div id="detail" >
    <DetailNavBar class="detail-nav" :current-index="currentIndex" @itemClick="itemClick"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
       <detail-swiper :top-images="topImages"></detail-swiper>
       <Detail-base-info :goods="goods"></Detail-base-info>
       <Detail-shop-info :shop="shop"></Detail-shop-info>
       <Detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad"></Detail-goods-info>
       <Detail-param-info :param-info="paramInfo" ref="params"></Detail-param-info>
       <DetailCommentInfo :comment-info="commentInfo" ref="comment"></DetailCommentInfo>
       <DetailRecommendInfo :recommend-list="recommends" ref="recommend"></DetailRecommendInfo>
    </scroll>
    <DetailBottomBar @addToCart="addCart" class="detail-nav"></DetailBottomBar>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <toast :message='message' :show="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import detailSwiper from "./childComps/detailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";


import scroll from "components/common/scroll/scroll";
import backTop from "components/content/backtop/backTop";
import toast from "../../components/common/toast/toast";


import {getDetail,goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
import {itemListenerMixin,backTopMixin} from "../../common/mixin";
import {debounce} from "../../common/utils";

import {mapActions} from 'vuex'

export default {
  name: "detail",
  components:{
    DetailNavBar,
    detailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    scroll,
    backTop,
    toast,
    },
  data(){
      return {
        id:'',
        topImages:[],
        goods:{},
        shop:{},
        detailImages:[],
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        itemImgListener:null,
        itemY:[],
        getThemeY:[],
        currentIndex:0,
        shopAdd:{},
        message:'',
        show:false
      }
    },
  created() {
    //1.保存传入的id
    const iid = this.$route.params.iid
    this.id = iid

    //2.根据id接受数据
    getDetail(iid).then(res => {
      //1.获取顶部的图片轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      console.log(data);
      this.shopAdd = data.itemInfo

      //2.获取商品信息
      this.goods = new goods(data.itemInfo,data.columns,data.shopInfo.services)

      //3.创建商品店铺信息
      this.shop = new Shop(data.shopInfo)

      //4.保存商品的详情信息
      this.detailInfo = data.detailInfo

      //5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //6.获取评论信息
      if(data.rate.list){
        this.commentInfo = data.rate.list[0]
      }
    })

    //3.请求推荐数据
    getRecommend().then( res => {
      // console.log(res);
      this.recommends = res.data.list
    })

    //4.给getThemeY赋值,对this.themeY赋值的操作进行防抖
    this.getThemeY = debounce(() => {
      this.itemY=[]
      this.itemY.push(0)
      this.itemY.push(this.$refs.params.$el.offsetTop)
      this.itemY.push(this.$refs.comment.$el.offsetTop)
      this.itemY.push(this.$refs.recommend.$el.offsetTop)
      this.itemY.push(Number.MAX_VALUE)
    },100)



  },

  mounted() {

  },
  mixins:[itemListenerMixin,backTopMixin],
  methods:{
    ...mapActions({
      add:'addCart'
    }),
    imageLoad(){
      this.refresh()
      this.getThemeY()
    },
    contentScroll(position){
      this.isShow = (-position.y) > 1000

      const positionY = -position.y
      let length = this.itemY.length
      for(let i=0;i<length-1;i++){
        if(this.currentIndex !==i && (positionY >= this.itemY[i] && positionY< this.itemY[i+1])){
          this.currentIndex = i
          // console.log(this.currentIndex);
        }
      }
    },
    itemClick(index){
      this.$refs.scroll.scrollTo(0,-this.itemY[index],100)
    },
    addCart(){
      //1.获取购物车需要展示的商品信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.shopAdd.title;
      product.desc = this.shopAdd.desc;
      product.price = this.shopAdd.lowNowPrice;
      product.iid = this.shopAdd.iid;


      //2.将商品添加到购物车里面
      // this.add(product).then(res => {
      //   this.show = true
      //   this.message = res
      //
      //   setTimeout(() => {
      //     this.show = false
      //     this.message = ''
      //   },1000)
      // })
      this.add(product).then(res => {
        this.$toast.show(res,2000)

        console.log(this.$toast);
      })



      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })

    }
  },
  destroyed() {
    this.$off('itemImgLoad',this.itemImgListener)
  },
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    height: 100vh;
    background-color: white;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }

  .content{
    height: calc(100% - 44px - 49px);
  }


</style>
