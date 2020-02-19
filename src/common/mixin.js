import {debounce} from "./utils";

export const itemListenerMixin = {
  data(){
    return {
      refresh:null
    }
  },
  mounted(){
    this.refresh = debounce(this.$refs.scroll.refresh,100)

    this.itemImgListener = () =>{
      this.refresh()
    }

    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}

export const backTopMixin = {
  data(){
    return{
      isShow:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },

  }
}
