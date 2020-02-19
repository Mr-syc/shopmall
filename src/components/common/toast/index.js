import toast from "./toast";

const obj = {}

obj.install = function (Vue) {
  console.log('执行了obj的函数',Vue);

  //1.创建组件构造器
  const toastConstructor = Vue.extend(toast)

  //2.new的方式，根据组件构造器，可以创建出一个组件对象
  const Toast = new toastConstructor()

  //3.将组件对象挂载到某一个元素上
  Toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是div
  document.body.appendChild(Toast.$el)

  Vue.prototype.$toast = Toast;
}

export default obj
