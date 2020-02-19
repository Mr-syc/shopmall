import {ADD_TO_CART,Add_COUNTER} from "./mutation-types";

export default {
  addCart(context,payload){
    return new Promise((resolve ,reject) => {
      //查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)


      //2.判断oldProduct
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit(Add_COUNTER,oldProduct)
        resolve('商品的数量+1')
      }else{
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加购物车成功')
      }
    })
    //查找之前数组中是否有该商品

  }
}
