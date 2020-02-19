<template>
  <div id="home" >
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <Tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="getMore">
      <div>
      <rotation :banners="banners" @swiperImageLoad="swiperImageLoad"></rotation>
      <Recommend-view :recommends="recommends"></Recommend-view>
      <feature-view></feature-view>
      <Tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"></Tab-control>
      <goods-list :goods="showGoods"></goods-list>
      </div>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>

  </div>

</template>

<script>
  import rotation from "./childrenComponents/rotation";
  import RecommendView from "./childrenComponents/RecommendView";
  import featureView from "./childrenComponents/featureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import goodsList from "components/content/goods/goodsList";
  import scroll from "components/common/scroll/scroll";
  import backTop from "components/content/backtop/backTop";


  import {getHomeMultidata , getHomeGoods} from "network/home";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";

  export default {
    name: "home",
    components:{
      rotation,
      RecommendView,
      featureView,
      NavBar,
      TabControl,
      goodsList,
      scroll,
      backTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop': {page:0 ,list:[]},
          'new': {page:0 ,list:[]},
          'sell': {page:0 ,list:[]},
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        homeImgListener:null
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted() {

    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      //事件监听相关的方法
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2 :
            this.currentType = 'sell'
            break
          default:
            this.currentType = 'pop'
        }
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControl1.currentIndex = index;

      },

      //tabControl的offsetTop显示
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        console.log(this.tabOffsetTop);

      },
      contentScroll(position){
        //判断backTop是否显示
        this.isShow = (-position.y) > 1000
        //判断offsetTop，是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 网络请求相关的方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // res => pop的前30条数据
          // console.log(res);
          const data = res.data.list;
          this.goods[type].list.push(...data);
          this.goods[type].page += 1;
          //上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      getMore(){
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)
      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    destroyed() {
      console.log('home被销毁了');
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // console.log(this.saveY);
      //1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      //2.取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.homeImgListener)

    },
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }



.home-nav{
  background-color: var(--color-tint);
  color: white;

  /*会用浏览器原生滚动时，为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
  }


  .content{
    /*height: 300px;*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
  .tab-control{
    position: relative;
    z-index: 9;
  }


  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
