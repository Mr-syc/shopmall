import axios from 'axios'

export function request(config) {
  //1.创建实例
  const instance = axios.create({
    baseURL: "",//接口地址，请与我联系获取
    timeout: 5000
  })

  //2.axios的拦截器
  //2.1请求拦截（配置发送请求的信息）
  instance.interceptors.request.use(config => {
    // console.log(config);
    //1.比如说config中有的数据不符合服务器要求

    //2.比如每次发送网络请求时，都希望都在界面中显示一个请求的图标

    //3.某些网络请求，比如说登录（token）必须携带一特殊的信息

    return config  //用于拦截放行
  }, err => {
    console.log(err);
  })

  //2.2响应拦截（配置响应请求的信息）
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, error => {
    console.log(error);
  })


  //3.发送真正的请求
  return instance(config)
}

//instance 返回的就是一个promise
